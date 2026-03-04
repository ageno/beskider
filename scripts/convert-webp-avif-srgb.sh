#!/usr/bin/env bash
# Konwersja obrazów WebP i AVIF do sRGB (wymaga ImageMagick).
# JPG/PNG w assets/ konwertować przez: sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" plik
# Użycie: ./scripts/convert-webp-avif-srgb.sh

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick (magick) nie jest zainstalowany. Zainstaluj: brew install imagemagick"
  exit 1
fi

count=0
while IFS= read -r f; do
  ext="${f##*.}"
  tmp="${f}.srgb-tmp.${ext}"
  if magick "$f" -strip -colorspace sRGB "$tmp" 2>/dev/null; then
    mv "$tmp" "$f"
    echo "OK $f"
    count=$((count+1))
  else
    rm -f "$tmp"
    echo "SKIP $f"
  fi
done < <(find "$ROOT" -type f \( -name "*.webp" -o -name "*.avif" \) -path "*/assets/*" ! -path "*/_site/*" ! -path "*/vendor/*")

echo "Przekonwertowano: $count plików"
