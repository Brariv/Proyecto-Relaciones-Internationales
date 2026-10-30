---
title: Docker y Nextcloud
description: Levantar el sitio junto con Nextcloud, de dónde lee el contenido y cómo usar su API.
sidebar:
  order: 4
---

El proyecto incluye un `docker-compose.yml` con tres servicios:

| Servicio    | Qué es                                                      | Dirección local          |
| ----------- | ----------------------------------------------------------- | ------------------------ |
| `site`      | El sitio UVG Global (Astro, servidor Node)                  | `http://localhost:4321`  |
| `nextcloud` | Nextcloud 35: interfaz web para editar + API WebDAV         | `http://localhost:8080`  |
| `db`        | MariaDB, la base de datos de Nextcloud                      | (solo interna)           |

El contenido vive en Nextcloud, en la carpeta **Sitio Web UVG GLOBAL** de la
cuenta de contenido. El sitio la lee por WebDAV en cada visita (con caché), así
que **lo que se edita en Nextcloud aparece en el sitio sin volver a compilar**.

```
 Editor ──(navegador)──▶ Nextcloud :8080 ◀──(WebDAV, cuenta "contenido")── site :4321 ◀── Visitante
                         Sitio Web UVG GLOBAL/
                           Paginas/*.md   (textos)
                           Imagenes/**    (fotos)
```

## Primer arranque

