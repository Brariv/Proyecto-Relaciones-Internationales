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

1. Busca el archivo de la página que quieres cambiar en la carpeta `data/`
   (ver [la tabla de abajo](#qué-archivo-cambia-qué-página)).
2. Edita el texto entre comillas, respetando la indentación.
3. Revisa el cambio (en tu computadora o en la vista previa de GitHub).
4. Sube el cambio a GitHub (o al bucket, si el sitio usa contenido remoto).
5. Vuelve a generar el sitio (`npm run build`) para que el cambio se publique.

## Qué archivo cambia qué página

Todo el contenido editable está en la carpeta `data/`, con **una carpeta por
página** y **un archivo por sección**:

| Quiero cambiar…                                   | Archivo                            |
| ------------------------------------------------- | ---------------------------------- |
| Las tarjetas del carrusel de la portada           | `data/start/carousel.md`           |
| Universidades / destinos (mapa, página Destinos)  | `data/start/map.md`                |
| Programas de Pasantías                            | `data/internships/programs.md`     |
| Programas de Especialización                      | `data/specialization/programs.md`  |
| Viajes Académicos                                 | `data/trips/trips.md`              |
| Testimonios de intercambio                        | `data/testimonies/exchanges.md`    |
| Testimonios de pasantías                          | `data/testimonies/internships.md`  |
| Testimonios de viajes académicos                  | `data/testimonies/trips.md`        |

:::tip
`data/start/map.md` es la única fuente de destinos. Una universidad agregada
ahí aparece sola en el mapa de Inicio, en la página Destinos y en los conteos
por región.
:::

Los textos que **no** están en esta tabla (menú, pie de página, títulos fijos
de secciones, pasos de “Cómo aplicar”) siguen escritos en el código, dentro de
`src/components/`. Para cambiarlos hay que pedírselo a alguien del equipo de
desarrollo.

## Cómo se ve un archivo de contenido

Cada archivo tiene dos partes separadas por líneas `---`:

```md title="data/start/carousel.md"
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

### Agregar un destino al mapa

En `data/start/map.md`, además de los textos, cada destino necesita:

| Campo     | Qué poner                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------- |
| `id`      | Un identificador único, en minúsculas y sin espacios (ej. `"u-granada"`). No lo repitas.       |
| `lat`     | Latitud de la ciudad, **sin comillas** (ej. `37.18`). Se obtiene en Google Maps: clic derecho → copiar coordenadas. |
| `lng`     | Longitud, **sin comillas** (ej. `-3.60`). Negativa al oeste de Greenwich (América).            |
| `estado`  | `"available"` si hay convenio activo, `"upcoming"` si es una próxima oportunidad.             |
| `flag`    | El emoji de la bandera (ej. `"🇪🇸"`).                                                           |

## Reglas para no romper el archivo

El contenido está en formato **YAML**, que es estricto. Si algo está mal
escrito, el sitio no se genera y muestra un error.

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

Si el archivo tiene un error, `npm run build` (o `npm run dev`) mostrará un
mensaje como `YAMLException: bad indentation…` junto con el número de línea.
Revisa esa línea y la anterior.

## Editar y subir los cambios

Hay dos formas. Elige la que te resulte más cómoda.

### Opción A: directo en GitHub (sin instalar nada)

1. Entra al repositorio:
   [github.com/Brariv/Proyecto-Relaciones-Internationales](https://github.com/Brariv/Proyecto-Relaciones-Internationales).
2. Abre la carpeta `data/`, luego la carpeta de la página y el archivo `.md`.
3. Haz clic en el ícono del **lápiz** (“Edit this file”).
4. Haz tus cambios. Puedes usar la pestaña **Preview** para revisar.
5. Clic en **Commit changes…**, escribe una descripción corta
   (ej. `Actualiza precio del viaje a Alemania`).
6. Elige **“Create a new branch… and start a pull request”** y confirma.
   Así otra persona del equipo puede revisar antes de publicar.

:::note
Necesitas una cuenta de GitHub con permiso de escritura en el repositorio.
Si no lo tienes, pídele acceso al administrador del proyecto.
:::

### Opción B: en tu computadora (para ver el resultado antes de subir)

Primero instala el proyecto (solo la primera vez), según
[Instalación y comandos](/docs/instalacion/). Luego:

```bash
git pull                 # trae la última versión
npm install              # por si alguien agregó dependencias
npm run dev              # abre el sitio en http://localhost:4321
```

1. Edita el archivo en `data/` con cualquier editor (VS Code recomendado).
2. Al guardar, recarga el navegador para ver el cambio.
3. Cuando esté listo, súbelo:

```bash
git checkout -b contenido/precio-alemania     # crea una rama para tu cambio
git add data/
git commit -m "Actualiza precio del viaje a Alemania"
git push -u origin contenido/precio-alemania
```

4. En GitHub aparecerá un botón **Compare & pull request** para abrir la
   revisión.

## Contenido en un bucket (opcional)

El sitio puede leer la carpeta `data/` desde un servidor de archivos en la nube
(S3, Google Cloud Storage, una CDN…) en lugar de desde el repositorio. Esto
permite actualizar textos **sin tocar GitHub**.

1. Sube al bucket la carpeta `data/` **con la misma estructura de carpetas**:

   ```
   https://mi-bucket.ejemplo.com/data/start/carousel.md
   https://mi-bucket.ejemplo.com/data/start/map.md
   https://mi-bucket.ejemplo.com/data/trips/trips.md
   …
   ```

   Los archivos deben poder leerse públicamente (o al menos desde donde se
   genera el sitio).

2. En el archivo `.env` del proyecto (copia de `.env.example`), indica la
   dirección base:

   ```bash title=".env"
   CONTENT_BASE_URL=https://mi-bucket.ejemplo.com/data
   ```

3. Para actualizar contenido, reemplaza el archivo en el bucket y **vuelve a
   generar el sitio** con `npm run build`.

:::caution
El sitio es **estático**: lee el contenido una sola vez, al generarse. Subir un
archivo nuevo al bucket no cambia lo que ya está publicado hasta el siguiente
`npm run build`.

Si el bucket está configurado, el sitio **ignora** la carpeta `data/` local.
Si falta un archivo en el bucket, el build falla con
`No se pudo cargar el contenido remoto "<página>/<archivo>.md": 404`.
:::

## Imágenes y otros archivos

### Logos y archivos fijos

Todo lo que esté en `public/` se publica tal cual. Por ejemplo,
`public/assets/hero-boleto.png` queda disponible en
`https://<sitio>/assets/hero-boleto.png`.

Para agregar un archivo (un logo, un PDF descargable):

1. Ponlo en `public/assets/` con un nombre **sin espacios ni tildes**
   (ej. `afiche-boston-2026.pdf`, no `Afiche Boston 2026.pdf`).
2. Enlázalo como `/assets/afiche-boston-2026.pdf`.
3. Súbelo igual que cualquier otro cambio (GitHub → *Add file → Upload files*,
   o con `git add` en tu computadora).

Recomendaciones para imágenes: formato `.jpg` o `.webp` para fotos y `.png`
para logos, menos de **500 KB** por imagen y alrededor de **1600 px** de ancho.

### Fotos de las tarjetas

:::note[Estado actual]
Por ahora **todas las fotos del sitio muestran una imagen de reemplazo**
(placeholder). El campo `imagen` de los archivos en `data/` es solo una nota
que describe qué foto debería ir (ej. `"Foto de Madrid, UEM o tema
aeronáutico"`); el sitio todavía no lo usa para mostrar una imagen.
:::

Mientras tanto, puedes ir dejando las fotos listas:

1. Guarda cada foto en `public/assets/` con un nombre claro
   (ej. `viaje-alemania-2026.jpg`).
2. Anota en el campo `imagen` de su tarjeta la ruta que tendrá, para que el
   equipo de desarrollo la conecte:

   ```yaml
       imagen: "/assets/viaje-alemania-2026.jpg"
   ```

## Preguntas frecuentes

**Cambié un archivo pero el sitio no cambió.**
Si estás en `npm run dev`, recarga la página. En el sitio publicado, el cambio
solo aparece después de un nuevo `npm run build` (y de subir ese build). Si
usas bucket, verifica que editaste el archivo del bucket y no el local.

**El build falla después de mi cambio.**
Casi siempre es la indentación o una comilla sin cerrar. Lee el número de línea
del error y revisa las [reglas](#reglas-para-no-romper-el-archivo).

**Una tarjeta aparece con un espacio vacío.**
Le falta un campo o tiene un nombre de campo mal escrito. Compárala con otra
tarjeta del mismo archivo.

**Quiero agregar un campo nuevo a las tarjetas.**
Eso requiere cambiar el componente que las dibuja. Ver
[Editar contenido](/docs/guias/contenido/#agregar-un-componente-con-contenido-editable).
