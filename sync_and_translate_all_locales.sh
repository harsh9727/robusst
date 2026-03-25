#!/usr/bin/env bash
set -e

########################################
# CONFIG
########################################
BASE_DIR="./locales"
SOURCE_LANG="en"
TARGET_LOCALES=("es" "ru" "pt" "fr" "ar")
OPENAI_API_KEY=""
MODEL="gpt-4.1-mini"
MAX_RETRIES=5

SOURCE_DIR="$BASE_DIR/$SOURCE_LANG"

########################################
# Ensure dependencies
########################################
if ! command -v jq &> /dev/null; then
  echo "[ERROR] jq is required but not installed"
  exit 1
fi

if [ -z "$OPENAI_API_KEY" ]; then
  echo "[ERROR] OPENAI_API_KEY is not set"
  exit 1
fi

########################################
# Deduplicate + filter source lang
########################################
declare -A seen
UNIQUE_LOCALES=()
for locale in "${TARGET_LOCALES[@]}"; do
  locale="$(echo "$locale" | xargs)"
  [ -z "$locale" ] && continue
  [ "$locale" = "$SOURCE_LANG" ] && echo "[WARN] Skipping '$locale' -- same as source" && continue
  [ "${seen[$locale]+_}" ] && echo "[WARN] Skipping duplicate: '$locale'" && continue
  seen[$locale]=1
  UNIQUE_LOCALES+=("$locale")
done

if [ "${#UNIQUE_LOCALES[@]}" -eq 0 ]; then
  echo "[WARN] No target locales configured. Exiting."
  exit 0
fi

########################################
# HELPERS
########################################

extract_keys() {
  jq -r 'paths(scalars) | join(".")' "$1" | sort
}

extract_structure() {
  jq '
  def blank:
    if type=="object" then
      with_entries(.value |= blank)
    elif type=="array" then
      if length == 0 then []
      else
        if (.[0] | type) == "object" then [ (.[0] | blank) ]
        else map("") end
      end
    else "" end;
  blank
  ' "$1"
}

validate_structure() {
  local src="$1"
  local tgt="$2"
  diff <(extract_keys "$src") <(extract_keys "$tgt") > /dev/null && return 0 || return 1
}

########################################
# OpenAI call
# ALL logs go to stderr (>&2)
# Only the JSON response goes to stdout
########################################
call_openai() {
  local locale="$1"
  local structure="$2"
  local raw_json="$3"

  local user_content
  user_content=$(jq -Rs . <<EOF
Translate the following JSON to locale: ${locale}

STRICT RULES:
- Do NOT change keys
- Do NOT remove keys
- Do NOT add keys
- Only translate string values
- Preserve arrays and nesting
- image paths, slugs, URLs -- copy them as-is, do NOT translate
- Return ONLY valid JSON, no markdown, no explanation

JSON STRUCTURE (your output must match this shape exactly):
${structure}

RAW JSON (English source to translate):
${raw_json}
EOF
)

  local payload
  payload=$(jq -n \
    --arg model "$MODEL" \
    --argjson user_content "$user_content" \
    '{
      model: $model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a localization engine. Return ONLY valid JSON with identical structure to the input. No markdown. No explanation."
        },
        {
          role: "user",
          content: $user_content
        }
      ]
    }')

  echo "  [API] Sending | locale: $locale | payload: $(echo "$payload" | wc -c) bytes" >&2

  local raw_response http_status body

  raw_response=$(curl -s \
    --max-time 120 \
    --connect-timeout 15 \
    -w "\n__HTTP_STATUS__:%{http_code}" \
    https://api.openai.com/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d "$payload")

  http_status=$(echo "$raw_response" | grep '__HTTP_STATUS__' | cut -d':' -f2)
  body=$(echo "$raw_response" | grep -v '__HTTP_STATUS__')

  echo "  [API] HTTP Status: $http_status" >&2

  if [ "$http_status" != "200" ]; then
    echo "  [ERROR] OpenAI error:" >&2
    echo "$body" | jq . 2>/dev/null >&2 || echo "$body" >&2
    return 1
  fi

  # Extract just the JSON content -- this is the only thing on stdout
  local content
  content=$(echo "$body" | jq -r '.choices[0].message.content')

  echo "  [API] Response size: $(echo "$content" | wc -c) bytes" >&2
  echo "  [API] Response preview: $(echo "$content" | head -c 200)" >&2

  # Print clean JSON to stdout only
  echo "$content"
}

########################################
# STEP 1: Find all conflicting files
########################################
echo "========================================"
echo "  STEP 1: Scanning for structure issues"
echo "========================================"
echo ""

declare -A CONFLICTING_FILES

