#!/usr/bin/env bash
# Recaptura los screenshots de los deploys que salen en las ventanas de proyecto.
#
# Las capturas viven en /public y se commitean: son parte del contenido, no un
# artefacto de build. Cuando redeployes alguno de estos sitios, corré esto.
#
#   npm run capturas
#
# Si agregás un proyecto con ventana, sumá la línea acá y el `captura` en
# src/content/perfil.ts.

set -euo pipefail

cd "$(dirname "$0")/.."

SITIOS=(
  "cisur|https://cisur.vercel.app"
  "picnic|https://picniczine.vercel.app"
  "roguelike|https://roguelike-opal.vercel.app"
  "elposeido|https://justocel.github.io/elposeido"
)

CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$CHROME" ]]; then
  echo "No encontré Chrome/Chromium en el PATH." >&2
  exit 1
fi

for sitio in "${SITIOS[@]}"; do
  nombre="${sitio%%|*}"
  url="${sitio#*|}"
  destino="public/shot-${nombre}.png"

  # Sin --headless=new no toma el viewport; sin virtual-time-budget captura
  # antes de que carguen las fuentes y las imágenes.
  if "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
      --window-size=1440,900 --virtual-time-budget=12000 \
      --screenshot="$destino" "$url" >/dev/null 2>&1 && [[ -s "$destino" ]]; then
    printf '  ok    %-12s %s\n' "$nombre" "$(du -h "$destino" | cut -f1)"
  else
    printf '  FALLO %-12s %s\n' "$nombre" "$url" >&2
  fi
done
