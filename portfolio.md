# Portfolio Codebase Audit

Generated on: 2026-04-24

This document is a full UI/codebase audit of the repository at `c:\Users\sreem\Desktop\portfolio-website`.

## 1) Tech Stack & Architecture

### Framework, runtime, and tooling

- Framework: Next.js `16.2.4` (`App Router` under `src/app`)
- React: `19.2.4`
- TypeScript: `5.9.3`
- Node package manager lockfile: `package-lock.json` (lockfile v3)
- Styling: Tailwind CSS v4 (`tailwindcss 4.2.4`) via `@import "tailwindcss"` in `src/app/globals.css`
- Tailwind PostCSS plugin: `@tailwindcss/postcss 4.2.4`
- Tailwind prose plugin installed: `@tailwindcss/typography 0.5.19`
- Class composition utilities: `clsx 2.1.1`, `tailwind-merge 3.5.0`
- Animation and motion:
- `gsap 3.15.0`
- `@gsap/react 2.1.2`
- `ScrollTrigger` (GSAP plugin)
- 3D and interactive graphics:
- `three 0.184.0`
- `@react-three/fiber 9.6.0`
- `@react-three/drei 10.7.7`
- Icon library: `react-icons 5.6.0` (`fa6`, `md` icon sets used)
- Theming library installed but not used in source: `next-themes 0.4.6`
- Linting: `eslint 9.39.4`, `eslint-config-next 16.2.4`

### Project structure overview

This project uses a `src` directory with App Router routes in `src/app` and reusable UI in `src/components`.

```text
portfolio-website/
  public/
    images/
      avatars/
      blog/
      fallback/
      projects/
    sounds/
    file.svg
    globe.svg
    next.svg
    noisetexture.jpg
    smallroom.hdr
    vercel.svg
    window.svg
  src/
    app/
      about/page.tsx
      blog/page.tsx
      blog/[uid]/page.tsx
      project/[uid]/page.tsx
      projects/page.tsx
      projects/[uid]/page.tsx
      favicon.ico
      globals.css
      layout.tsx
      not-found.tsx
      page.tsx
      sitemap.ts
    components/
      sections/
        Biography.tsx
        ContentIndex.tsx
        ContentList.tsx
        Experience.tsx
        Hero.tsx
        ImageSection.tsx
        Shapes.tsx
        TechList.tsx
        TextBlock.tsx
      Avatar.tsx
      Bounded.tsx
      Button.tsx
      ContentBody.tsx
      Footer.tsx
      Header.tsx
      Heading.tsx
      NavBar.tsx
      RichText.tsx
    hooks/usePrefersReducedMotion.tsx
    lib/utils.ts
    types/index.ts
    utils/formatDate.ts
  AGENTS.md
  README.md
  package.json
  package-lock.json
  next.config.ts
  postcss.config.mjs
  eslint.config.mjs
  tsconfig.json
```

### Routing approach

- Router style: App Router (`src/app`)
- Static routes:
- `/` (`src/app/page.tsx`)
- `/about` (`src/app/about/page.tsx`)
- `/blog` (`src/app/blog/page.tsx`)
- `/projects` (`src/app/projects/page.tsx`)
- Dynamic routes:
- `/blog/[uid]` (`src/app/blog/[uid]/page.tsx`)
- `/project/[uid]` (`src/app/project/[uid]/page.tsx`)
- `/projects/[uid]` (`src/app/projects/[uid]/page.tsx`) (duplicate implementation of `/project/[uid]`)
- Special App Router files:
- Root layout: `src/app/layout.tsx`
- Not found page: `src/app/not-found.tsx`
- Generated sitemap route: `src/app/sitemap.ts` (serves `/sitemap.xml`)

### Layout architecture

- `src/app/layout.tsx` wraps all routes with:
- `<Header />` at top
- `children` main page content
- two absolute-positioned background layers:
- `.background-gradient` radial gradient
- `noisetexture.jpg` overlay with `mix-blend-soft-light`
- `<Footer />` at bottom
- Root layout metadata is defined in the same file.

### Styling architecture

- Tailwind utility classes are used directly in JSX (`className`).
- No CSS Modules, no styled-components, no Sass, no local component CSS files.
- Global CSS file (`src/app/globals.css`) is minimal:
- imports Tailwind
- defines `.background-gradient`
- No Tailwind config file exists (`tailwind.config.*` absent), so default Tailwind v4 tokens are used.
- No CSS variables defined by this project.

