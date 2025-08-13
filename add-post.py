import sys
import datetime
from pathlib import Path

if len(sys.argv) < 2:
    print("Usage: python make_post.py <title>")
    sys.exit(1)

title = sys.argv[1]
date = datetime.date.today()
filename_title = title.lower().replace(" ", "-")
filename = f"{date:%Y-%m-%d}-{filename_title}.md"

front_matter = f"""---
layout: post
title: "{title}"
tags: [intro]
date: {date}
---
"""

posts_dir = Path("_posts")
posts_dir.mkdir(exist_ok=True)

path = posts_dir / filename
if path.exists():
    print(f"Error: {path} already exists.")
    sys.exit(1)

with open(path, "w", encoding="utf-8") as f:
    f.write(front_matter)

print(f"Created: {path}")
