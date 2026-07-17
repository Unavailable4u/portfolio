import type { ProjectItem } from "../types";

export const projects: ProjectItem[] = [
  {
    title: "MiniMe — Full-Stack Multi-Agent AI System",
    stack: "Python, FastAPI, Next.js/React, PostgreSQL (Supabase), Redis & Vector DB (Upstash)",
    featured: true,
    bullets: [
      "Architected a tiered task-routing \"Execution Orchestrator\" that classifies incoming tasks by complexity and dispatches them to a roster of 40+ specialized agents across six domains: Notes, Research, Plan, Build, Growth, and Admin.",
      "Designed a three-tier memory model (conversation, section, and workspace-level) and a semantic knowledge graph with automatic backlink detection and unsupervised clustering (KMeans) over node embeddings.",
      "Built an automated software-generation pipeline (Build domain) simulating a software team: idea planning, parallel code generation, dependency mapping, multi-reviewer consolidation, automated fixing, and sandboxed test execution.",
      "Implemented a multi-provider LLM fallback layer (Groq, Cerebras, GitHub Models, Cloudflare Workers AI) with automatic retries, usage logging, and quota-aware worker-pool scheduling.",
      "Developed the Next.js/React frontend, including a real-time agent-progress \"Working Panel,\" knowledge-graph visualization, and Google Calendar OAuth integration.",
    ],
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Vector DB"],
  },
  {
    title: "FocusOS — Desktop Productivity Suite",
    stack: "Python, Flet (Flutter-based desktop UI)",
    featured: true,
    bullets: [
      "Built a cross-platform desktop application combining a Pomodoro focus timer, an Eisenhower-matrix task manager, an expense/budget tracker, a daily journal, and a live analytics dashboard.",
      "Implemented task-linked focus sessions, streak-based gamification with an achievement badge system, and chart-based analytics (hourly bar charts, radial clocks, heatmaps) rendered from locally stored usage data.",
      "Designed a glass-morphism theming system with customizable wallpapers, per-category color overrides, and full backup/restore and CSV export functionality.",
    ],
    tags: ["Python", "Flet", "Desktop App"],
  },
  {
    title: "Credit Scoring Model",
    stack: "Python, scikit-learn, Jupyter Notebook",
    bullets: [
      "Trained and compared Logistic Regression, Decision Tree, and Random Forest classifiers to predict loan default risk, as part of the CodeAlpha Machine Learning Internship.",
    ],
    tags: ["Python", "scikit-learn", "ML"],
  },
  {
    title: "Handwritten Character Recognition",
    stack: "Python, Deep Learning, Jupyter Notebook",
    bullets: [
      "Built an image classification pipeline for recognizing handwritten characters using deep learning techniques, as part of the CodeAlpha Machine Learning Internship.",
    ],
    tags: ["Python", "Deep Learning"],
  },
  {
    title: "Discord Auto-Uploader",
    stack: "Python",
    bullets: [
      "Developed an automation tool that bypasses Discord's 10-file upload limit by batch-uploading entire folders of images and videos in sequence.",
    ],
    tags: ["Python", "Automation"],
  },
];