#!/usr/bin/env python3
"""Build flashgames/catalog.json from the SWF files in this directory."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FLASH_DIR = ROOT / "flashgames"
OUTPUT = FLASH_DIR / "catalog.json"

games = [
    {
        "name": swf.stem.replace("_", " "),
        "path": swf.name,
    }
    for swf in sorted(FLASH_DIR.glob("*.swf"), key=lambda path: path.name.casefold())
]

OUTPUT.write_text(json.dumps(games, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(games)} games to {OUTPUT.relative_to(ROOT)}")
