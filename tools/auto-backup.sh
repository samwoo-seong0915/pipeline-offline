#!/bin/bash
# Auto backup: commit & push if there are changes
cd /Users/mac/projects/pipeline-offline

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  exit 0
fi

git add -A
git commit -m "auto-backup: $(date '+%Y-%m-%d %H:%M')"
git push origin main
