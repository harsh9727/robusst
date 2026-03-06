#!/usr/bin/env bash

set -e

BASE_DIR="./locales"
SOURCE_LANG="en"
TARGET_LANG="ar"

echo "🔎 Checking locale structure..."
echo

# Ensure jq exists
if ! command -v jq &> /dev/null; then
  echo "❌ jq is required but not installed."
  exit 1
fi

SOURCE_DIR="$BASE_DIR/$SOURCE_LANG"
TARGET_DIR="$BASE_DIR/$TARGET_LANG"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Source language directory '$SOURCE_DIR' not found."
  exit 1
fi

if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Target language directory '$TARGET_DIR' not found."
  exit 1
fi

SOURCE_FILES=$(ls "$SOURCE_DIR")

echo "📁 Phase 1: Checking file consistency"
echo
echo "Checking language: $TARGET_LANG"

# Missing files
for file in $SOURCE_FILES; do
  if [ ! -f "$TARGET_DIR/$file" ]; then
    echo "  ❌ Missing file: $file"
  fi
done

# Extra files
for file in "$TARGET_DIR"/*.json; do
  fname=$(basename "$file")
  if [ ! -f "$SOURCE_DIR/$fname" ]; then
    echo "  ⚠️ Extra file: $fname"
  fi
done

echo
echo "📁 Phase 2: Checking JSON structure"
echo

extract_keys() {
  jq -r 'paths(scalars) | join(".")' "$1" | sort
}

echo "Checking structure for: $TARGET_LANG"

for file in $SOURCE_FILES; do
  src_file="$SOURCE_DIR/$file"
  tgt_file="$TARGET_DIR/$file"

  if [ ! -f "$tgt_file" ]; then
    continue
  fi

  src_keys=$(extract_keys "$src_file")
  tgt_keys=$(extract_keys "$tgt_file")

  diff=$(diff <(echo "$src_keys") <(echo "$tgt_keys") || true)

  if [ -n "$diff" ]; then
    echo "  ❌ Structure mismatch in $file"
    echo "$diff" | sed 's/^/     /'
  fi
done

echo
echo "✅ Locale structure check completed"
