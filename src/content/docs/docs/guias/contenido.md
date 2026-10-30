---
title: Editar contenido
description: Cómo está organizada la carpeta de contenido y cómo la usan los componentes.
sidebar:
  order: 2
---

El contenido de las tarjetas y listados no está escrito en los componentes:
vive en la carpeta **Sitio Web UVG GLOBAL**, que en producción está en
Nextcloud. Para cambiar un texto, una fecha o una foto **no hace falta tocar
código**. La guía paso a paso para editores está en el
[Manual de uso](/docs/guias/manual-de-uso/).

## La carpeta de contenido

```
Sitio Web UVG GLOBAL/
├── Informacion.md            # qué campos tiene cada sección
├── Paginas/                  # textos: un .md por sección
│   ├── Inicio/        carousel.md · map.md
│   ├── Destinos/      convenios.md · oportunidades.md
│   ├── Pasantias/     pasantias.md
│   ├── Especializaciones/  especializaciones.md
│   ├── Viajes/        viajes.md
│   └── Testimonios/   intercambios.md · pasantias.md · viajes.md
└── Imagenes/                 # fotos, referenciadas por nombre en el campo `imagen`
    ├── Carrusel/  Destinos/<región>/  Especializacion/  Pasantias/
    └── Testimonios/<tipo>/  Viajes_Academicos/
```

La misma carpeta está en el repositorio, en `nextcloud/Sitio Web UVG GLOBAL/`.
Es el contenido inicial que se sube a Nextcloud y el respaldo si Nextcloud no
responde (ver [Docker y Nextcloud](/docs/guias/docker-nextcloud/)).

## Qué archivo alimenta qué

| Archivo (en `Paginas/`)                  | Componente                                    | Dónde se ve                                  |
| ---------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| `Inicio/carousel.md`                     | `common/Hero.astro`                           | Carrusel de Inicio                           |
| `Inicio/map.md`                          | `common/WorldMapSection.astro`, `DestinationsRedirectSection.astro` | Mapa mundial y conteos por región |
| `Destinos/convenios.md`                  | `inner_pages/destinations.astro`              | Tarjetas de convenios                        |
| `Destinos/oportunidades.md`              | `inner_pages/destinations.astro`              | Próximas oportunidades                       |
| `Pasantias/pasantias.md`                 | `inner_pages/internships.astro`               | Tarjetas de Pasantías                        |
| `Especializaciones/especializaciones.md` | `inner_pages/specialization.astro`            | Tarjetas de Especialización                  |
| `Viajes/viajes.md`                       | `inner_pages/trips.astro`                     | Viajes Académicos                            |
| `Testimonios/*.md`                       | `inner_pages/testimonies.astro`               | Testimonios (3 grupos)                       |

Los campos de cada sección están en `Informacion.md` y en los comentarios al
inicio de cada `.md`.

:::tip
Destinos usa `convenios.md` y `oportunidades.md` para sus tarjetas, y completa
la ciudad, el idioma, la región y el sitio oficial desde `Inicio/map.md`
usando el mismo `id`.
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

## Cómo lo leen los componentes

`src/lib/content.ts` expone dos funciones para el frontmatter de los
componentes (se ejecutan en el servidor, nunca en el navegador):

```astro
---
import { loadComponentContent, resolveImage } from "../../lib/content";

// Paginas/Viajes/viajes.md
const { items } = await loadComponentContent("Viajes", "viajes");

// "Viajes_Alemania-2026.jpg" -> "/media/Imagenes/Viajes_Academicos/Viajes_Alemania-2026.jpg"
// o undefined si la foto aún no existe (CoverImage muestra el placeholder)
const src = await resolveImage(items[0].imagen);
---
<CoverImage src={src} alt={items[0].titulo} />
```

De dónde se lee (Nextcloud, bucket o copia local), la caché y qué pasa si
Nextcloud falla está explicado en [Docker y Nextcloud](/docs/guias/docker-nextcloud/#de-dónde-lee-el-contenido-el-sitio).

## Agregar una sección con contenido editable

1. Documenta sus campos en `Informacion.md`.
2. Crea `Paginas/<Pagina>/<seccion>.md` con `items: [...]`, en la copia del
   repositorio **y** en Nextcloud (la copia del repositorio solo se sube sola
   en la primera instalación).
3. En el componente `.astro`, cárgalo con
   `await loadComponentContent("<Pagina>", "<seccion>")`.
