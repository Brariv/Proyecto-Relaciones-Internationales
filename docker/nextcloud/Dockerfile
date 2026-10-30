# Nextcloud for UVG Global: the official image + a first-install hook that
# creates the content account and uploads the initial "Sitio Web UVG GLOBAL"
# folder. Built from the repo root (see docker-compose.yml).
FROM nextcloud:35-apache

COPY --chmod=755 docker/nextcloud/hooks/post-installation/ /docker-entrypoint-hooks.d/post-installation/
COPY --chown=www-data:www-data ["nextcloud/Sitio Web UVG GLOBAL/", "/docker-seed/contenido/"]
