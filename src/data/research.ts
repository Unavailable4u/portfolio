import type { ResearchItem } from "../types";

// Kept deliberately brief: the full details are shared on request while the manuscript is under review.
export const research: ResearchItem[] = [
  {
    id: "rola-net",
    title: "RoLA-Net: A Lightweight Complex-Domain Architecture for Robust Automatic Modulation Classification Under Channel Impairments",
    authors: ["Shaikh Md Abu Ahad", "A.K.M Arib Labib", "S.M. Shuaib Islam Sayad"],
    highlightAuthor: "S.M. Shuaib Islam Sayad",
    affiliation: "Department of Electronics and Telecommunication Engineering, RUET",
    status: "under-review",
    statusNote: "Manuscript currently under peer review.",
    summary:
      "A lightweight neural network that identifies the modulation scheme of a radio signal, built to run on small hardware and to hold up when channel conditions change.",
    stats: [
      { value: "23,971", label: "parameters" },
      { value: "61.07%", label: "mean accuracy, 5 seeds (±0.38)" },
      { value: "≈10×", label: "fewer parameters than CSPMNet at statistically equal accuracy" },
    ],
    links: [
      {
        kind: "mail",
        label: "Request the manuscript",
        url: "mailto:sayadssb@gmail.com?subject=RoLA-Net%20manuscript%20request",
      },
    ],
    keywords: ["Automatic modulation classification", "Lightweight deep learning", "Complex-valued networks", "Domain-shift robustness", "RadioML"],
  },
];