### Animation / interaction architecture

- GSAP timeline entrance animations:
- Hero letter-by-letter intro
- Avatar fade/scale intro
- Scroll-triggered item reveals in content lists
- Scroll-triggered horizontal marquee motion in tech rows
- GSAP + user cursor interaction:
- Avatar tilt/highlight on mousemove
- Floating hover image card that follows cursor on content list
- React Three Fiber scene with clickable geometries:
- random material swap on click
- random rotational burst animation
- click sound playback (`/sounds/hit2.ogg`, `hit3.ogg`, `hit4.ogg`)
- CSS transitions handle nav/menu/button hover states and sliding overlays.

## 2) Page Inventory

### `/` (Home)

- File: `src/app/page.tsx`
- Purpose: personal hero/landing introduction.
- Rendered component tree:
- `Hero(firstName, lastName, tagLine)`
- `Hero` internal layout:
- Left/first visual: large animated two-line name + gradient job title
- Right/second visual: interactive 3D geometry scene (`Shapes`)
- Effective section flow:
- Hero name block -> job title -> 3D scene

### `/about`

- File: `src/app/about/page.tsx`
- Purpose: profile biography, skills, experience, education.
- Rendered section sequence:
- `Biography`
- `TechList`
- `Experience` (Projects and Practical Experience)
- `Experience` (Education)
- Effective layout flow:
- About header + bio text + avatar + LinkedIn CTA
- Pinned animated tech rows
- Professional experience timeline-like blocks
- Education blocks

### `/blog`

- File: `src/app/blog/page.tsx`
- Purpose: blog index/listing.
- Rendered section sequence:
- `ContentIndex` with heading, description, and `ContentList`
- `ContentList` item rows:
- blog title
- tags
- "Read More" CTA with arrow icon
- hover-follow image preview card
- Effective layout flow:
- Page heading -> short intro text -> animated list rows

### `/blog/[uid]`

- File: `src/app/blog/[uid]/page.tsx`
- Purpose: detailed blog post pages generated from local object map (`BLOG_POSTS`).
- `generateStaticParams` uids:
- `smart-india-hackathon-2024-journey`
- `building-ai-ds-club-college-website`
- `dynamicParams = false` (only predefined slugs allowed)
- Rendered layout:
- `ContentBody` wrapper with title/date/tags
- post-specific content assembled from:
- `ImageSection`
- `TextBlock` (RichText rendering)
- Effective flow:
- Title/tags/date -> cover/inline image -> rich text content

### `/projects`

- File: `src/app/projects/page.tsx`
- Purpose: projects index/listing.
- Rendered section sequence:
- `ContentIndex` with heading, description, and `ContentList`
- `ContentList` item rows:
- project title
- tags
- "View Project" CTA
- hover-follow image preview card
- Effective layout flow:
- Page heading -> short intro text -> animated project rows

### `/project/[uid]`

- File: `src/app/project/[uid]/page.tsx`
- Purpose: detailed project pages from local `PROJECTS` map.
- `generateStaticParams` uids:
- `ecommerce-web-application-forever`
- `true-feedback-mystery-message`
- `railway-complaint-management-system-railease`
- `youtube-backend`
- `dynamicParams = false`
- Rendered layout:
- `ContentBody` wrapper with title/date/tags
- `TextBlock` for rich text body content
- Effective flow:
- Title/tags/date -> narrative + highlights list

### `/projects/[uid]` (duplicate route branch)

- File: `src/app/projects/[uid]/page.tsx`
- Purpose: duplicates `/project/[uid]` implementation nearly 1:1.
- Current behavior:
- exists as reachable route pattern
- not used by `ContentList` for project links (project links point to `/project/...`)
- Risk: content and metadata drift if one file changes and the other does not.

### Not found boundary

- File: `src/app/not-found.tsx`
- Route behavior: rendered for unmatched routes and explicit `notFound()` calls.
- UI structure:
- giant `404`
- short message text
- "Head Home" button linking to `/`

### Sitemap route

- File: `src/app/sitemap.ts`
- Output path: `/sitemap.xml`
- Includes URLs for:
- root, about, blog, projects
- two blog posts
- four project detail routes (`/project/...`)
- Current root domain set to `https://demo.com` (placeholder domain).