for locale in "${UNIQUE_LOCALES[@]}"; do
  TARGET_DIR="$BASE_DIR/$locale"

  if [ ! -d "$TARGET_DIR" ]; then
    echo "[WARN] Directory missing for locale '$locale' -- queuing all files"
    mkdir -p "$TARGET_DIR"
    for src_file in "$SOURCE_DIR"/*.json; do
      filename=$(basename "$src_file")
      existing="${CONFLICTING_FILES[$filename]:-}"
      CONFLICTING_FILES[$filename]="$existing $locale"
    done
    continue
  fi

  for src_file in "$SOURCE_DIR"/*.json; do
    filename=$(basename "$src_file")
    tgt_file="$TARGET_DIR/$filename"

    if [ ! -f "$tgt_file" ]; then
      echo "  [FAIL] [$locale] $filename -- file missing"
      existing="${CONFLICTING_FILES[$filename]:-}"
      CONFLICTING_FILES[$filename]="$existing $locale"
      continue
    fi

    diff_output=$(diff <(extract_keys "$src_file") <(extract_keys "$tgt_file") || true)
    if [ -n "$diff_output" ]; then
      echo "  [FAIL] [$locale] $filename -- structure mismatch"
      existing="${CONFLICTING_FILES[$filename]:-}"
      CONFLICTING_FILES[$filename]="$existing $locale"
    fi
  done
done

echo ""

if [ "${#CONFLICTING_FILES[@]}" -eq 0 ]; then
  echo "[OK] All locales are in sync. Nothing to do!"
  exit 0
fi

echo "Files needing sync:"
for filename in "${!CONFLICTING_FILES[@]}"; do
  echo "   * $filename --> affected locales: ${CONFLICTING_FILES[$filename]}"
done
echo ""

########################################
# STEP 2: One locale at a time
#         All conflicting files per locale
########################################
echo "========================================"
echo "  STEP 2: Translating"
echo "  Order: ${UNIQUE_LOCALES[*]}"
echo "========================================"
echo ""

declare -A FINAL_FAILURES

for locale in "${UNIQUE_LOCALES[@]}"; do
  echo "========================================"
  echo "  Locale: $locale"
  echo "========================================"
  echo ""

  locale_had_failure=false

  for filename in "${!CONFLICTING_FILES[@]}"; do
    # Skip if this locale is not affected for this file
    if ! echo "${CONFLICTING_FILES[$filename]}" | grep -qw "$locale"; then
      continue
    fi

    src_file="$SOURCE_DIR/$filename"
    target_file="$BASE_DIR/$locale/$filename"

    echo "  -- $filename"
    echo "  [INFO] Source size: $(jq -c . "$src_file" | wc -c) bytes"

    raw_json=$(jq -c . "$src_file")
    structure=$(extract_structure "$src_file")

    retry=0
    success=false

    while [ $retry -lt $MAX_RETRIES ]; do
      echo "  [ATTEMPT $((retry+1))/$MAX_RETRIES]"

      # Capture response to a temp file to avoid stdout contamination
      if ! call_openai "$locale" "$structure" "$raw_json" > /tmp/translated_check.json 2>/dev/tty; then
        echo "  [ERROR] API call failed"
        retry=$((retry+1))
        continue
      fi

      echo "  [CHECK] File size: $(wc -c < /tmp/translated_check.json) bytes"

      # Validate JSON
      if ! jq empty /tmp/translated_check.json 2>/dev/null; then
        echo "  [WARN] Invalid JSON -- retrying"
        echo "  [DEBUG] First 300 chars of bad response:"
        head -c 300 /tmp/translated_check.json
        echo ""
        retry=$((retry+1))
        continue
      fi

      echo "  [CHECK] JSON is valid"

      # Validate structure
      if validate_structure "$src_file" /tmp/translated_check.json; then
        echo "  [OK] Structure valid"
        mkdir -p "$BASE_DIR/$locale"
        jq . /tmp/translated_check.json > "$target_file"
        echo "  [SAVED] --> $target_file"
        success=true
        break
      else
        echo "  [FAIL] Structure mismatch -- retrying"
        echo "  [DEBUG] Key diff:"
        diff <(extract_keys "$src_file") <(extract_keys /tmp/translated_check.json) | head -20 || true
        retry=$((retry+1))
      fi
    done

    if [ "$success" = false ]; then
      echo "  [ERROR] Gave up on $filename for locale $locale after $MAX_RETRIES attempts"
      FINAL_FAILURES[$locale]+=" $filename"
      locale_had_failure=true
    fi

    echo ""
  done

  if [ "$locale_had_failure" = false ]; then
    echo "  [DONE] Locale '$locale' fully synced"
  else
    echo "  [DONE] Locale '$locale' completed with failures -- see summary below"
  fi
  echo ""
done

########################################
# STEP 3: Final verification
########################################
echo "========================================"
echo "  STEP 3: Final verification"
echo "========================================"
echo ""

ALL_GOOD=true

for locale in "${UNIQUE_LOCALES[@]}"; do
  TARGET_DIR="$BASE_DIR/$locale"
  for src_file in "$SOURCE_DIR"/*.json; do
    filename=$(basename "$src_file")
    tgt_file="$TARGET_DIR/$filename"

    if [ ! -f "$tgt_file" ]; then
      echo "  [FAIL] [$locale] $filename -- missing"
      ALL_GOOD=false
      continue
    fi

    diff_output=$(diff <(extract_keys "$src_file") <(extract_keys "$tgt_file") || true)
    if [ -n "$diff_output" ]; then
      echo "  [FAIL] [$locale] $filename -- structure mismatch"
      ALL_GOOD=false
    else
      echo "  [OK]   [$locale] $filename"
    fi
  done
done

echo ""

if [ "${#FINAL_FAILURES[@]}" -gt 0 ]; then
  echo "========================================"
  echo "  FAILURES SUMMARY (manual fix needed)"
  echo "========================================"
  for locale in "${!FINAL_FAILURES[@]}"; do
    echo "  [$locale]:${FINAL_FAILURES[$locale]}"
  done
  echo ""
fi

if $ALL_GOOD; then
  echo "[DONE] All locales are fully in sync!"
else
  echo "[WARN] Some files still have issues. See above."
  exit 1
fi