Necesitas [Docker Desktop](https://www.docker.com/products/docker-desktop/)
(o Docker Engine + Compose).

1. Crea tu `.env` y **cambia todas las contraseñas**:

   ```bash
   cp .env.example .env
   ```

   | Variable                   | Para qué                                                     |
   | -------------------------- | ------------------------------------------------------------ |
   | `NEXTCLOUD_ADMIN_PASSWORD` | Administrador de Nextcloud (usuario `admin`)                 |
   | `CONTENT_USER` / `CONTENT_PASSWORD` | Cuenta dueña del contenido; el sitio lee con ella   |
   | `DB_PASSWORD` / `DB_ROOT_PASSWORD`  | Base de datos de Nextcloud                          |

2. Levanta todo:

   ```bash
   npm run docker:up        # = docker compose up -d --build
   ```

3. Espera de **1 a 3 minutos** la primera vez. Nextcloud se instala y un
   script (`docker/nextcloud/hooks/post-installation/10-contenido-uvg.sh`):
   - crea la cuenta de contenido,
   - sube la carpeta `nextcloud/Sitio Web UVG GLOBAL/` del repositorio a esa
     cuenta,
   - deja Nextcloud en español.

   El sitio arranca cuando Nextcloud está listo. Para ver el progreso:

   ```bash
   npm run docker:logs
   ```

4. Abre `http://localhost:8080`, entra con `CONTENT_USER` / `CONTENT_PASSWORD`
   y verás la carpeta **Sitio Web UVG GLOBAL**. El sitio está en
   `http://localhost:4321`.

| Comando               | Qué hace                                                  |
| --------------------- | --------------------------------------------------------- |
| `npm run docker:up`   | Construye y levanta los tres servicios en segundo plano.  |
| `npm run docker:logs` | Muestra el registro del sitio y de Nextcloud.             |
| `npm run docker:down` | Apaga todo. **Los datos se conservan** (volúmenes).       |

:::danger[Borrar todo]
`docker compose down -v` elimina también los volúmenes: **se pierden** la base
de datos y todo lo subido a Nextcloud. Al volver a levantarlo se reinstala
desde la copia del repositorio.
:::

:::note
El script de carga inicial corre **una sola vez**, al instalarse Nextcloud.
Después, Nextcloud es la fuente del contenido; cambiar la copia del repositorio
no lo sobrescribe.
:::

## De dónde lee el contenido el sitio

`src/lib/content.ts` decide la fuente según las variables de entorno:

| Si está definido…                                   | Lee de…                                      |
| --------------------------------------------------- | -------------------------------------------- |
| `NEXTCLOUD_URL` + `NEXTCLOUD_USER` + `NEXTCLOUD_PASSWORD` | Nextcloud, por WebDAV (lo que usa Docker) |
| `CONTENT_BASE_URL`                                  | Un bucket HTTP estático con la misma carpeta |
| nada                                                | La copia local `nextcloud/Sitio Web UVG GLOBAL/` |

Comportamiento:

- **Caché:** cada archivo y la lista de fotos se guardan en memoria
  `CONTENT_CACHE_TTL` segundos (60 por defecto). Por eso un cambio tarda hasta
  1 minuto en verse.
- **Si Nextcloud no responde** (caído, lento o con la contraseña mal), el sitio
  sigue funcionando: usa la última copia buena o, si no tiene ninguna, la copia
  local. Lo deja anotado en el registro como
  `[contenido] No se pudo leer de nextcloud: …`.
- **Si un `.md` tiene un error de YAML**, se trata igual que un fallo: los
  visitantes siguen viendo la última versión buena de esa sección.

### Fotos

Las fotos están protegidas por la cuenta de contenido, así que el navegador no
puede pedírselas a Nextcloud directamente. El sitio hace de intermediario en
`/media/…` (`src/pages/media/[...path].ts`): busca la foto en Nextcloud y la
devuelve. Solo sirve imágenes (`.jpg`, `.png`, `.webp`, `.avif`, `.gif`)
dentro de `Imagenes/`.

El campo `imagen` de cada tarjeta es un **nombre de archivo**. El sitio lo busca
en todo `Imagenes/` (sin importar subcarpeta ni mayúsculas) y, si no existe,
muestra el placeholder. Ver [Fotos de las tarjetas](/docs/guias/manual-de-uso/#fotos-de-las-tarjetas).

## Subir archivos desde el repositorio

Para pasar a Nextcloud archivos que están en la copia del repositorio
(`nextcloud/Sitio Web UVG GLOBAL/`), por ejemplo un lote de fotos ya
preparadas, usa el script incluido. Lee la cuenta y la contraseña de tu `.env`:

```bash
npm run nextcloud:subir                                   # sube Imagenes/
npm run nextcloud:subir -- Imagenes Paginas/Inicio/carousel.md
npm run nextcloud:subir -- --dry-run Imagenes             # solo muestra qué haría
```

- Crea las carpetas que falten y **se salta** lo que ya está igual en Nextcloud.
- Antes de reemplazar un `.md`, guarda la versión que había en Nextcloud en
  `.nextcloud-backup/<fecha>/`, por si alguien la había editado ahí.
- El sitio muestra lo subido en máximo 1 minuto, sin reiniciar nada.

## La API de Nextcloud (WebDAV)

Todo lo que se hace en la interfaz también se puede hacer por API, por ejemplo
para cargas masivas de fotos o scripts. La base es:

```
http://localhost:8080/remote.php/dav/files/<usuario>/Sitio%20Web%20UVG%20GLOBAL/
```

```bash
U=contenido:tu-contraseña
BASE="http://localhost:8080/remote.php/dav/files/contenido/Sitio%20Web%20UVG%20GLOBAL"

# Descargar un archivo de contenido
curl -u "$U" "$BASE/Paginas/Viajes/viajes.md" -o viajes.md

# Subir (o reemplazar) un archivo
curl -u "$U" -T viajes.md "$BASE/Paginas/Viajes/viajes.md"

# Subir una foto
curl -u "$U" -T Viajes_Alemania-2026.jpg "$BASE/Imagenes/Viajes_Academicos/Viajes_Alemania-2026.jpg"

# Crear una carpeta
curl -u "$U" -X MKCOL "$BASE/Imagenes/Carrusel/2027"

# Listar una carpeta
curl -u "$U" -X PROPFIND -H "Depth: 1" "$BASE/Imagenes/"
```

:::tip[Contraseñas de aplicación]
En vez de la contraseña normal, para scripts y para el sitio conviene una
**contraseña de aplicación**: en Nextcloud, *Configuración personal →
Seguridad → Crear nueva contraseña de aplicación*. Se puede revocar sin cambiar
la contraseña de la cuenta. Para usarla en el sitio, ponla en
`CONTENT_PASSWORD` del `.env` y reinicia con `npm run docker:up`.
:::

## Desarrollo sin Docker

`npm run dev` funciona igual que siempre y lee la copia local
`nextcloud/Sitio Web UVG GLOBAL/`. Para probar contra el Nextcloud de Docker,
agrega en tu `.env`:

```bash title=".env"
NEXTCLOUD_URL=http://localhost:8080
NEXTCLOUD_USER=contenido
NEXTCLOUD_PASSWORD=tu-contraseña
```

## Llevarlo a un servidor

Lo mínimo para publicarlo:

1. Pon el servidor detrás de un proxy con **HTTPS** (Caddy, Traefik, Nginx)
   que dirija el dominio del sitio a `site:4321` y el de Nextcloud a
   `nextcloud:80`.
2. Agrega el dominio de Nextcloud en `NEXTCLOUD_DOMAIN` del `.env` (Nextcloud
   rechaza dominios que no conoce).
3. Usa contraseñas largas y una contraseña de aplicación para el sitio.
4. Respalda los volúmenes `uvg-global_db` y `uvg-global_nextcloud`.

## Problemas comunes

**No puedo entrar con la cuenta de contenido / no existe.**
Casi siempre es que `CONTENT_PASSWORD` tenía **menos de 10 caracteres**:
Nextcloud la rechaza, la cuenta no se crea y tampoco se sube la carpeta. Para
confirmarlo, busca en `docker compose logs nextcloud` las líneas `[uvg]`.
Para arreglarlo:

1. En `.env`, pon en `CONTENT_PASSWORD` una contraseña de 10 caracteres o más
   (que no sea muy común, como `1234567890`).
2. Aplica el cambio a los contenedores: `npm run docker:up`.
3. Vuelve a correr el script de carga inicial:

   ```bash
   docker compose exec -u www-data nextcloud /docker-entrypoint-hooks.d/post-installation/10-contenido-uvg.sh
   ```

4. Entra con `CONTENT_USER` y la contraseña nueva.

**El registro dice `429 Too Many Requests` o “Nextcloud bloqueó temporalmente al sitio”.**
Es la protección contra fuerza bruta de Nextcloud: el sitio intentó entrar
muchas veces con una contraseña incorrecta (por ejemplo, antes de que existiera
la cuenta) y Nextcloud bloqueó su IP, aunque la contraseña ya sea correcta.

1. Primero asegúrate de que la cuenta exista y la contraseña coincida (ver el
   punto anterior).
2. Desbloquea la IP del sitio:

   ```bash
   SITE_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker compose ps -q site))
   docker compose exec -u www-data nextcloud php occ security:bruteforce:reset "$SITE_IP"
   ```

3. Reinicia el sitio: `docker compose restart site`.

El sitio, al recibir un 401 o un 429, deja de consultar Nextcloud por 5 minutos
justamente para no empeorar el bloqueo.

**El sitio muestra el contenido viejo (de la copia del repositorio).**
El sitio no logra leer Nextcloud. Revisa `npm run docker:logs` y busca
`[contenido] No se pudo leer de nextcloud`: si dice `401`, la contraseña de
`CONTENT_PASSWORD` no coincide con la de la cuenta; si dice `404`, la carpeta
no se llama igual que `CONTENT_DIR`.

**Nextcloud dice “Acceso a través de un dominio no confiable”.**
Agrega ese dominio a `NEXTCLOUD_DOMAIN` en `.env` y vuelve a levantarlo. Si
Nextcloud ya estaba instalado, agrégalo también con
`docker compose exec -u www-data nextcloud php occ config:system:set trusted_domains 3 --value=tu.dominio`.

**Cambié la contraseña de la cuenta de contenido en Nextcloud.**
Actualiza `CONTENT_PASSWORD` en `.env` y ejecuta `npm run docker:up` para
reiniciar el sitio con la nueva.
