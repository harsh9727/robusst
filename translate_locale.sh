#!/usr/bin/env bash

set -e

BASE_DIR="./locales"
SOURCE_LANG="en"

# CONFIG
TARGET_LANG="ru"
OPENAI_API_KEY=""
MODEL="gpt-4.1-mini"

SOURCE_DIR="$BASE_DIR/$SOURCE_LANG"
TARGET_DIR="$BASE_DIR/$TARGET_LANG"

MAX_RETRIES=5

echo "🌍 Translating locale: $TARGET_LANG"
echo

# Ensure jq installed
if ! command -v jq &> /dev/null; then
  echo "❌ jq is required but not installed"
  exit 1
fi

mkdir -p "$TARGET_DIR"

########################################
# Extract JSON structure
########################################

extract_structure() {
  jq '
  def blank:
    if type=="object" then
      with_entries(.value |= blank)
    elif type=="array" then
      if length == 0 then []
      else
        if (.[0] | type) == "object" then
          [ (.[0] | blank) ]
        else
          map("")
        end
      end
    else ""
    end;
  blank
  ' "$1"
}

########################################
# Extract scalar keys
########################################

extract_keys() {
  jq -r 'paths(scalars) | join(".")' "$1" | sort
}

########################################
# OpenAI API call
########################################

call_openai() {

prompt="$1"

curl -s https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d "{
    \"model\": \"$MODEL\",
    \"input\": $prompt,
    \"text\": { \"format\": { \"type\": \"json_object\" } }
  }" \
| jq -r '.output[0].content[0].text'
}

########################################
# Validate structure
########################################

validate_structure() {

src="$1"
tgt="$2"

src_keys=$(extract_keys "$src")
tgt_keys=$(extract_keys "$tgt")

diff <(echo "$src_keys") <(echo "$tgt_keys") > /dev/null && return 0 || return 1
}

########################################
# Main loop
########################################

for file in "$SOURCE_DIR"/*.json; do

  filename=$(basename "$file")
  target_file="$TARGET_DIR/$filename"

  echo "📄 Processing $filename"

  raw_json=$(jq -c . "$file")
  structure=$(extract_structure "$file")

  retry=0

  while [ $retry -lt $MAX_RETRIES ]; do

    echo "   🤖 Requesting translation (attempt $((retry+1)))"

prompt=$(jq -Rs . <<EOF
You are a localization engine.

Translate the following JSON to locale: $TARGET_LANG.

STRICT RULES:
- Do NOT change keys
- Do NOT remove keys
- Do NOT add keys
- Only translate string values
- Preserve arrays and nesting
- Return ONLY valid JSON

JSON STRUCTURE (must match exactly):

$structure

RAW JSON:

$raw_json
EOF
)

response=$(call_openai "$prompt")

    echo "$response" > /tmp/translated.json

    # Validate JSON
    if ! jq empty /tmp/translated.json 2>/dev/null; then
      echo "   ⚠️ Invalid JSON returned"
      retry=$((retry+1))
      continue
    fi

    # Validate structure
    if validate_structure "$file" "/tmp/translated.json"; then
      echo "   ✅ Structure valid"
      mv /tmp/translated.json "$target_file"
      break
    else
      echo "   ❌ Structure mismatch — retrying"
      retry=$((retry+1))
    fi

  done

  if [ $retry -eq $MAX_RETRIES ]; then
    echo "   ❌ Failed after $MAX_RETRIES retries: $filename"
  fi

  echo

done

echo "🎉 Translation completed for locale: $TARGET_LANG"
