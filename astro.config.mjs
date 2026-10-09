import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The public site lives in src/pages/[...slug].astro (/, /exchanges, ...).
// Starlight serves the project documentation under /docs — its pages live in
// src/content/docs/docs/**, so they never collide with the site's routes.
export default defineConfig({
  integrations: [
    starlight({
      title: 'UVG Global · Documentación',
      description:
        'Documentación técnica del sitio de Relaciones Internacionales de la UVG: instalación, estructura, contenido y componentes.',
      // Spanish UI for Starlight's own labels ("En esta página", "Buscar", ...)
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Brariv/Proyecto-Relaciones-Internationales',
        },
      ],
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        {
          label: 'Empezar',
          items: [
            { label: 'Introducción', slug: 'docs' },
            { label: 'Instalación y comandos', slug: 'docs/instalacion' },
          ],
        },
        {
          label: 'Guías',
          // every file in src/content/docs/docs/guias/ shows up here automatically
          items: [{ autogenerate: { directory: 'docs/guias' } }],
        },
      ],
    }),
  ],
});
