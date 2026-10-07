import type { ExperienceItem } from "../types";

// Current roles first, then past roles, each newest first.
export const experience: ExperienceItem[] = [
  {
    role: "Co-Founder & Chief Technology Officer",
    org: "Next Inc.",
    orgUrl: "https://wearenext.tech",
    location: "Rajshahi, Bangladesh · Pennsylvania, USA",
    dateRange: "Present",
    current: true,
    bullets: [
      "Co-founded an innovation lab and full-stack technology partner offering web and app development, enterprise SaaS, and AI/LLM solutions, with hubs in Rajshahi and Pennsylvania, USA.",
      "Oversee day-to-day operations and coordinate the three-person founding team across the company website and its flagship AI product, MiniMe.",
    ],
  },
  {
    role: "Co-Founder & Lead Hardware Engineer",
    org: "MedSophia Maa42",
    location: "Rajshahi, Bangladesh",
    dateRange: "April 2026 – Present",
    current: true,
    bullets: [
      "Building an AI-assisted maternal health platform for pregnancy and postpartum care that helps mothers track symptoms, recognise danger signs and know when to seek human medical support.",
      "Focus is safer care continuity beyond hospital visits, not diagnosis.",
      "Work on the ESP32-based MaterniBot device side and contribute to the app and its FastAPI backend.",
    ],
  },
  {
    role: "Social Media Marketing Intern & Campus Ambassador",
    org: "International MUN",
    location: "Noida, India (Remote)",
    dateRange: "February 2026 – Present",
    current: true,
    bullets: [
      "Drive global awareness of IMUN conferences and build a community of young leaders around diplomacy and the UN's Sustainable Development Goals.",
      "Represent IMUN as Campus Ambassador, teaching students the value of diplomacy and negotiation.",
      "Design and run social media campaigns promoting international conferences to universities and institutions worldwide.",
      "Use referral-based marketing and collaborate with mentors and delegates across a worldwide network.",
    ],
  },
  {
    role: "Co-Founder & Chief Operating Officer",
    org: "Silicon-Dioxide",
    location: "Remote",
    dateRange: "April 2025 – Present",
    current: true,
    bullets: [
      "Co-founded an early-stage app development team building SecureWave, a women's safety app with real-time SOS alerts, live location sharing, AI-driven threat detection and community support.",
      "Direct operations and technical direction across Flutter, React Native, AI/ML and cloud technologies.",
      "Lead outreach for partnerships, investors and beta testers, and set strategy for turning ideas into deployable apps and web platforms.",
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "CodeAlpha",
    location: "Remote",
    dateRange: "June – July 2026",
    bullets: [
      "Built and evaluated supervised models (Logistic Regression, Decision Tree, Random Forest) for a credit-scoring system that predicts loan default risk.",
      "Developed a handwritten character recognition pipeline, applying deep learning to image classification.",
      "Completed the virtual internship with a certificate of completion.",
    ],
  },
  {
    role: "Fundraising Intern, Project SEVA",
    org: "Pledge A Smile Foundation",
    location: "Delhi, India (Remote)",
    dateRange: "November – December 2025",
    bullets: [
      "Appointed as a November Intern under the foundation's flagship initiative, Project SEVA, with fundraising as the primary responsibility.",
      "Worked remotely and reported progress to a reporting manager through regular daily and weekly updates.",
    ],
  },
];
