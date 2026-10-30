---
title: Instalación y comandos
description: Requisitos, instalación de dependencias y scripts disponibles.
---

## Requisitos

- **Node.js 22.12** o superior (lo exige Astro 6).
- Para levantar el sitio con Nextcloud: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  (ver [Docker y Nextcloud](/docs/guias/docker-nextcloud/)).
- **npm** (viene con Node).
- Opcional: si usas [Nix](https://nixos.org), el repo trae un `flake.nix`;
  `nix develop` abre una terminal con Node y los language servers de Astro y
  TypeScript.

## Instalación

```bash
git clone https://github.com/Brariv/Proyecto-Relaciones-Internationales.git
cd Proyecto-Relaciones-Internationales
npm install
```

:::caution[Después de cada `git pull`]
Si alguien agregó dependencias en `package.json`, corre `npm install` otra
vez antes de `npm run dev`. Si no, verás errores como
`Cannot find module '…'`.
:::

## Comandos

Los mismos comandos sirven para el sitio **y** para esta documentación, porque
ambos viven en el mismo proyecto de Astro.

| Comando               | Qué hace                                                            |
| --------------------- | ------------------------------------------------------------------- |
| `npm run dev`         | Servidor local con recarga en vivo en `http://localhost:4321`.      |
| `npm run build`       | Genera el servidor del sitio y la documentación en `dist/`.         |
| `npm run preview`     | Corre el build de `dist/` para revisarlo antes de publicar.         |
| `npm run docker:up`   | Levanta sitio + Nextcloud + base de datos con Docker.               |
| `npm run docker:logs` | Muestra el registro del sitio y de Nextcloud.                       |
| `npm run docker:down` | Apaga los contenedores (los datos se conservan).                    |
| `npm run astro …`     | Ejecuta la CLI de Astro (ej. `npm run astro -- check`).             |

Con `npm run dev` corriendo:

- **Sitio:** `http://localhost:4321/`
- **Documentación:** `http://localhost:4321/docs/`

## Variables de entorno

Copia `.env.example` a `.env`. Sin ninguna variable, `npm run dev` lee la
copia local del contenido (`nextcloud/Sitio Web UVG GLOBAL/`).

| Variable                                   | Para qué sirve                                                                |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| `NEXTCLOUD_URL`, `NEXTCLOUD_USER`, `NEXTCLOUD_PASSWORD` | Leer el contenido desde Nextcloud (Docker las define solo).      |
| `NEXTCLOUD_CONTENT_DIR`                    | Nombre de la carpeta en Nextcloud. Por defecto `Sitio Web UVG GLOBAL`.        |
| `CONTENT_BASE_URL`                         | Leer la misma carpeta desde un bucket HTTP en lugar de Nextcloud.             |
| `CONTENT_CACHE_TTL`                        | Segundos que se guarda el contenido en memoria (60 por defecto).              |

Las variables de Docker (contraseñas de Nextcloud y la base de datos) están en
[Docker y Nextcloud](/docs/guias/docker-nextcloud/#primer-arranque).

## Versiones fijadas

:::note
El proyecto está en **Astro 6**, y dos dependencias están fijadas a la última
versión compatible:

- **Starlight `^0.39.3`** (0.41+ requiere Astro 7).
- **`@astrojs/node` `~10.1.4`** (11.x requiere Astro 7).

Para actualizarlas hay que actualizar Astro a la versión 7 primero.
:::
