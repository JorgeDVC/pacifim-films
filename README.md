# PACIFIM FILMS — Sitio web

Sitio de una sola página (HTML + CSS + JS, sin frameworks ni build step) para el estudio de fotografía y producción audiovisual PACIFIM FILMS.

## Estructura

```
pacifim-films/
├── index.html          → Todo el contenido y estructura
├── css/style.css        → Estilos (paleta, tipografía, componentes, responsive)
├── js/script.js         → Menú móvil, tabs, galería, animaciones, formulario
├── assets/               → Logo (recortado con fondo transparente) y favicons
├── site.webmanifest     → Metadatos para "instalar" el sitio como app
├── robots.txt            → Indicaciones para buscadores
└── sitemap.xml           → Mapa del sitio para SEO
```

## Rendimiento

El proyecto está optimizado para cargar rápido:

- **`assets/logo.png` pesa 15 KB** (antes 460 KB) — se re-exportó al tamaño real que se muestra en pantalla (230px, suficiente para retina) con paleta de color adaptativa. Si algún día reemplazas el logo por otro archivo, mantén esta lógica: nunca subas una imagen a resolución "de impresión" para usarla como ícono de 44-92px.
- **Las fuentes de Google no bloquean el primer renderizado**: se cargan con el patrón `media="print" onload="this.media='all'"` (líneas 36-41 de `index.html`), con `<noscript>` de respaldo. Solo se piden los pesos de fuente que el CSS realmente usa (Playfair Display 600; Karla 400/600/700; Space Mono 400/700).
- El logo del footer usa `loading="lazy"` por estar fuera de la pantalla inicial.
- Si vuelves a subir una imagen (logo, favicon, foto de galería), repite el mismo criterio: expórtala al tamaño máximo real en que se va a mostrar, no al tamaño original de la foto/diseño.

## Contacto usado en el sitio

Tomado directamente del flyer de marca:
- WhatsApp: 5595 0707 · 5843 4671 · 5340 4640
- Instagram / Facebook: @pacifim.films
