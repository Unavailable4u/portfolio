# Portfolio

Personal portfolio of **S. M. Shuaib Islam Sayad**. Live at <https://shuaib-sayad.vercel.app>.

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and Framer Motion. Deployed on Vercel from `main`.

## Features

- Projects with media cards (hover image, demo video, screenshot gallery) and a detail modal
- Research section with an interactive chart and the paper's negative results included
- Certificates grid with a lightbox, verification links and a competitions tab
- Skills grouped by depth, a milestone timeline and a live GitHub contribution graph
- Command palette (`Ctrl/⌘ + K`), scroll progress bar, active-section nav and section-aware tab titles
- **Auto-generated CVs.** Three PDF styles (Classic, Modern, Academic) are built from the same data files as the site, so they can never drift apart
- **Multiple portfolio styles.** One icon in the header switches between complete layouts (Midnight and Ivory so far) that all read the same data. The choice is remembered and can be shared as `?style=ivory`
- Custom 404, Open Graph preview image, sitemap and structured data
- Self-hosted fonts and Vercel Analytics

## Develop

```bash
npm install
npm run dev      # also regenerates the CV PDFs
npm run build    # type-checks, regenerates the CVs, builds to dist/
npm run lint
```

## Update the content

Everything on the site and in the CVs comes from `src/data/`:

| File | Controls |
|---|---|
| `profile.ts` | Name, headline, summary, links, availability, "now" note |
| `experience.ts` | Roles (set `current: true` for ongoing ones) |
| `projects.ts` | Projects, links and media |
| `research.ts` | Papers and the chart's data |
| `skills.ts` | Core / Working knowledge / Familiar with |
| `certifications.ts` | Certificates, images and verification links |
| `honors.ts`, `education.ts`, `milestones.ts`, `now.ts` | The rest |

### Add a portfolio style

Every style lives in `src/layouts/` and reads the same files in `src/data/`, so content changes show up everywhere.

1. Create `src/layouts/<name>/<Name>Layout.tsx` with a default-exported component, and put `<LayoutSwitcher className="..." />` (from `src/layouts/LayoutSwitcher`) in its header so visitors can move on to the next style.
2. Add one entry to `src/layouts/registry.ts` (`id`, `name`, `themeColor`, `colorScheme`, and `Component: lazy(() => import("./<name>/<Name>Layout"))`). The icon cycles through the list in order.
3. If the style has a different page colour, add a `html[data-layout="<id>"]` background rule next to the Ivory one in `src/index.css` so the first paint matches.

Scope the style's CSS under its own root class (Ivory uses `.ivory`) so it cannot leak into the others. Ivory's few design-specific blurbs and photo paths are in `src/layouts/ivory/content.ts`; its photos and placeholder illustrations are in `public/ivory/`.

### Add project media

1. Put files in `public/projects/<project-id>/` (WebP images, MP4 or a YouTube link).
2. Fill in `media` on the project in `projects.ts`:

   ```ts
   media: {
     thumbnail: "/projects/minime/thumb.webp",
     hoverImage: "/projects/minime/alt.webp",
     screenshots: ["/projects/minime/1.webp", "/projects/minime/2.webp"],
     video: "https://youtu.be/XXXXXXXXXXX",
   },
   ```

Projects without `media` render as clean text cards. Links that are not set are simply not shown.

### Add a certificate

Add the image as `public/certs/<id>.jpg` and a thumbnail as `public/certs/thumb/<id>.jpg`, then add an entry to `certifications.ts`. Entries without images appear in the plain "Also completed" list.

### CVs

`scripts/generate-cv.ts` writes `public/cv/*.pdf` before every `dev` and `build`. The PDFs are generated, so they are git-ignored. The phone number appears in the CVs only and never on the website.

## Notes

- Analytics: enable **Analytics** for the project in the Vercel dashboard to see data.
- The contribution graph calls a public GitHub contributions API from the browser and degrades to a link if it is unavailable.
