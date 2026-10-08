import type { ProjectItem } from "../types";

// To add media to a project, drop files under public/projects/<id>/ and fill in `media`:
//   media: { thumbnail: "/projects/minime/thumb.webp", hoverImage: "/projects/minime/alt.webp",
//            screenshots: ["/projects/minime/1.webp"], video: "https://youtu.be/XXXX" }
// Cards without media render as clean text cards.

export const projects: ProjectItem[] = [
  {
    id: "minime",
    title: "MiniMe",
    summary:
      "A multi-agent AI workspace that takes a student project from idea to launch across six stages, with shared memory and one chat in every stage.",
    stack: "Python, FastAPI, Next.js / React, PostgreSQL (Supabase), Redis & Vector DB (Upstash)",
    featured: true,
    status: "active",
    stats: [
      { value: "70+", label: "agent modules" },
      { value: "549", label: "commits" },
      { value: "4,400+", label: "tests" },
      { value: "174", label: "API routes" },
    ],
    bullets: [
      "Backend of 70+ specialist agent modules on FastAPI, driven by a tiered execution orchestrator that classifies each task by complexity before dispatching it.",
      "Six stages in one product (Notebooks, Research, Plan, Build, Test and Growth) with a three-tier memory model and a semantic knowledge graph that detects backlinks and clusters node embeddings.",
      "Software-generation pipeline that mimics a team: planning, parallel code generation, dependency mapping, multi-reviewer consolidation, automated fixing and sandboxed test runs.",
      "Next.js frontend with a code editor, live preview and terminal, plus a local daemon that runs commands only inside a folder the user approves.",
      "Multi-provider LLM fallback (Groq, Cerebras, GitHub Models, Cloudflare Workers AI) with retries, usage logging and quota-aware scheduling.",
    ],
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "LLM agents"],
    links: [
      { kind: "github", label: "GitHub", url: "https://github.com/Unavailable4u/MiniMe" },
      {
        kind: "mail",
        label: "Request demo access",
        url: "mailto:sayadssb@gmail.com?subject=MiniMe%20demo%20access",
      },
    ],
    media: {
      thumbnail: "/projects/minime/logo.svg",
      thumbnailFit: "contain",
      screenshots: [
        "/projects/minime/landing.webp",
        "/projects/minime/login.webp",
        "/projects/minime/chat.webp",
        "/projects/minime/research.webp",
        "/projects/minime/plan.webp",
      ],
    },
  },
  {
    id: "fbebc",
    title: "FBEBC: Governing LLM-Driven Code Evolution",
    summary:
      "Research on structurally separating an untrusted LLM proposer from a trusted evaluator, so a self-modifying code agent cannot tamper with its own score.",
    stack: "Python, Docker, SQLite, Groq API",
    category: "research",
    status: "research",
    stats: [
      { value: "6", label: "admission gates" },
      { value: "194", label: "tests" },
      { value: "k = 3", label: "elite band" },
    ],
    bullets: [
      "Six-gate admission pipeline: byte-identical immutable regions, bounded SEARCH/REPLACE edits, contract checks, an AST capability filter and a frozen edit-distance metric.",
      "Docker sandbox verified on real hardware for network isolation, a read-only root filesystem, PID and memory limits, and a host-side defence against score smuggling.",
      "Hash-chained provenance ledger and a pre-registered experiment that compares single-winner hill-climbing with an elite band on circle packing.",
      "Preprint in draft, with every deviation from the original design disclosed in the repo.",
    ],
    tags: ["Python", "Docker", "LLM", "AI safety", "Research"],
    links: [{ kind: "github", label: "GitHub", url: "https://github.com/Unavailable4u/fbebc-research" }],
  },
  {
    id: "medsophia",
    title: "MedSophia Maa42 & MaterniBot",
    summary:
      "AI-assisted maternal care and 42-day postpartum recovery, from a care-circle app to an ESP32 voice-and-vision companion device.",
    stack: "React 19, Firebase, Express, Groq · FastAPI, OpenAI, ESP32",
    featured: true,
    status: "in-progress",
    note: "Team project with co-founder Shaikh Md Abu Ahad. The source is hosted on his GitHub account.",
    bullets: [
      "App covers pregnancy-week tracking, a kick counter, mood and breathing tools, SOS, and a care circle with partner sync and clinical oversight.",
      "Stage-aware AI assistant that adapts its guidance to the user's pregnancy week or postpartum day, with safe fallback replies when the model is unavailable.",
      "MaterniBot backend: FastAPI services for speech-to-text and text-to-speech, camera-based scanning, sensor ingestion, scheduled reminders and a safety layer, built to be tested before the ESP32 hardware arrives.",
      "As Lead Hardware Engineer I work on the device side and contribute to the app and backend.",
    ],
    tags: ["React", "Firebase", "FastAPI", "ESP32", "Healthcare AI"],
    links: [
      { kind: "github", label: "App", url: "https://github.com/shaikh-dotcom/Maa42" },
      { kind: "github", label: "MaterniBot backend", url: "https://github.com/shaikh-dotcom/maternibot" },
    ],
    media: {
      video: "/projects/medsophia/demo.mp4",
    },
  },
  {
    id: "focusos",
    title: "FocusOS",
    summary: "A cross-platform desktop productivity suite with focus sessions, tasks, budgeting and analytics.",
    stack: "Python, Flet (Flutter-based desktop UI)",
    featured: true,
    status: "completed",
    bullets: [
      "Combines a Pomodoro timer, an Eisenhower-matrix task manager, an expense and budget tracker, a daily journal and a live analytics dashboard.",
      "Task-linked focus sessions, streak-based gamification with achievement badges, and chart-based analytics (hourly bars, radial clocks, heatmaps) from local data.",
      "Glass-morphism theming with custom wallpapers and per-category colours, plus full backup, restore and CSV export.",
    ],
    tags: ["Python", "Flet", "Desktop App"],
    links: [{ kind: "github", label: "GitHub", url: "https://github.com/Unavailable4u/FocusOS" }],
    media: {
      thumbnail: "/projects/focusos/dashboard.webp",
      hoverImage: "/projects/focusos/expenses.webp",
      screenshots: [
        "/projects/focusos/dashboard.webp",
        "/projects/focusos/pomodoro.webp",
        "/projects/focusos/tasks.webp",
        "/projects/focusos/expenses.webp",
        "/projects/focusos/journal.webp",
      ],
    },
  },
  {
    id: "spherex-blink",
    title: "SPHEREx Blink",
    summary: "A blink comparator for NASA SPHEREx images, with a data pipeline for pulling cutouts of a target region.",
    stack: "Python, astropy, astroquery, JavaScript",
    status: "in-progress",
    bullets: [
      "Queries NASA/IPAC IRSA for SPHEREx observations around a sky position, groups them into epochs and bandpasses, and downloads FITS cutouts.",
      "Browser viewer for blinking between epochs is under construction.",
    ],
    tags: ["Python", "astropy", "Astronomy"],
    links: [{ kind: "github", label: "GitHub", url: "https://github.com/Unavailable4u/spherex-blink" }],
  },
  {
    id: "credit-scoring",
    title: "Credit Scoring Model",
    summary: "Predicts loan default risk by comparing three classifiers.",
    stack: "Python, scikit-learn, Jupyter Notebook",
    status: "completed",
    bullets: [
      "Trained and compared Logistic Regression, Decision Tree and Random Forest classifiers as CodeAlpha ML Internship Task 1.",
    ],
    tags: ["Python", "scikit-learn", "ML"],
    links: [{ kind: "github", label: "GitHub", url: "https://github.com/Unavailable4u/CodeAlpha_CreditScoringModel" }],
    media: {
      thumbnail: "/projects/credit-scoring/roc.webp",
      screenshots: [
        "/projects/credit-scoring/correlation.webp",
        "/projects/credit-scoring/smote-conclusion.webp",
        "/projects/credit-scoring/feature-importance.webp",
        "/projects/credit-scoring/roc.webp",
      ],
      video: "/projects/credit-scoring/demo.mp4",
    },
  },
  {
    id: "handwriting",
    title: "Handwritten Character Recognition",
    summary: "A deep learning image classification pipeline for handwritten characters.",
    stack: "Python, Deep Learning, Jupyter Notebook",
    status: "completed",
    bullets: ["Built an image classification pipeline for handwritten characters as part of the CodeAlpha ML Internship."],
    tags: ["Python", "Deep Learning"],
    links: [
      {
        kind: "github",
        label: "GitHub",
        url: "https://github.com/Unavailable4u/CodeAlpha_HandwrittenCharacterRecognition",
      },
    ],
    media: {
      thumbnail: "/projects/handwriting/predictions.webp",
      screenshots: [
        "/projects/handwriting/dataset.webp",
        "/projects/handwriting/training-curves.webp",
        "/projects/handwriting/predictions.webp",
        "/projects/handwriting/confidence.webp",
      ],
      video: "/projects/handwriting/demo.mp4",
    },
  },
  {
    id: "discord-uploader",
    title: "Discord Auto-Uploader",
    summary: "Batch-uploads whole folders of images and videos past Discord's 10-file limit.",
    stack: "Python",
    status: "completed",
    bullets: ["Automation tool that sends entire folders of images and videos in sequence to get around the 10-file upload limit."],
    tags: ["Python", "Automation"],
    links: [{ kind: "github", label: "GitHub", url: "https://github.com/Unavailable4u/discord-auto-uploader" }],
    media: {
      thumbnail: "/projects/discord-uploader/uploader-running.webp",
      screenshots: ["/projects/discord-uploader/uploader-running.webp"],
    },
  },
];
