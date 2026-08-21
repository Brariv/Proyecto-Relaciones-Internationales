# /data

Contenido editable de las páginas del sitio, separado del código de los componentes.
El formato de cada componente está descrito en [`docs/Format_Page.md`](../docs/Format_Page.md).

## Estructura

```
data/
  <inner_page>/          # una carpeta por inner page (ej. "start")
    <componente>.md       # un documento por componente importante de esa página
```

Por ejemplo, para la inner page **Inicio** (`src/components/inner_pages/start.astro`):

```
data/start/carousel.md   # tarjetas del carrusel del Hero
data/start/map.md        # destinos/universidades del mapa mundial
```

Cada documento es un markdown con **frontmatter YAML** (`items: [...]`), donde cada
elemento de la lista trae los campos definidos para ese componente en
`docs/Format_Page.md`. El cuerpo del markdown (debajo del segundo `---`) es solo
documentación humana y no se usa en el sitio.

## Cómo se cargan estos documentos

`src/lib/content.ts` expone `loadComponentContent(page, component)`, usado desde el
frontmatter de los componentes Astro (se ejecuta en build/servidor, nunca en el navegador):

- **Local (por defecto):** lee el archivo directamente de esta carpeta `data/`.
- **Remoto:** si la variable de entorno `CONTENT_BASE_URL` está definida, en su lugar
  hace `fetch` a `${CONTENT_BASE_URL}/<page>/<componente>.md` — por ejemplo, un bucket
  estático en la nube (S3, GCS, un bucket con CDN, etc.) que espeje esta misma
  estructura de carpetas.

Para usar un bucket remoto, sube esta misma estructura de carpetas y define en `.env`:

```
CONTENT_BASE_URL=https://mi-bucket.ejemplo.com/data
```

Ver [`.env.example`](../.env.example).

## Agregar un componente nuevo

1. Documenta sus campos en `docs/Format_Page.md`.
2. Crea `data/<inner_page>/<componente>.md` con el frontmatter `items: [...]`.
3. En el componente `.astro` correspondiente, reemplaza los datos hardcodeados por
   `await loadComponentContent("<inner_page>", "<componente>")`.
