# Hibiki's Design and Code Notes

Hibiki's personal technical blog about interface design, front-end development, and interaction details. Built with Astro, TypeScript, and Tailwind CSS.

The home page contains a short introduction, the four latest notes, an interactive example, and an author profile. The newest note has a cover; the other three appear as list rows. All notes are available at `/notes/`, grouped by year. The outer layout expands with the viewport rather than using a centered maximum width. On reading pages, prose and code fill the adaptive main column, with a normal gutter between the article and its table of contents.

The home-page example is interactive and can switch to a code view. Each article has its own static reading page with a table of contents, code examples, and related notes. The current articles are sample content that can be replaced.

The theme study at `/articles/web-theme-design/` contains ten web themes. Each includes independent light and dark previews, design notes, color values, and reusable CSS variables. The Liquid Glass preview uses native WebGL 2 for curved refraction, signed distance field (SDF) merging, and contact deformation during dragging. Text and controls remain in HTML, with frosted or solid fallbacks.

The website design study at `/articles/website-design-studies/` introduces four standalone pages. Article links and covers use screenshots of the actual previews:

- `/previews/apple/`: Oriel, a fictional desk lamp. The CSS-drawn lamp lights up and pulls back as you scroll. You can adjust its color temperature and brightness, rotate the lamp head through scrolling, and switch between four finishes.
- `/previews/linear/`: Relay, a fictional collaboration tool. The workspace tilts into place as you scroll. It supports list and board views, task details, and completion controls. Moving tasks between board columns updates their status, counts, and progress together. Reloading restores the demo data.
- `/previews/aesop/`: Still, a fictional ceramics brand. Scrolling shapes a lump of clay on a wheel into a bowl. A catalog switches between SVG vessel shapes, and a firing curve is drawn as you read.
- `/previews/nike/`: Stride, a fictional sports brand. It features animated track lines and large type, opposing scrolling text bands, a three-stage scroll-driven route map, and an outing checklist with a progress ring.

Each preview has navigation, additional sections, and a footer. The bottom-right toolbar switches between studies or returns to the article. Motion uses native CSS, the Web Animations API, and on-demand `requestAnimationFrame`, without an additional animation library. With reduced motion enabled, pinned scroll sections show their completed state or appear in sequence, while controls remain usable. The previews do not load the blog's theme.

## English and Chinese

Every page has an English and a Chinese version. English is the default at `/`; Chinese uses the same paths under `/zh/`. Language links in the navigation and preview toolbar point to the other-language version of the current page.

- `src/i18n.ts` detects the locale from the URL and provides `t(chinese, english)`, locale-prefixed links, and the corresponding page in the other language.
- `src/pages/[...locale]/` contains all pages beneath an optional locale segment. Each template generates both language versions.
- `src/data/content.en.ts` and `src/data/web-themes.en.ts` contain English article and theme copy. Structure, dates, color values, and code examples still come from the primary Chinese data files.
- Interface copy in pages and components uses `t(chinese, english)` directly.

## Local Development

