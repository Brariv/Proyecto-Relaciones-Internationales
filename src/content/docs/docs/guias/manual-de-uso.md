---
title: Manual de uso
description: Guía paso a paso para editar el contenido del sitio, subir los cambios y manejar archivos e imágenes.
sidebar:
  order: 0
---

Esta guía es para quien **actualiza el contenido** del sitio (textos, viajes,
destinos, testimonios) sin necesidad de saber programar. Si buscas cómo está
hecho el sitio por dentro, ve a [Estructura del proyecto](/docs/guias/estructura/).

## Resumen rápido

1. Entra a **Nextcloud** con la cuenta de contenido y abre la carpeta
   **Sitio Web UVG GLOBAL**.
2. Busca el archivo de la página que quieres cambiar dentro de `Paginas/`
   (ver [la tabla de abajo](#qué-archivo-cambia-qué-página)).
3. Edita el texto entre comillas, respetando la indentación, y guarda.
4. Para fotos, súbelas a la carpeta que corresponda dentro de `Imagenes/`
   (ver [Fotos de las tarjetas](#fotos-de-las-tarjetas)).
5. Espera hasta **1 minuto** y recarga el sitio: el cambio aparece solo, sin
   volver a generar nada.

## Qué archivo cambia qué página

Todo el contenido editable está en la carpeta **Sitio Web UVG GLOBAL**, con
**una carpeta por página** dentro de `Paginas/` y **un archivo por sección**:

| Quiero cambiar…                                      | Archivo (dentro de `Paginas/`)            |
| ---------------------------------------------------- | ----------------------------------------- |
| Las tarjetas del carrusel de la portada              | `Inicio/carousel.md`                      |
| Los puntos del mapa mundial (y conteos por región)   | `Inicio/map.md`                           |
| Tarjetas de convenios activos (página Destinos)      | `Destinos/convenios.md`                   |
| Próximas oportunidades (página Destinos)             | `Destinos/oportunidades.md`               |
| Programas de Pasantías                               | `Pasantias/pasantias.md`                  |
| Programas de Especialización                         | `Especializaciones/especializaciones.md`  |
| Viajes Académicos                                    | `Viajes/viajes.md`                        |
| Testimonios de intercambio                           | `Testimonios/intercambios.md`             |
| Testimonios de pasantías                             | `Testimonios/pasantias.md`                |
| Testimonios de viajes académicos                     | `Testimonios/viajes.md`                   |

:::tip
Cada destino tiene un `id` (ej. `"ue-madrid"`). Es el mismo en
`Inicio/map.md` y en `Destinos/convenios.md` u `oportunidades.md`: así la
tarjeta de Destinos toma la ciudad y el idioma del mapa, y su flecha abre ese
destino en el mapa.
:::

Los textos que **no** están en esta tabla (menú, pie de página, títulos fijos
de secciones, pasos de “Cómo aplicar”) siguen escritos en el código, dentro de
`src/components/`. Para cambiarlos hay que pedírselo a alguien del equipo de
desarrollo.

## Cómo se ve un archivo de contenido

Cada archivo tiene dos partes separadas por líneas `---`:

```md title="Paginas/Inicio/carousel.md"
---
# Las líneas que empiezan con # son comentarios: explican cada campo.
items:
  - titulo: "La UVG, presente en cuatro continentes"
    descripcion: "Destino destacado"
    footer: "Ver convenios"
    redireccion: "/destinations"
    meta: "14 países · 4 continentes"

  - titulo: "Aplicaciones abiertas"
    descripcion: "Convocatoria abierta"
    footer: "Cómo postularse"
    redireccion: "/exchanges#aplicar"
    meta: "Ciclo 2026–2027"
---

# Inicio · Carusel

Todo lo que está aquí abajo es solo una nota para el equipo.
El sitio no lo muestra.
```

- **Arriba (entre los dos `---`)**: el contenido real. `items:` es una lista y
  cada elemento que empieza con `- ` es **una tarjeta** en la página.
- **Abajo (después del segundo `---`)**: notas para humanos. El sitio lo ignora.
- Los comentarios con `#` al inicio de cada archivo dicen qué significa cada
  campo. La lista completa de campos por página está en
  [`docs/Format_Page.md`](https://github.com/Brariv/Proyecto-Relaciones-Internationales/blob/main/docs/Format_Page.md).

## Tareas comunes

### Cambiar un texto

Busca el campo y cambia solo lo que está **entre comillas**:

```yaml
    precio: "US$3,500"     # antes
    precio: "US$3,800"     # después
```

### Agregar una tarjeta (un viaje, un destino, un testimonio…)

1. Copia un elemento completo de la lista, desde su `- ` hasta justo antes del
   siguiente `- `.
2. Pégalo donde quieras que aparezca. **El orden del archivo es el orden en la
   página.**
3. Cambia los valores. Deja todos los campos, aunque sea con texto vacío
   (`""`): si falta uno, esa parte de la tarjeta se verá en blanco.

### Quitar una tarjeta

Borra el elemento completo (desde su `- ` hasta antes del siguiente) y deja una
línea en blanco entre los que quedan.

### Listas de etiquetas

Los campos `labels` son listas entre corchetes, separadas por comas:

```yaml
    labels: ["Inglés B2", "Nivel maestría", "Convenio"]
```

### Agregar un destino

Un destino nuevo va en **dos archivos**, con el mismo `id`:

1. `Inicio/map.md` — el punto en el mapa (con todos sus datos).
2. `Destinos/convenios.md` si tiene convenio activo, o
   `Destinos/oportunidades.md` si es una próxima oportunidad — la tarjeta de
   la página Destinos.

En `Inicio/map.md`, además de los textos, cada destino necesita:

| Campo     | Qué poner                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------- |
| `id`      | Un identificador único, en minúsculas y sin espacios (ej. `"u-granada"`). No lo repitas.       |
| `lat`     | Latitud de la ciudad, **sin comillas** (ej. `37.18`). Se obtiene en Google Maps: clic derecho → copiar coordenadas. |
| `lng`     | Longitud, **sin comillas** (ej. `-3.60`). Negativa al oeste de Greenwich (América).            |
| `estado`  | `"available"` si hay convenio activo, `"upcoming"` si es una próxima oportunidad.             |
| `flag`    | El emoji de la bandera (ej. `"🇪🇸"`).                                                           |

## Reglas para no romper el archivo

El contenido está en formato **YAML**, que es estricto. Si algo está mal
escrito, el sitio no puede leer ese archivo.

:::caution[Las 5 reglas]
1. **Indentación con espacios, nunca tabs.** Copia la misma sangría de los
   elementos vecinos (2 espacios antes de `- `, 4 antes de cada campo).
2. **Pon los textos entre comillas dobles** `"…"`, sobre todo si tienen `:`,
   `#`, o empiezan con un número o símbolo.
3. Si el texto necesita comillas dobles adentro, usa comillas simples por
   fuera: `'Programa "Disney" con CMU'`.
4. **No cambies los nombres de los campos** (lo que va antes de `:`). El sitio
   los busca por nombre exacto.
5. **No borres los `---`** del inicio y del final del bloque.
:::

**Si guardas un archivo con error en Nextcloud, el sitio no se cae:** sigue
mostrando la última versión buena de esa sección hasta que corrijas el
archivo. Por eso, si tu cambio “no aparece”, lo más probable es un error de
formato. El detalle queda en el registro del sitio
(`npm run docker:logs`), con un mensaje como
`"Paginas/Viajes/viajes.md" tiene un error de formato YAML: bad indentation…`.

Si trabajas en tu computadora (`npm run dev`), el error se muestra
directamente en el navegador, con el número de línea. Revisa esa línea y la
anterior.

## Editar y subir los cambios

### Opción A: en Nextcloud (recomendada)

El sitio lee su contenido directamente de Nextcloud. No hace falta GitHub ni
volver a generar el sitio.

1. Entra a Nextcloud (en local: `http://localhost:8080`) con la **cuenta de
   contenido** (por defecto `contenido`; la contraseña la tiene el
   administrador).
2. Abre **Sitio Web UVG GLOBAL → Paginas →** la carpeta de la página.
3. Haz clic en el archivo `.md` para abrirlo en el editor de Nextcloud, haz tu
   cambio y cierra el editor (se guarda solo).
4. Espera hasta **1 minuto** y recarga el sitio. Ese es el tiempo que el sitio
   guarda el contenido en memoria antes de volver a leer Nextcloud.

:::tip[Otra forma de editar]
Si el editor de Nextcloud te resulta incómodo para el YAML, descarga el
archivo (⋯ → *Descargar*), edítalo en tu computadora con VS Code o el Bloc de
notas, y vuelve a subirlo con el **mismo nombre** (Nextcloud te preguntará si
reemplazarlo: elige reemplazar).
:::

:::note
Si varias personas editan contenido, el administrador puede crearles cuentas
propias en Nextcloud y **compartirles** la carpeta *Sitio Web UVG GLOBAL* con
permiso de edición, en vez de compartir la contraseña de la cuenta de
contenido.
:::

### Opción B: la copia del repositorio

El repositorio guarda una copia de la carpeta en
`nextcloud/Sitio Web UVG GLOBAL/`. Esa copia sirve para dos cosas:

- es el **contenido inicial** que se sube a Nextcloud la primera vez que se
  instala, y
- es el **respaldo** que el sitio muestra si Nextcloud no responde, y lo que
  ves al trabajar en tu computadora con `npm run dev` sin Docker.

:::caution
Editar la copia del repositorio **no cambia lo que hay en Nextcloud** una vez
instalado. Si cambias algo importante en Nextcloud, conviene descargar la
carpeta de vez en cuando y actualizar también la copia del repositorio, para
que el respaldo no quede desactualizado.
:::

Para editarla, en GitHub o en tu computadora:

```bash
git pull                 # trae la última versión
npm install              # por si alguien agregó dependencias
npm run dev              # abre el sitio en http://localhost:4321
```

1. Edita el archivo en `nextcloud/Sitio Web UVG GLOBAL/Paginas/` con cualquier
   editor (VS Code recomendado). Al guardar, recarga el navegador.
2. Cuando esté listo, súbelo en una rama y abre un *pull request*:

```bash
git checkout -b contenido/precio-alemania
git add "nextcloud/Sitio Web UVG GLOBAL"
git commit -m "Actualiza precio del viaje a Alemania"
git push -u origin contenido/precio-alemania
```

## Contenido en un bucket (opcional)

En lugar de Nextcloud, el sitio también puede leer la misma carpeta desde un
servidor de archivos estático (S3, Google Cloud Storage, una CDN…):

1. Sube al bucket el contenido de *Sitio Web UVG GLOBAL* con la misma
   estructura (`Paginas/Inicio/carousel.md`, `Paginas/Viajes/viajes.md`, …).
2. En `.env`, indica la dirección base (y deja vacío `NEXTCLOUD_URL`):

   ```bash title=".env"
   CONTENT_BASE_URL=https://mi-bucket.ejemplo.com/sitio
   ```

Los cambios en el bucket también aparecen solos, después de la caché de 1
minuto. Un bucket no permite listar carpetas, así que ahí el campo `imagen`
debe incluir la carpeta (`imagen: "Viajes_Academicos/Viajes_Alemania-2026.jpg"`).

## Imágenes y otros archivos

### Fotos de las tarjetas

Cada foto del sitio tiene un **nombre fijo que dice dónde va**, con el formato
`<Página>-<Sección>_<Tarjeta>.jpg`. Por ejemplo:

| Foto                                    | Dónde aparece                                  |
| --------------------------------------- | ---------------------------------------------- |
| `Inicio-Carrusel_Noruega.jpg`           | Inicio · carrusel, tarjeta de Noruega          |
| `Inicio_El-Programa.jpg`                | Inicio · sección “El programa”                 |
| `Destinos_Universidad-Europea.jpg`      | Destinos · tarjeta de la Universidad Europea   |
| `Viajes_Alemania-2026.jpg`              | Viajes Académicos · Alemania 2026              |
| `Testimonios-Viajes_Boston.jpg`         | Testimonios · viaje a Boston                   |
| `Pasantias_Duracion-Tipica.jpg`         | Pasantías · foto detrás de “Duración típica”   |

La lista completa está en Nextcloud, en
**`Imagenes/LEEME - Nombres de las fotos.md`**.

**Para cambiar una foto, sube otra con exactamente el mismo nombre** a la misma
carpeta y elige *reemplazar*. Espera hasta 1 minuto y recarga el sitio.

**Para una tarjeta nueva**, pon en su campo `imagen` un nombre con el mismo
formato y sube la foto con ese nombre, en la carpeta de su sección:

```yaml title="Paginas/Destinos/convenios.md"
    imagen: "Destinos_Universidad-de-Chile.jpg"
```

| Sección                  | Carpeta                          |
| ------------------------ | -------------------------------- |
| Carrusel e Inicio        | `Imagenes/Carrusel/`             |
| Destinos (convenios)     | `Imagenes/Destinos/<región>/`    |
| Especialización          | `Imagenes/Especializacion/`      |
| Pasantías                | `Imagenes/Pasantias/`            |
| Viajes Académicos        | `Imagenes/Viajes_Academicos/`    |
| Testimonios              | `Imagenes/Testimonios/<tipo>/`   |

Detalles útiles:

- No importan mayúsculas/minúsculas ni la subcarpeta: el sitio busca el nombre
  en todo `Imagenes/`.
- Si subes un `.png` con el mismo nombre que un `.jpg`, borra el `.jpg`
  anterior: si existen los dos, el sitio usa el que coincide exacto con el
  campo `imagen`.
- Mientras una foto no exista, la tarjeta muestra la imagen de reemplazo
  (placeholder), sin romperse.
- Las fotos de **“El programa”** y **“Duración típica”** no tienen `.md`: se
  cambian solo subiendo otra con su mismo nombre.

Recomendaciones: `.jpg` o `.webp` para fotos, menos de **500 KB** por imagen y
alrededor de **1600 px** de ancho. Formatos aceptados: `.jpg`, `.jpeg`, `.png`,
`.webp`, `.avif` y `.gif`.

### Logos y archivos fijos

Lo que no cambia (logos, el banner de Inicio) está en `public/assets/` del
repositorio y se publica tal cual: `public/assets/hero-boleto.png` queda en
`https://<sitio>/assets/hero-boleto.png`. Para agregar uno, ponlo ahí con un
nombre **sin espacios ni tildes** (ej. `afiche-boston-2026.pdf`) y enlázalo
como `/assets/afiche-boston-2026.pdf`.

## Preguntas frecuentes

**Cambié un archivo en Nextcloud pero el sitio no cambió.**
Espera 1 minuto y recarga (el sitio guarda el contenido en memoria ese
tiempo). Si sigue igual, probablemente el archivo tiene un error de formato y
el sitio está mostrando la última versión buena: revisa las
[reglas](#reglas-para-no-romper-el-archivo).

**Subí una foto y sigue el placeholder.**
Revisa que el nombre del archivo sea el mismo que el campo `imagen` (sin
espacios de más) y que esté dentro de `Imagenes/`.

**Una tarjeta aparece con un espacio vacío.**
Le falta un campo o tiene un nombre de campo mal escrito. Compárala con otra
tarjeta del mismo archivo.

**Quiero agregar un campo nuevo a las tarjetas.**
Eso requiere cambiar el componente que las dibuja. Ver
[Editar contenido](/docs/guias/contenido/#agregar-un-componente-con-contenido-editable).