## 3) Component Breakdown

All component files under `src/components` and `src/components/sections` are documented below.

### `src/components/Avatar.tsx`

- Component: `Avatar`
- Renders:
- profile image in rounded square frame with border
- optional moving glossy highlight overlay on md+
- Props:
- `image: ImageAsset` (`src`, `alt`, `width`, `height`)
- `className?: string`
- Interactions/animation:
- GSAP intro animation (`opacity 0 -> 1`, `scale 1.4 -> 1`)
- reacts to mousemove:
- slight rotation of `.avatar`
- highlight opacity and position shift
- honors reduced motion via `usePrefersReducedMotion`
- Key styles:
- `rounded-3xl`, `border-2 border-slate-700`, `overflow-hidden`
- highlight uses `bg-gradient-to-tr from-transparent via-white to-transparent`

### `src/components/Bounded.tsx`

- Component: `Bounded` (forwardRef)
- Renders:
- section/container wrapper with consistent responsive padding and max width
- Props:
- `as?: intrinsic element` (default `section`)
- `className?: string`
- `children`
- all other HTML attrs except overridden `className`/`children`
- Interactions/animation: none
- Key styles:
- outer: `px-4 py-10 md:px-6 md:py-14 lg:py-16`
- inner container: `mx-auto w-full max-w-7xl`

### `src/components/Button.tsx`

- Component: `Button`
- Renders:
- CTA button-like link with sliding yellow background layer and optional outward arrow icon
- Props:
- `link: LinkData` (`href`, `isExternal`, `target?`)
- `label: string`
- `showIcon?: boolean` (default `true`)
- `className?: string`
- Interactions/animation:
- scale-up on hover (`hover:scale-105`)
- overlay slides into view (`translate-y-9 -> 0`)
- switches between `<a>` and `<Link>` based on `isExternal`
- Key styles:
- `rounded-md border-2 border-slate-900 bg-slate-50 font-bold`
- overlay `bg-yellow-300`

### `src/components/ContentBody.tsx`

- Component: `ContentBody`
- Renders:
- standardized article shell for blog/project detail pages
- title, tags row, formatted date, rich text body area
- Props:
- `title: string`
- `date: string`
- `tags: readonly string[]`
- `children: ReactNode`
- Interactions/animation: none
- Key styles:
- card: `rounded-2xl border-2 border-slate-800 bg-slate-900`
- tags: `text-yellow-400`
- date divider: `border-b border-slate-600`
- body: `prose prose-lg prose-invert`

### `src/components/Footer.tsx`

- Component: `Footer`
- Renders:
- name/logo, inline nav links, social links (GitHub/LeetCode/LinkedIn), copyright
- Hardcoded constants:
- `NAME`
- `NAV_ITEMS`
- `SOCIAL_LINKS`
- Props: none
- Interactions/animation:
- nav link color hover transitions
- social icon scale + color transition on hover
- Key styles:
- dark text palette on site footer backdrop
- separators `/` between nav links
- Note: one class typo exists: `hover:hover:text-yellow-400`.

### `src/components/Header.tsx`

- Component: `Header`
- Renders:
- sticky header container with `NavBar`
- Props: none
- Interactions/animation: none directly
- Key styles:
- `md:sticky md:top-4`, `max-w-7xl`, `z-50`

### `src/components/Heading.tsx`

- Component: `Heading`
- Renders:
- semantic heading tag with centralized typography scale options
- Props:
- `as?: h1..h6` (default `h1`)
- `size?: xl|lg|md|sm` (default `lg`)
- `children`
- `className?`
- Interactions/animation: none
- Key styles:
- base: `font-bold leading-tight tracking-tight text-slate-300`
- size map:
- `xl`: `text-7xl md:text-9xl`
- `lg`: `text-6xl md:text-8xl`
- `md`: `text-5xl md:text-6xl`
- `sm`: `text-3xl md:text-4xl`

### `src/components/NavBar.tsx`

- Component: `NavBar` (`use client`)
- Renders:
- desktop horizontal nav + mobile full-screen slide-in menu
- includes logo, nav links, and Contact button CTA
- Props: none
- Interactions/animation:
- mobile menu toggle with `open` state
- slide-in panel via transform class toggle
- active link underline block based on `usePathname()`
- Key styles:
- shell: `rounded-b-lg` mobile, `md:rounded-xl` desktop
- active/hover background highlight uses `bg-yellow-300`
- mobile overlay: fixed fullscreen `bg-slate-50`