Requires Node.js 24 LTS and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:4321` after the server starts.

## Build the Static Site

```bash
npm run build
npm run preview
```

The build runs Astro's type checks, then writes the static site to `dist/`. The output can also be deployed to Cloudflare Pages or served with Nginx.

## GitHub Pages Deployment

The site is published at https://hibikireo.github.io/. The Chinese home page is https://hibikireo.github.io/zh/.

`.github/workflows/deploy.yml` deploys automatically on pushes to `main`. It can also be run manually from GitHub Actions. The workflow uses Node.js 24, runs `npm ci` and `npm run build`, then publishes `dist/` to GitHub Pages. Build output is not committed to the repository.

In the repository's Settings → Pages → Source, select GitHub Actions. This is a user-site repository served from the domain root, so no `base` setting is needed.

## Content and Source Files

- `src/data/content.ts`: Article content, organized into sections with paragraphs, code blocks, theme previews, or links to standalone website studies.
- `src/data/web-themes.ts`: Light and dark palettes and design notes for ten themes: Liquid Glass, Soft Relief, Swiss Grid, Neo-Brutalism, Retro Pixel, Warm Collage, Editorial, Warm Gray Glass, Charcoal Gallery, and Olive Notes.
- `src/data/site-studies.ts`: Names, routes, descriptions, and base colors for the four website previews.
- `src/layouts/PreviewLayout.astro`: The standalone preview shell and switching toolbar. It does not load the blog's global styles or theme script.
- `src/pages/[...locale]/previews/`: The four complete website previews, each with its own layout and styles.
- `src/scripts/site-previews.ts`: Writes scroll progress to the `--progress` and `--view` CSS variables. Handles entrances, number animations, lamp controls, finishes, the vessel catalog, checklists, and task operations.
- `src/components/OrielLamp.astro`: A CSS-drawn lamp whose finish, light color, brightness, and head angle are controlled by custom properties.
- `src/components/WebsitePreviewLink.astro`: Article links that open the standalone website previews.
- `src/pages/[...locale]/index.astro`: The home page, showing the four latest notes and an interactive example.
- `src/pages/[...locale]/notes.astro`: All notes, grouped by year.
- `src/components/ArticleRow.astro`: Article rows shared by the home page and notes list.
- `src/pages/[...locale]/articles/[slug].astro`: Generates individual reading pages from article data.
- `src/components/SiteHeader.astro` and `SiteFooter.astro`: Navigation and footer shared by the home page and reading pages.
- `src/components/InteractivePreview.astro`: The home-page example and its code view.
- `src/components/ArticleVisual.astro`: Design, code, and interaction thumbnails used in article listings.
- `src/components/ThemeShowcase.astro`: Shared light/dark controls, color values, and CSS variables for theme studies. Also handles the Editorial, Warm Gray Glass, Charcoal Gallery, and Olive Notes layouts.
- `src/components/ThemeStudyPreview.astro`: Previews for Soft Relief, Swiss Grid, Neo-Brutalism, Retro Pixel, and Warm Collage, plus the Liquid Glass entry point.
- `src/components/LiquidGlassPreview.astro` and `src/scripts/liquid-glass.ts`: The local optical scene for Liquid Glass, including edge refraction, SDF deformation and merging, retargetable analytical springs, and pointer dragging. Text and native radio inputs remain in HTML, and drawing stops when the scene settles. When WebGL 2 is unavailable, the component falls back to CSS-frosted navigation. Reduced-transparency or increased-contrast preferences use solid controls.
- `src/styles/global.css`: Full-width home and reading-page styles, with neutral white/gray, charcoal, and brick-orange colors.
- `src/styles/themes.css`: Dark theme, responsive layouts, and transparency/contrast preference support.
- `src/styles/motion.css`: Entrance, press, and dialog motion, plus reduced-motion styles.
- `src/scripts/motion.ts`: Critically damped springs, the navigation selection marker, and reading progress.
- `src/scripts/home.ts`: Interactive examples, keyboard controls, and link copying.
- `src/scripts/theme.ts`: Light/dark switching and saved local preferences.

## Color and Interaction

The light theme uses neutral pale gray and white. The dark theme uses neutral charcoal without a blue tint. Both avoid cream, blue, and navy backgrounds. Links and selected details use brick orange.

Navigation has a lightly frosted surface. The active underline and example switch use springs that can change target while moving. Reduced-motion preferences remove translation and scaling.

## Fonts and Music Decoration

The footer includes a small musical-score decoration. Its glyphs come from Bravura (© Steinberg Media Technologies GmbH), used under the SIL Open Font License 1.1. The license is stored in `licenses/BRAVURA-OFL.txt`. Assets are local and do not depend on external image or font services.

The sports study's large English type uses a local copy of Archivo Black, copyright The Archivo Black Project Authors, under the SIL Open Font License 1.1. See `licenses/ARCHIVO-BLACK-OFL.txt`.

The four website previews use no photography or third-party images. Brands, products, and data are fictional; visuals are drawn with CSS and SVG. The files `cover-apple.jpg`, `cover-linear.jpg`, `cover-aesop.jpg`, and `cover-nike.jpg` in `public/images/site-studies/` are browser screenshots of the corresponding previews, used for article links and covers. The four files with an `-en` suffix were captured from the English pages.
