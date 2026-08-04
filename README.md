# Mary Miller — Artist Portfolio

A production-ready artist portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
shadcn/ui, and Sanity CMS. Designed to feel like a modern art gallery — large imagery, generous
whitespace, and subtle motion, with the artwork always the focus.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** + **shadcn/ui** (radix-based components)
- **Sanity CMS** — content modeled as a standalone Studio (`sanity.config.ts`)
- **Framer Motion** for scroll reveals, hover states, and page transitions
- **next/image** for optimized, responsive images
- **Lucide** icons
- Deployed on **Vercel**

## Project structure

```
src/
  app/                 Routes (App Router): home, gallery, artwork/[slug], about,
                        exhibitions, exhibitions/[slug], news, news/[slug], contact,
                        api/*, sitemap, robots, OG image
  components/
    ui/                shadcn/ui primitives (button, card, dialog, field, etc.)
    layout/            Navbar, Footer, PageTransition
    gallery/           ArtworkCard, GalleryGrid, ArtworkCarousel, Lightbox, ImageMasonry
    sections/          Homepage sections (Hero, FeaturedWorks, ArtistStatement, RecentExhibitions)
    shared/            AnimatedSection, SectionHeading, Timeline, ContactForm, PortableText renderer
  sanity/
    schemaTypes/       Document & object schemas (artwork, category, biography, exhibition, cvEntry, newsPost)
    lib/                Sanity client, image URL builder, GROQ queries, typed fetchers
    structure.ts        Studio desk structure (singleton Biography)
  lib/                  Site constants, fonts, formatting helpers, cn()
  types/                Shared TypeScript types for CMS content
sanity.config.ts        Sanity Studio config (standalone, not embedded in the Next.js app)
sanity.cli.ts           Sanity CLI config
scripts/seed.ts          One-command example content seeding
```

## Content model (Sanity)

Six document types, defined in `src/sanity/schemaTypes/documents/`:

| Type        | Purpose                                                              |
| ----------- | --------------------------------------------------------------------- |
| `category`  | Gallery filter categories (Paintings, Drawings, Prints, …)             |
| `artwork`   | Title, slug, category, year, medium, dimensions, description, images, availability, price, and a `commissioned` flag that drives the gallery's Commissioned filter |
| `biography` | Singleton — portrait, bio, artist statement, contact links             |
| `exhibition`| Title, venue, city, type (solo/group), dates, description, installation photographs, and references to the works shown |
| `cvEntry`   | Single CV line, grouped by `section` (education, awards, publications, residencies, collections, press). Surfaced on the About page — there is no standalone CV page |
| `newsPost`  | Title, date, excerpt, body, cover image                                |

GROQ queries live in `src/sanity/lib/queries.ts`; typed fetch functions (with graceful
fallbacks if the CMS is unreachable) live in `src/sanity/lib/fetchers.ts`.

### Why a standalone Studio?

The Studio is **not** embedded in the Next.js app (no `/studio` route). It's run and deployed
separately via the Sanity CLI. This keeps the marketing site's bundle lean, decouples release
cycles, and avoids version-compatibility issues between the Studio's React usage and the
Next.js app's own React tree. See "Running the Studio" below.

## Installation

Requires **Node 20.19+ / 22.12+** (the Sanity Studio's tooling requires this; the Next.js app
itself is more lenient but this is the recommended baseline).

```bash
npm install
```

## Environment variables

Copy the example file and fill in your own values:

```bash
cp .env.local.example .env.local
```

| Variable                          | Required | Purpose |
| ---------------------------------- | -------- | ------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`    | yes      | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET`       | yes      | Usually `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION`   | yes      | Any date ≤ today, e.g. `2025-01-01` |
| `SANITY_API_READ_TOKEN`            | no       | Only needed to read draft/private content from the server |
| `SANITY_API_WRITE_TOKEN`           | no       | Only needed to run `npm run seed` |
| `SANITY_REVALIDATE_SECRET`         | yes      | Shared secret for the `/api/revalidate` webhook |
| `NEXT_PUBLIC_SITE_URL`             | yes      | Used for metadata, sitemap, and Open Graph URLs |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | no | Wires the contact form to [Resend](https://resend.com); without these, submissions are logged server-side instead of emailed |

## Connecting Sanity

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or run `npx sanity init`
   from this directory and choose "Create new project").
2. Copy the **Project ID** into `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In your Sanity project's API settings, add CORS origins for `http://localhost:3000` and your
   production domain, with credentials allowed.