### `src/components/RichText.tsx`

- Component: `RichText`
- Renders:
- custom renderer for `RichTextBlock[]` (text blocks + image blocks)
- Supports:
- paragraph, headings, preformatted
- unordered/ordered list item grouping
- inline spans (`strong`, `em`, `hyperlink`)
- image blocks rendered through `next/image`
- Props:
- `field: RichTextBlock[]`
- Interactions/animation: none
- Key styles:
- inline links: yellow underlines (`decoration-yellow-400`)
- image blocks: `not-prose`, `rounded-md`, vertical margins

### `src/components/sections/Biography.tsx`

- Component: `Biography`
- Renders:
- section heading, rich text body, CTA button, profile avatar in responsive grid
- Props:
- `heading: string`
- `body: RichTextBlock[]`
- `avatar: ImageAsset`
- `buttonText: string`
- `buttonLink: LinkData`
- Interactions/animation:
- via child components (`Avatar`, `Button`)
- Key styles:
- grid layout `md:grid-cols-[2fr,1fr]`
- prose body `prose prose-xl prose-slate prose-invert`

### `src/components/sections/ContentIndex.tsx`

- Component: `ContentIndex`
- Renders:
- generic listing page shell used by blog and projects index
- heading, optional rich text intro, `ContentList`
- Props:
- `heading`
- `description: RichTextBlock[]`
- `items: ContentListItem[]`
- `contentType: "Blogs" | "Projects"`
- `viewMoreText`
- `fallbackItemImage: ImageAsset`
- Interactions/animation:
- mostly delegated to `ContentList`
- Key styles:
- intro text block uses `prose prose-xl prose-invert`

### `src/components/sections/ContentList.tsx`

- Component: `ContentList` (`use client`)
- Renders:
- animated list rows with title, tags, CTA text/icon
- floating image preview card that follows cursor on hover
- Props:
- `items: { id, uid, title, tags, image }[]`
- `contentType`
- `fallbackItemImage`
- `viewMoreText`
- Interactions/animation:
- GSAP+ScrollTrigger row reveal (`opacity/y`)
- window mousemove-driven hover preview position/rotation
- preloads all preview images in browser
- chooses URL prefix by type:
- blogs -> `/blog`
- projects -> `/project`
- Key styles:
- row separators (`border-t`, `border-b` slate)
- tags in yellow
- hover preview card `absolute`, `rounded-lg`, `bg-cover`

### `src/components/sections/Experience.tsx`

- Component: `Experience`
- Renders:
- heading + repeated entries (title, period/institution, rich text description)
- Props:
- `heading: string`
- `items: ExperienceItem[]`
- Interactions/animation: none
- Key styles:
- content width constrained (`max-w-prose`)
- metadata line style: `text-2xl font-semibold text-slate-400`

### `src/components/sections/Hero.tsx`

- Component: `Hero` (`use client`)
- Renders:
- large two-line animated name block + gradient job title + 3D `Shapes`
- Props:
- `firstName`
- `lastName`
- `tagLine`
- Interactions/animation:
- GSAP timeline:
- per-letter intro with elastic easing
- job-title reveal with scale/y/opacity transition
- Key styles:
- huge responsive text clamp
- first name `text-slate-300`
- last name `text-slate-500`
- job title gradient fill from yellow shades

### `src/components/sections/ImageSection.tsx`

- Component: `ImageSection`
- Renders:
- full-width article image (`next/image`)
- Props:
- `image: ImageAsset`
- Interactions/animation: none
- Key styles:
- `not-prose`, rounded corners, responsive vertical spacing

### `src/components/sections/Shapes.tsx`

- Component: `Shapes` (`use client`)
- Renders:
- React Three Fiber `<Canvas>` scene with floating geometry meshes and contact shadows
- Internal subcomponents:
- `Geometries`
- `Geometry`
- Data/config:
- geometry definitions for frontend panel, backend node, database, API hub, infra node
- material palette (8 MeshStandardMaterial variants)
- sound effects array (`hit2`, `hit3`, `hit4`)
- Interactions/animation:
- click mesh -> play random sound + rotation burst + random material swap
- pointer over/out -> cursor pointer/default
- entrance scale animation per geometry via GSAP
- continuous float and rotation via `<Float>`
- Key styles:
- wrapper placed in hero grid as square visual block

