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
