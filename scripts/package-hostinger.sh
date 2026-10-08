#!/bin/sh
set -eu

root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
out="${HOSTINGER_ZIP:-$HOME/Downloads/flowmint-hostinger.zip}"
mkdir -p "$(dirname "$out")"
rm -f "$out"

cd "$root"
zip -r "$out" . \
  -x "*.git/*" \
  -x "*node_modules/*" \
  -x "*.env" \
  -x "*.env.local" \
  -x "*.env.*.local" \
  -x "*apps/web/.next/*" \
  -x "*apps/web/.swc/*" \
  -x "dist/*" \
  -x "*apps/api/dist/*" \
  -x "*packages/shared/dist/*" \
  -x "*coverage/*" \
  -x "*.DS_Store" \
  -x "*tsconfig.tsbuildinfo" \
  -x "flowmint-hostinger.zip"

echo "Wrote $out"
ls -lh "$out"