### `src/components/sections/TechList.tsx`

- Component: `TechList` (`use client`)
- Renders:
- title + repeated horizontal marquee rows for each tech item
- each row contains 15 repeated labels separated by circle icons
- Props:
- `title: string`
- `items: { techName, techColor }[]`
- Interactions/animation:
- ScrollTrigger timeline with pinning and scrubbed horizontal movement
- row direction alternates by index
- Key styles:
- giant uppercase text (`text-8xl`, `font-extrabold`, `tracking-tighter`)
- center repetition item uses inline color (`techColor`)

### `src/components/sections/TextBlock.tsx`

- Component: `TextBlock`
- Renders:
- simple wrapper around `RichText` in `max-w-prose` container
- Props:
- `text: RichTextBlock[]`
- Interactions/animation: none
- Key styles:
- `max-w-prose`

## 4) Current Color & Typography System

### Color sources in codebase

There are four active color sources:

- Tailwind utility classes (default palette): `slate-*`, `yellow-*`, plus `white`/`transparent`
- Explicit hex in TSX data (`techColor` values)
- Explicit numeric hex in Three.js materials (`0x...`)
- Explicit CSS `hsla(...)` radial gradient in `globals.css`

No custom CSS variables or custom Tailwind theme config are defined.

### Tailwind class colors actively used

- `bg-slate-50`
- `bg-slate-900`
- `bg-yellow-300`
- `text-slate-100`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-slate-600`, `text-slate-700`, `text-slate-800`, `text-slate-900`
- `text-yellow-400`
- `border-slate-600`, `border-slate-700`, `border-slate-800`, `border-slate-900`
- `from-yellow-500`, `via-yellow-200`, `to-yellow-500`
- `decoration-yellow-400`

Tailwind v4 default palette values returned from `tailwindcss/colors`:

- `slate-50`: `oklch(98.4% 0.003 247.858)`
- `slate-100`: `oklch(96.8% 0.007 247.896)`
- `slate-200`: `oklch(92.9% 0.013 255.508)`
- `slate-300`: `oklch(86.9% 0.022 252.894)`
- `slate-400`: `oklch(70.4% 0.04 256.788)`
- `slate-500`: `oklch(55.4% 0.046 257.417)`
- `slate-600`: `oklch(44.6% 0.043 257.281)`
- `slate-700`: `oklch(37.2% 0.044 257.287)`
- `slate-800`: `oklch(27.9% 0.041 260.031)`
- `slate-900`: `oklch(20.8% 0.042 265.755)`
- `yellow-200`: `oklch(94.5% 0.129 101.54)`
- `yellow-300`: `oklch(90.5% 0.182 98.111)`
- `yellow-400`: `oklch(85.2% 0.199 91.936)`
- `yellow-500`: `oklch(79.5% 0.184 86.047)`
- white: `#fff`
- black: `#000`

### Explicit hardcoded color values

In app content data (`src/app/about/page.tsx`):

- `#10b981` (MERN Stack)
- `#ffffff` (Next.js)
- `#29D8FF` (React.js)
- `#84cc16` (Node.js)
- `#22c55e` (MongoDB)
- `#60a5fa` (TypeScript)

In Three.js material palette (`src/components/sections/Shapes.tsx`):

- `0x60a5fa`
- `0x22c55e`
- `0xf59e0b`
- `0x06b6d4`
- `0x64748b`
- `0x14b8a6`
- `0x0ea5e9`
- `0x111827`

Global CSS gradient (`src/app/globals.css`):

- `hsla(222, 80%, 60%, 0.5)`
- `hsla(222, 0%, 0%, 0)`

Public SVG embedded fills:

- `#666` (file/globe/window SVG icons)
- `#000` (next/vercel SVG fills)
- `#fff` (clipPath path fill in `globe.svg`)

### Typography system

