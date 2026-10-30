# UVG Global · Relaciones Internacionales

Sitio de Relaciones Internacionales de la UVG (Astro). El contenido (textos y
fotos) vive en **Nextcloud**, en la carpeta *Sitio Web UVG GLOBAL*, y el sitio
lo lee en cada visita.

## Con Docker (sitio + Nextcloud)

```bash
cp .env.example .env      # y cambia las contraseñas
npm run docker:up         # = docker compose up -d --build
```

- Sitio: http://localhost:4321
- Nextcloud: http://localhost:8080 (entra con `CONTENT_USER` / `CONTENT_PASSWORD`)

La primera vez tarda 1–3 minutos: Nextcloud se instala y recibe el contenido
inicial de `nextcloud/Sitio Web UVG GLOBAL/`.

## Sin Docker

```bash
npm install
npm run dev               # lee la copia local del contenido
```

## Documentación

Con el sitio corriendo: http://localhost:4321/docs/ — incluye el manual para
editores y la guía de Docker y Nextcloud (`src/content/docs/`).
