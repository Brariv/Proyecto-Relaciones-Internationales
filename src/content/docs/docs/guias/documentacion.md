---
title: Escribir documentación
description: Cómo agregar y organizar páginas en esta documentación de Starlight.
sidebar:
  order: 3
---

Esta documentación está hecha con
[Starlight](https://starlight.astro.build) y vive en el mismo proyecto que el
sitio. Cada archivo `.md` o `.mdx` dentro de `src/content/docs/docs/` es una
página.

## Dónde van los archivos

La URL sale de la ruta del archivo:

| Archivo                                         | URL                       |
| ----------------------------------------------- | ------------------------- |
| `src/content/docs/docs/index.mdx`               | `/docs/`                  |
| `src/content/docs/docs/instalacion.md`          | `/docs/instalacion/`      |
| `src/content/docs/docs/guias/contenido.md`      | `/docs/guias/contenido/`  |

:::danger[Siempre dentro de `src/content/docs/docs/`]
Un archivo directamente en `src/content/docs/` (por ejemplo
`src/content/docs/index.md`) se publicaría en `/` y chocaría con la página de
inicio del sitio. La única excepción es `src/content/docs/404.md`, que es la
página de error para cualquier URL que no exista.
:::

## Crear una página

Crea un archivo con un bloque de frontmatter. Solo `title` es obligatorio:

```md title="src/content/docs/docs/guias/despliegue.md"
---
title: Despliegue
description: Cómo publicar el sitio.
sidebar:
  order: 4   # posición dentro de su grupo en la barra lateral
---

Contenido en Markdown normal: **negritas**, listas, tablas, `código`…
```

Con `npm run dev` corriendo, la página aparece al guardar.

## Barra lateral

Se configura en `astro.config.mjs`, en la opción `sidebar` de Starlight:

- **Empezar**: enlaces fijos (`items`).
- **Guías**: se genera sola con todo lo que haya en `src/content/docs/docs/guias/`
  (`autogenerate`). Para agregar una guía basta con crear el archivo ahí; el
  orden lo define `sidebar.order` en el frontmatter.

Para un grupo nuevo, crea la carpeta y agrega en `astro.config.mjs`:

```js
{
  label: 'Referencia',
  items: [{ autogenerate: { directory: 'docs/referencia' } }],
},
```

## Avisos y componentes

En Markdown se pueden usar avisos:

```md
:::note
Información extra.
:::

:::caution[Título opcional]
Cuidado con esto.
:::
```

Hay `note`, `tip`, `caution` y `danger`. En archivos `.mdx` también se pueden
usar los componentes de Starlight (`Card`, `CardGrid`, `LinkCard`, `Tabs`,
`Steps`…). Ver la
[guía de componentes de Starlight](https://starlight.astro.build/components/using-components/).

## Colores

Los colores de esta documentación (verdes UVG) están en `src/styles/docs.css`.
No afectan al sitio público, que usa `src/styles/global.css`.
