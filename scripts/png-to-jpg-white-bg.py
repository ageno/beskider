#!/usr/bin/env python3
"""
Convert a transparent PNG to JPG with white background and generate responsive sizes.
Usage: python3 scripts/png-to-jpg-white-bg.py [path/to/image.png]
Default input: assets/images/aethos-1.png
Output: aethos-1.jpg, aethos-1-320.jpg, aethos-1-640.jpg, aethos-1-1280.jpg (same dir as input).
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Brak Pillow. Zainstaluj: pip install Pillow")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
DEFAULT_INPUT = REPO_ROOT / "assets" / "images" / "aethos-1.png"
SIZES = (320, 640, 1280)


def main():
    if len(sys.argv) >= 2:
        src = Path(sys.argv[1])
    else:
        src = DEFAULT_INPUT

    if not src.is_file():
        print(f"Plik nie istnieje: {src}")
        print("Wrzuć PNG (np. aethos-1.png) do assets/images/ i uruchom skrypt ponownie.")
        sys.exit(1)

    img = Image.open(src)
    if img.mode in ("RGBA", "P"):
        # White background
        bg = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        bg.paste(img, mask=img.split()[-1])  # alpha as mask
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")

    base = src.parent / src.stem
    w, h = img.size

    # Full size
    out_full = f"{base}.jpg"
    img.save(out_full, "JPEG", quality=88)
    print(f"Zapisano: {out_full}")

    # Responsive widths (keep aspect ratio)
    for width in SIZES:
        if width >= w:
            continue
        ratio = width / w
        new_size = (width, int(h * ratio))
        resized = img.resize(new_size, Image.Resampling.LANCZOS)
        out_path = f"{base}-{width}.jpg"
        resized.save(out_path, "JPEG", quality=88)
        print(f"Zapisano: {out_path}")

    print("Gotowe. Odśwież stronę (Ctrl+Shift+R).")


if __name__ == "__main__":
    main()