4. (Optional, for seeding) Create a token with **Editor** access under API → Tokens, and set it
   as `SANITY_API_WRITE_TOKEN`.

### Running the Studio

The Studio is a separate app that shares this repo's schema and config:

```bash
npm run studio:dev      # local Studio at http://localhost:3333
npm run studio:deploy   # deploys to https://<your-project>.sanity.studio
```

### Seeding example content

Once your project ID and a write token are set in `.env.local`:

```bash
npm run seed
```

This creates three example categories, six artworks (with placeholder images uploaded as
Sanity assets), a biography, CV entries across every section, three exhibitions (with cover
images, installation photographs, and linked works), and two news posts. It's safe to re-run — every document has a fixed ID, so re-seeding updates the same
records instead of duplicating them. Replace the placeholder images and copy with real content
via the Studio afterwards.

### On-demand revalidation (optional)

Pages are statically generated and revalidate on a 60s interval by default. For instant updates
when content is published, add a webhook in Sanity (API → Webhooks) pointing at
`https://your-domain.com/api/revalidate`, with the same secret as `SANITY_REVALIDATE_SECRET`,
triggered on document create/update/delete.

## Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders correctly (with empty
states) even before Sanity is connected, so you can review layout and design immediately.

To preview with placeholder artwork/photos instead of empty states, set
`NEXT_PUBLIC_DEMO_MODE=true` in `.env.local` (images live in `public/demo/`, content in
`src/sanity/lib/demo-data.ts`). Set it back to `false` once real Sanity content is connected.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.local` (except `SANITY_API_WRITE_TOKEN`, which is
   only needed locally for seeding) in the Vercel project settings.
4. Deploy. Vercel will run `next build` automatically.
5. Update `NEXT_PUBLIC_SITE_URL` to your production domain and redeploy so metadata, the
   sitemap, and Open Graph images resolve correctly.
6. Deploy the Studio separately with `npm run studio:deploy` (hosted free on `sanity.studio`),
   or host it wherever you like — it's a static build (`npm run studio:build`).

## Design notes

The visual language is "DIY NYC meets handwritten museum exhibition" — a warm, artist-run
gallery feel rather than a slick white-cube one.

- **Light mode only, by design.** There is no dark mode and no theme toggle — the warm paper
  background is the point. `dark:` utility variants on shadcn/ui primitives are scoped to a
  `.dark` ancestor class (`@custom-variant dark` in `globals.css`) that nothing in the app ever
  applies, so a visitor's OS dark-mode setting can't flip the palette either.
- Typography is deliberately kept to two real fonts plus one rare accent — an earlier version
  used a third, monospace typeface for the museum-object-label metadata treatment (`.text-label`)
  and got feedback that the site felt like it had too many fonts. That treatment now uses **Inter**
  itself (uppercase, letterspaced, medium weight) rather than a separate typeface. So: **Cormorant
  Garamond** for display headings, **Inter** for everything else (body copy, UI, and `.text-label`
  metadata/eyebrows/nav/filters), and **Caveat** (`.font-hand`) for sparing hand-annotated accents
  only — used in a handful of places (hero, footer, pinned-photo captions), never for body copy.
- Color is a warm ivory/cream paper palette (very low chroma) so artwork provides all the color,
  plus one deliberate accent — a muted oxblood ink (`--ink` / `text-ink`) — reserved for
  hand-drawn marks: stamps, underlines, marginalia. It's never used as a general UI color.
- A few recurring "pinboard" motifs tie the DIY concept together: a faint dot-grid paper texture
  on the page background, a strip of masking tape pinned across framed photos (`.tape-corner`),
  and opaque rubber-stamp badges for status labels (`.stamp` — used for Sold/Commissioned; kept
  fully opaque rather than blended, so it stays legible over photos of any tone).
- Animations (Framer Motion) are deliberately subtle: fade-ins on scroll, gentle hover zoom on
  artwork cards, soft page transitions. Nothing flashy.
- Radius, spacing, and imagery are tuned for large-format photography to read cleanly at every
  breakpoint.

## Accessibility & performance

- Semantic landmarks (`header`, `nav`, `main`, `footer`), labeled icon buttons, keyboard-
  navigable lightbox (arrow keys, escape).
- All content images require alt text in the schema.
- Static generation (`generateStaticParams`) for artwork and news detail pages; ISR everywhere
  else.
- `next/image` with AVIF/WebP, responsive `sizes`, and priority hints on above-the-fold images.
- Loading skeletons per route, a shared error boundary, and a custom 404 page.
