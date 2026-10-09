---
title: Estructura del proyecto
description: Qué hay en cada carpeta y cómo se arma cada página.
sidebar:
  order: 1
---

## Carpetas principales

```
├── data/                  # Contenido editable (Markdown + frontmatter YAML)
├── docs/                  # Notas internas y el prototipo de diseño original
│   ├── Format_Page.md     #   campos de cada componente
│   └── prototypes/        #   handoff de diseño (HTML/CSS de referencia)
├── public/assets/         # Logos e imágenes servidas tal cual
├── src/
│   ├── components/
│   │   ├── common/        # Secciones y piezas reutilizables
│   │   └── inner_pages/   # Una por página: arma sus secciones
│   ├── content/docs/      # Esta documentación (Starlight)
│   ├── layouts/           # BaseLayout: <head>, fuentes, CSS global
│   ├── lib/               # Carga de contenido y normalización de datos
│   ├── pages/
│   │   └── [...slug].astro  # Router único del sitio
│   └── styles/
│       ├── global.css     # Estilos del sitio
│       └── docs.css       # Colores de esta documentación
└── astro.config.mjs       # Configuración de Astro + Starlight
```

## Rutas

Todo el sitio pasa por un solo archivo, `src/pages/[...slug].astro`, que hace
de router:

| URL               | Componente (`src/components/inner_pages/`) |
| ----------------- | ------------------------------------------ |
| `/`               | `start.astro`                              |
| `/exchanges`      | `exchanges.astro`                          |
| `/internships`    | `internships.astro`                        |
| `/trips`          | `trips.astro`                              |
| `/specialization` | `specialization.astro`                     |
| `/testimonies`    | `testimonies.astro`                        |
| `/destinations`   | `destinations.astro`                       |
| `/docs/…`         | Esta documentación (Starlight)             |

El router envuelve cada página con `BaseLayout`, `Header` y `Footer`, así que
las páginas en `inner_pages/` solo contienen su `<main>`.

### Agregar una página nueva

1. Crea `src/components/inner_pages/mi-pagina.astro` con su `<main id="top">…</main>`.
2. En `src/pages/[...slug].astro`:
   - impórtala,
   - agrega `{ params: { slug: "mi-pagina" } }` en `getStaticPaths()`,
   - agrégala al objeto `routes`,
   - agrega su título y descripción en `meta`.
3. Si debe aparecer en el menú, agrega el enlace en
   `src/components/common/Header.astro` (y en `Footer.astro` si aplica).

:::caution
No uses el slug `docs`: está reservado para esta documentación.
:::

## Componentes reutilizables

Viven en `src/components/common/`. Los más usados:

| Componente                  | Uso                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `CoverImage`                | Imagen que llena su caja con `object-fit: cover`. Sin `src` muestra el placeholder.          |
| `ApplyProcessSection`       | Sección “Cómo aplicar” (4 requisitos + 4 pasos). Recibe `scope`, `title`, `kicker`, `requirements`, `steps`. |
| `CtaSection`                | Tarjeta de contacto “¿Listo para empezar tu aventura?”.                                     |
| `Hero`, `IntroSection`, `WorldMapSection` | Secciones de la página de inicio.                                              |
| `Header`, `Footer`          | Navegación y pie, comunes a todo el sitio.                                                  |
