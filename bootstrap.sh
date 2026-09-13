#!/usr/bin/env bash
# One-time import of the full frontend source into this repo.
# Usage: ./bootstrap.sh [path-to-olljira-frontend.tar.gz]
set -e
SRC="${1:-}"
if [ -z "$SRC" ]; then
  echo "usage: ./bootstrap.sh path/to/olljira-frontend.tar.gz" >&2
  exit 1
fi
tar -xzf "$SRC"
git add -A
git commit -m "Import full frontend source"
git push
echo "Done — full source is now committed."
