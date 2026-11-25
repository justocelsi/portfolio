#!/usr/bin/env bash
# Imprime /cv a public/cv-justo-celsi.pdf (A4).
#
#   npm run cv
#
# La página /cv lee src/content/perfil.ts, igual que la landing: se edita ese
# archivo y se vuelve a correr esto. El PDF se commitea, porque la landing lo
# enlaza y es contenido, no un artefacto de build.

set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$CHROME" ]]; then
  echo "No encontré Chrome/Chromium en el PATH." >&2
  exit 1
fi

PUERTO=3078
if curl -s "http://localhost:$PUERTO" >/dev/null 2>&1; then
  echo "El puerto $PUERTO ya está ocupado: imprimiría una versión vieja." >&2
  exit 1
fi

./node_modules/.bin/next build >/dev/null
# setsid + matar el grupo entero: `next start` lanza un next-server hijo que,
# si se mata sólo al padre, queda vivo sirviendo la versión vieja.
setsid ./node_modules/.bin/next start -p "$PUERTO" >/dev/null 2>&1 &
SERVIDOR=$!
trap 'kill -- -"$SERVIDOR" 2>/dev/null || true' EXIT

for _ in $(seq 1 60); do
  curl -sf "http://localhost:$PUERTO/cv" >/dev/null && break
  sleep 1
done

"$CHROME" --headless=new --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="public/cv-justo-celsi.pdf" "http://localhost:$PUERTO/cv" 2>/dev/null

echo "public/cv-justo-celsi.pdf"
