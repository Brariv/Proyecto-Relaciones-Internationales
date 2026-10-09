---
title: Instalación y comandos
description: Requisitos, instalación de dependencias y scripts disponibles.
---

## Requisitos

- **Node.js 20** o superior.
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

| Comando           | Qué hace                                                        |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Servidor local con recarga en vivo en `http://localhost:4321`.  |
| `npm run build`   | Genera el sitio estático completo en `dist/`.                   |
| `npm run preview` | Sirve la carpeta `dist/` para revisar el build final.           |
| `npm run astro …` | Ejecuta la CLI de Astro (ej. `npm run astro -- check`).         |

Con `npm run dev` corriendo:

- **Sitio:** `http://localhost:4321/`
- **Documentación:** `http://localhost:4321/docs/`

## Variables de entorno

Copia `.env.example` a `.env` si necesitas cambiar algo. Hoy solo existe una:

| Variable           | Para qué sirve                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONTENT_BASE_URL` | Si está definida, el contenido de `/data` se descarga desde esa URL (por ejemplo un bucket en la nube) en vez de leerse del disco. Vacía = disco. |

Más detalles en [Editar contenido](/docs/guias/contenido/).

## Versión de Starlight

:::note
La documentación usa **Starlight 0.39**, la última versión compatible con
**Astro 6**. Las versiones 0.41 en adelante requieren Astro 7. Por eso
`package.json` la fija como `^0.39.3` (permite parches 0.39.x, pero no salta
a 0.40+). Para actualizar Starlight hay que actualizar Astro primero.
:::