- Font family:
- `Urbanist` from `next/font/google` in `src/app/layout.tsx`
- global body class receives `urbanist.className`
- Font weights used via Tailwind classes:
- `font-thin`, `font-extralight`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black`
- Font size classes used:
- `text-sm`, `text-base`
- `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`, `text-9xl`
- `text-[30vmin]`
- `text-[clamp(3rem,20vmin,20rem)]`
- Tracking/leading patterns:
- `tracking-tight`, `tracking-tighter`, `tracking-[.2em]`
- `leading-none`, `leading-tight`, `leading-[0]`
- Prose typography plugin classes used:
- `prose`, `prose-lg`, `prose-xl`, `prose-invert`, `prose-slate`

### Gradients, shadows, and effects

- `Hero` job title gradient text: `bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500`
- `Avatar` highlight sweep gradient: `from-transparent via-white to-transparent`
- Global radial background gradient: `.background-gradient`
- Texture overlay: `bg-[url('/noisetexture.jpg')]` + `mix-blend-soft-light`
- 3D shadows: Drei `ContactShadows` in `Shapes`
- Hover/transition effects:
- scale and color hover on nav/footer/buttons
- transform-based menu panel slide
- content hover reveal image card

## 5) Content & Data Map

### Where personal content currently lives

The portfolio content is hardcoded in route files and component constants.

#### Identity and profile

- Name on homepage hero:
- `src/app/page.tsx` (`firstName="Mysore"`, `lastName="Sridhar"`)
- Site metadata title/description:
- `src/app/layout.tsx`
- Nav/Footer display name:
- `src/components/NavBar.tsx`
- `src/components/Footer.tsx`

#### Contact and links

- About page biography text (includes phone and email):
- `src/app/about/page.tsx` (`biographyBody`)
- LinkedIn CTA URL:
- `src/app/about/page.tsx`
- Footer social URLs:
- `src/components/Footer.tsx`
- GitHub: `https://github.com/sapphire2207`
- LeetCode stored in `twitter` key: `https://leetcode.com/sapphire2207`
- LinkedIn: `https://www.linkedin.com/in/mysore-sridhar`

#### Skills, experience, and education

- Skills list and colors:
- `src/app/about/page.tsx` (`TechList items`)
- Experience entries:
- `src/app/about/page.tsx` (`Experience` items array for projects/practical)
- Education entries and GPA:
- `src/app/about/page.tsx` (second `Experience` instance)

#### Blog index and blog post data

- Blog list page cards (title/tags/cover image/uid):
- `src/app/blog/page.tsx`
- Blog post bodies, dates, metadata, inline images:
- `src/app/blog/[uid]/page.tsx` (`BLOG_POSTS`, `hackathonIntro`, `collegeWebsiteBody`)

#### Project index and project detail data

- Project list page cards:
- `src/app/projects/page.tsx`
- Project detail bodies, dates, metadata:
- `src/app/project/[uid]/page.tsx`
- Duplicate copy also exists in:
- `src/app/projects/[uid]/page.tsx`

#### Global navigation text

- Header nav item labels and hrefs:
- `src/components/NavBar.tsx`
- Footer nav item labels and hrefs:
- `src/components/Footer.tsx`

#### Sitemap data

- Domain and URL list:
- `src/app/sitemap.ts`
- Current domain is placeholder `https://demo.com`.

### High-value files to update for content refresh

- `src/app/layout.tsx` (SEO title/description)
- `src/app/page.tsx` (hero name/tagline)
- `src/app/about/page.tsx` (bio/contact/skills/experience/education/avatar)
- `src/app/blog/page.tsx` (blog index cards)
- `src/app/blog/[uid]/page.tsx` (blog full post content and metadata)
- `src/app/projects/page.tsx` (project index cards)
- `src/app/project/[uid]/page.tsx` (project full content and metadata)
- `src/components/NavBar.tsx` (top nav labels/CTA target)
- `src/components/Footer.tsx` (social URLs/footer nav name)
- `src/app/sitemap.ts` (production domain + route list)

## 6) Current UI Weaknesses

### Structural and routing issues

- Duplicate project detail route implementations:
- `src/app/project/[uid]/page.tsx`
- `src/app/projects/[uid]/page.tsx`
- They duplicate the same content logic, increasing maintenance risk.
- Inconsistent route naming:
- list page is `/projects`
- detail links point to `/project/[uid]`
- a second `/projects/[uid]` route exists but is not used by list links
- This can confuse users and future maintainers.

### Content quality / polish issues

