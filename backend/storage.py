import json, os, time
from typing import Dict, Any

BASE_DIR = os.path.dirname(__file__)
LISTINGS_DIR = os.path.join(BASE_DIR, "listings")

def save_listing(data: Dict[str, Any]) -> str:
    os.makedirs(LISTINGS_DIR, exist_ok=True)
    listing_id = str(int(time.time()))
    path = os.path.join(LISTINGS_DIR, f"{listing_id}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    return listing_id
