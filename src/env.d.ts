/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Base URL of a static bucket (e.g. S3/GCS/CDN) that mirrors the /data
   * directory structure. When unset, content is read from /data on disk.
   */
  readonly CONTENT_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