- `src/app/not-found.tsx` contains grammar issue: `Whoops, we couldn't that page.`
- `src/components/Footer.tsx` stores LeetCode URL under `twitter` key (naming mismatch).
- `src/app/sitemap.ts` uses placeholder domain `https://demo.com`.
- Several references still look template-derived (`README.md`, unused starter SVGs).

### Visual consistency issues

- Color system mixes many sources without a single token system:
- Tailwind slate/yellow classes
- ad-hoc hex values in about skills
- separate Three.js material palette
- No centralized design tokens or CSS variables.
- Spacing and typography are mostly utility-driven, but no formal scale document exists.
- Some sections rely on very large display text (`text-9xl`, clamp hero, `text-8xl` marquee) while body areas remain conservative, causing stylistic jumps between sections.

### Accessibility and UX concerns

- External links rendered as `<a target="_blank">` via `Button` do not add `rel="noopener noreferrer"`.
- Heavy motion sections (`Hero`, `TechList`, `ContentList`, `Shapes`) may feel intense; only `Avatar` currently respects reduced-motion preference.
- Mobile nav opens full-screen with custom controls, but no Escape key handling/focus trap logic is implemented.

### Asset hygiene issues

- Unused assets present:
- `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- `public/sounds/hit1.ogg`, `hit6.ogg`, `hit7.ogg`, `hit8.ogg`
- `public/smallroom.hdr`
- Unused files make the project look partially scaffold/template-derived.

## 7) Asset Inventory

### Images in `public/images`

- `public/images/avatars/andy-profile.png` (743x743)
- Used on `/about` avatar (`Biography` -> `Avatar`)
- Represents profile headshot

- `public/images/blog/mastering-js-cover.jpg` (5817x3870)
- Used on `/blog` index card for RailEase post
- Represents blog cover image

- `public/images/blog/innovative-css-cover.jpg` (3213x4819)
- Used on `/blog` index card for AI/DS website post
- Represents blog cover image

- `public/images/blog/mastering-js-image-1.jpg` (4608x3072)
- Used inside `/blog/smart-india-hackathon-2024-journey`
- Represents hackathon collaboration visual

- `public/images/blog/mastering-js-image-2.jpg` (6048x4024)
- Used inside `/blog/building-ai-ds-club-college-website`
- Represents college website project visual

- `public/images/projects/nextjs-todo-cover.jpg` (5304x7952)
- Used on `/projects` index first card
- Represents e-commerce project cover

- `public/images/projects/nextjs-todo-inline-1.jpg` (6000x4000)
- Used on `/projects` index second card
- Represents anonymous feedback project cover

- `public/images/fallback/blog-fallback.jpg` (6000x4000)
- Used as fallback image in blog listing
- Also used as explicit image for one project card

- `public/images/fallback/projects-fallback.jpg` (4000x5000)
- Used as fallback image in projects listing
- Also used directly for RailEase project card

### Other visual assets in `public`

- `public/noisetexture.jpg` (100x100)
- Used globally as overlay texture in root layout background

- `public/smallroom.hdr`
- Not referenced in source
- Likely intended for environment map experiments

- `public/file.svg`
- Not referenced in source
- Generic file icon (template asset)

- `public/globe.svg`
- Not referenced in source
- Generic globe icon (template asset)

- `public/next.svg`
- Not referenced in source
- Next.js logo asset (template)

- `public/vercel.svg`
- Not referenced in source
- Vercel logo asset (template)

- `public/window.svg`
- Not referenced in source
- Generic window icon (template)

### Audio assets in `public/sounds`

- Used:
- `public/sounds/hit2.ogg`
- `public/sounds/hit3.ogg`
- `public/sounds/hit4.ogg`
- These are click SFX for 3D mesh interaction in `Shapes`

- Present but unused:
- `public/sounds/hit1.ogg`
- `public/sounds/hit6.ogg`
- `public/sounds/hit7.ogg`
- `public/sounds/hit8.ogg`

### Metadata/icon asset

- `src/app/favicon.ico`
- App favicon used by Next metadata file convention

## Additional Notes

- This codebase is currently content-driven through hardcoded TSX objects rather than external CMS/data files.
- The UI is animation-forward and visually energetic, with a dark slate/yellow brand direction.
- For a full revamp, the highest leverage first move is centralizing content/data and design tokens, then normalizing route structure (`/project` vs `/projects`).
