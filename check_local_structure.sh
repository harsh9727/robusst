#!/usr/bin/env bash
set -e

BASE_DIR="./locales"
SOURCE_LANG="en"

TARGET_LOCALES=("es" "ru" "pt" "fr" "ar")

echo "🔎 Checking locale structure..."
echo

# Ensure jq exists
if ! command -v jq &> /dev/null; then
  echo "❌ jq is required but not installed."
  exit 1
fi

SOURCE_DIR="$BASE_DIR/$SOURCE_LANG"
if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Source language directory '$SOURCE_DIR' not found."
  exit 1
fi

########################################
# Guard: empty array
########################################
if [ "${#TARGET_LOCALES[@]}" -eq 0 ]; then
  echo "⚠️  TARGET_LOCALES is empty. Nothing to check."
  exit 0
fi

########################################
# Deduplicate + filter out source lang
########################################
declare -A seen
UNIQUE_LOCALES=()

for locale in "${TARGET_LOCALES[@]}"; do
  # Trim whitespace
  locale="$(echo "$locale" | xargs)"

  # Skip empty entries
  if [ -z "$locale" ]; then
    continue
  fi

  # Skip if same as source (en -> en makes no sense)
  if [ "$locale" = "$SOURCE_LANG" ]; then
    echo "⚠️  Skipping '$locale' — same as source language."
    continue
  fi

  # Skip duplicates
  if [ "${seen[$locale]+_}" ]; then
    echo "⚠️  Skipping duplicate locale: '$locale'"
    continue
  fi

  seen[$locale]=1
  UNIQUE_LOCALES+=("$locale")
done

echo "📋 Locales to check: ${UNIQUE_LOCALES[*]}"
echo

########################################
# Extract scalar keys
########################################
extract_keys() {
  jq -r 'paths(scalars) | join(".")' "$1" | sort
}

########################################
# Loop target locales
########################################
for locale in "${UNIQUE_LOCALES[@]}"; do
  TARGET_DIR="$BASE_DIR/$locale"
  echo "🌍 Checking locale: $locale"
  echo

  if [ ! -d "$TARGET_DIR" ]; then
    echo "  ❌ Locale directory missing: $TARGET_DIR"
    echo
    echo "--------------------------------------"
    echo
    continue
  fi

  ########################################
  # Loop files
  ########################################
  for src_file in "$SOURCE_DIR"/*.json; do
    filename=$(basename "$src_file")
    tgt_file="$TARGET_DIR/$filename"
    echo "  📄 $filename"

    if [ ! -f "$tgt_file" ]; then
      echo "     ❌ Missing file in '$locale'"
      continue
    fi

    src_keys=$(extract_keys "$src_file")
    tgt_keys=$(extract_keys "$tgt_file")
    diff_output=$(diff <(echo "$src_keys") <(echo "$tgt_keys") || true)

    if [ -n "$diff_output" ]; then
      echo "     ❌ Structure mismatch"
      echo "$diff_output" | sed 's/^/        /'
    else
      echo "     ✅ Structure OK"
    fi
  done

  ########################################
  # Detect extra files in target
  ########################################
  for tgt_file in "$TARGET_DIR"/*.json; do
    fname=$(basename "$tgt_file")
    if [ ! -f "$SOURCE_DIR/$fname" ]; then
      echo "  ⚠️  Extra file not in source: $fname"
    fi
  done

  echo
  echo "--------------------------------------"
  echo
done

echo "✅ Locale structure check completed"
