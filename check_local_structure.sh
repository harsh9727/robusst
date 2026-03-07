#!/usr/bin/env bash

set -e

BASE_DIR="./locales"
SOURCE_LANG="en"

# Target locales to check
TARGET_LOCALES=("es")

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
# Extract scalar keys
########################################

extract_keys() {
  jq -r 'paths(scalars) | join(".")' "$1" | sort
}

########################################
# Loop target locales
########################################

for locale in "${TARGET_LOCALES[@]}"; do

  TARGET_DIR="$BASE_DIR/$locale"

  echo "🌍 Checking locale: $locale"
  echo

  if [ ! -d "$TARGET_DIR" ]; then
    echo "  ❌ Locale directory missing: $locale"
    echo
    continue
  fi

  ########################################
  # Loop files
  ########################################

  for src_file in "$SOURCE_DIR"/*.json; do

    filename=$(basename "$src_file")
    tgt_file="$TARGET_DIR/$filename"

    echo "📄 Checking $filename"

    if [ ! -f "$tgt_file" ]; then
      echo "   ❌ Missing file in $locale"
      continue
    fi

    src_keys=$(extract_keys "$src_file")
    tgt_keys=$(extract_keys "$tgt_file")

    diff_output=$(diff <(echo "$src_keys") <(echo "$tgt_keys") || true)

    if [ -n "$diff_output" ]; then
      echo "   ❌ Structure mismatch"
      echo "$diff_output" | sed 's/^/      /'
    else
      echo "   ✅ Structure OK"
    fi

  done

  ########################################
  # Detect extra files
  ########################################

  for tgt_file in "$TARGET_DIR"/*.json; do
    fname=$(basename "$tgt_file")
    if [ ! -f "$SOURCE_DIR/$fname" ]; then
      echo "   ⚠️ Extra file in $locale: $fname"
    fi
  done

  echo
  echo "--------------------------------------"
  echo

done

echo "✅ Locale structure check completed"
