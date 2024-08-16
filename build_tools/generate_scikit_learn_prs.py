import json
import subprocess
from datetime import datetime
from pathlib import Path

if __name__ == "__main__":
    output = subprocess.run(
        [
            "gh",
            "pr",
            "list",
            "--repo",
            "scikit-learn/scikit-learn",
            "--author",
            "Charlie-XIAO",
            "--state",
            "merged",
            "--limit",
            "1000",
            "--json",
            "number,title,url,mergedAt",
        ],
        check=True,
        capture_output=True,
    )

    prs = json.loads(output.stdout)
    for pr in prs:
        pr["mergedAt"] = datetime.strptime(pr["mergedAt"], "%Y-%m-%dT%H:%M:%SZ")
    prs.sort(key=lambda pr: pr["mergedAt"], reverse=True)

    target = Path(__file__).parent.parent / "_includes" / "projects" / "scikit-learn-prs.md"
    with target.open("w", encoding="utf-8") as f:
        for pr in prs:
            f.write(f"- **[#{pr['number']}]({pr['url']})** {pr['title']}\n")
