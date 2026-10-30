#!/bin/sh
# Runs ONCE, right after Nextcloud's first installation (official image hook,
# executed as www-data before Apache starts). It:
#   1. sets Spanish defaults and empty skeleton for new accounts,
#   2. creates the content account the website reads with (CONTENT_USER),
#   3. uploads the initial "Sitio Web UVG GLOBAL" folder into that account.
# After this, Nextcloud is the source of truth: edits made there show on the site.
set -eu

OCC="php /var/www/html/occ"
USER_ID="${CONTENT_USER:?CONTENT_USER no está definido}"
DIR_NAME="${CONTENT_DIR:-Sitio Web UVG GLOBAL}"
SEED="/docker-seed/contenido"

echo "[uvg] Configurando Nextcloud para UVG Global…"
$OCC config:system:set default_language --value="es"
$OCC config:system:set default_phone_region --value="GT"
# New accounts start empty (no sample files, photos or templates)
$OCC config:system:set skeletondirectory --value=""
$OCC config:system:set templatedirectory --value=""

if $OCC user:info "$USER_ID" >/dev/null 2>&1; then
  echo "[uvg] La cuenta '$USER_ID' ya existe."
else
  PASS="${CONTENT_PASSWORD:?CONTENT_PASSWORD no está definido}"
  # Nextcloud's password policy rejects passwords shorter than 10 characters
  if [ "${#PASS}" -lt 10 ]; then
    echo "[uvg] ERROR: CONTENT_PASSWORD tiene ${#PASS} caracteres; Nextcloud exige al menos 10."
    echo "[uvg]        No se creó la cuenta '$USER_ID'. Cambia CONTENT_PASSWORD en .env y vuelve a"
    echo "[uvg]        ejecutar este script (ver /docs/guias/docker-nextcloud/#problemas-comunes)."
    exit 1
  fi
  echo "[uvg] Creando la cuenta de contenido '$USER_ID'…"
  if ! OC_PASS="$PASS" $OCC user:add --password-from-env --display-name="Contenido UVG Global" "$USER_ID"; then
    echo "[uvg] ERROR: Nextcloud rechazó la cuenta (¿contraseña demasiado común?). Cambia CONTENT_PASSWORD en .env."
    exit 1
  fi
fi

DATA_DIR="$($OCC config:system:get datadirectory)"
DEST="$DATA_DIR/$USER_ID/files/$DIR_NAME"
if [ -e "$DEST" ]; then
  echo "[uvg] '$DIR_NAME' ya existe en Nextcloud; no se sobrescribe."
else
  echo "[uvg] Subiendo el contenido inicial a '$DIR_NAME'…"
  mkdir -p "$DEST"
  cp -R "$SEED/." "$DEST/"
  find "$DEST" -name ".gitkeep" -type f -delete
fi

# Register the copied files in Nextcloud's file index
$OCC files:scan "$USER_ID"
echo "[uvg] Listo."
