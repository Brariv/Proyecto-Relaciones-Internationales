---
title: Editar contenido
description: Cómo cambiar textos, destinos, viajes y testimonios desde /data.
sidebar:
  order: 2
---

El contenido de las tarjetas y listados no está escrito en los componentes:
vive en archivos Markdown dentro de `/data`, uno por componente. Para cambiar
un texto, una fecha o agregar un destino **no hace falta tocar código**.

## Qué archivo alimenta qué

| Archivo                            | Dónde se ve                                                        |
| ---------------------------------- | ------------------------------------------------------------------ |
| `data/start/carousel.md`           | Tarjetas del carrusel de Inicio                                    |
| `data/start/map.md`                | Mapa mundial, página Destinos y conteo por región en Intercambio   |
| `data/internships/programs.md`     | Tarjetas de Pasantías                                              |
| `data/specialization/programs.md`  | Tarjetas de Especialización                                        |
| `data/trips/trips.md`              | Viajes Académicos                                                  |
| `data/testimonies/exchanges.md`    | Testimonios · Intercambio                                          |
| `data/testimonies/internships.md`  | Testimonios · Pasantías                                            |
| `data/testimonies/trips.md`        | Testimonios · Viajes académicos                                    |

Los campos de cada componente están definidos en
[`docs/Format_Page.md`](https://github.com/Brariv/Proyecto-Relaciones-Internationales/blob/main/docs/Format_Page.md).

:::tip
Un solo archivo, `data/start/map.md`, es la fuente de todos los destinos: si
agregas una universidad ahí, aparece en el mapa, en la página Destinos y en
los conteos por región automáticamente.
:::

## Formato de un archivo

Cada archivo tiene un bloque de **frontmatter YAML** con una lista `items`.
Cada elemento de la lista es una tarjeta:

```yaml
---
items:
  - titulo: "La UVG, presente en cuatro continentes"
    descripcion: "Destino destacado"
    footer: "Ver convenios"
    redireccion: "/destinations"
    meta: "14 países · 4 continentes"

  - titulo: "Otra tarjeta"
    # ...
---
Todo lo que vaya debajo del segundo `---` es solo para humanos:
el sitio lo ignora.
```

Para agregar una tarjeta, copia un elemento completo de la lista y cambia sus
valores. El orden en el archivo es el orden en la página.

:::caution[YAML es sensible a la indentación]
Usa espacios (no tabs) y respeta la indentación de los demás elementos. Si un
texto tiene `:` o `#`, ponlo entre comillas.
:::

## Contenido remoto (opcional)

`src/lib/content.ts` lee estos archivos al hacer el build. Si defines
`CONTENT_BASE_URL` en `.env`, en vez de leer el disco descarga
`${CONTENT_BASE_URL}/<pagina>/<componente>.md`. Sirve para alojar `/data` en un
bucket (S3, GCS, una CDN…) que espeje la misma estructura de carpetas.

```bash title=".env"
CONTENT_BASE_URL=https://mi-bucket.ejemplo.com/data
```

Como el sitio es estático, los cambios de contenido remoto se ven después de
volver a correr `npm run build`.

## Agregar un componente con contenido editable

1. Documenta sus campos en `docs/Format_Page.md`.
2. Crea `data/<pagina>/<componente>.md` con `items: [...]`.
3. En el componente `.astro`, carga los datos en el frontmatter:

   ```astro
   ---
   import { loadComponentContent } from "../../lib/content";
   const { items } = await loadComponentContent("<pagina>", "<componente>");
   ---
   ```
