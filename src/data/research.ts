import type { ModelPoint, ResearchItem } from "../types";

// Source for every figure below: the RoLA-Net manuscript (Tables III, VII and VIII).
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
      "A 23,971-parameter neural network that identifies the modulation scheme of a radio signal, built to run on small hardware and to hold up when the channel differs from what it was trained on. It pairs learned complex-valued filters with joint I/Q whitening and a depthwise-separable residual backbone, and is tested across five training seeds, three fading types, carrier frequency offset and a second dataset.",
    contributions: [
      "A complex subband and phase-motion front-end whose ComplexBatchNorm whitens the in-phase and quadrature parts together, keeping the phase relationship that carrier frequency offset disturbs.",
      "An ablation that separates the effect of subband count, stem width, augmentation and normalisation on both clean accuracy and robustness.",
      "A multi-seed protocol that measures robustness to channel shift and to a change of dataset separately, with paired statistical tests.",
    ],
    stats: [
      { value: "23,971", label: "parameters" },
      { value: "61.07%", label: "mean accuracy, 5 seeds (±0.38)" },
      { value: "≈10×", label: "fewer parameters than CSPMNet at statistically equal accuracy" },
      { value: "0.31 pp", label: "zero-shot gap to RadioML2016.10B (single seed)" },
    ],
    honestFindings: [
      "MCLDNN is more robust under fading: 15.06 pp average accuracy drop against 17.27 pp for RoLA-Net (paired t-test p = 0.049, Wilcoxon p = 0.125 at n = 5).",
      "RoLA-Net's advantage is specific to carrier frequency offset, where it ranks second of six models, behind LWAMCNet.",
      "Several results, including the ablations and the cross-dataset test, are single-seed, and no evaluation was run on embedded or edge hardware.",
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

// Table III of the manuscript: mean ± std accuracy over 5 seeds on RadioML2016.10A.
export const modelPoints: ModelPoint[] = [
  { name: "ULCNN", paramsK: 9.29, accuracy: 58.4, std: 3.2 },
  { name: "LWAMCNet", paramsK: 21.55, accuracy: 60.98, std: 0.68 },
  { name: "RoLA-Net (ours)", paramsK: 23.97, accuracy: 61.07, std: 0.38, ours: true },
  { name: "SCNN", paramsK: 104.01, accuracy: 53.53, std: 1.29 },
  { name: "CSPMNet", paramsK: 240.97, accuracy: 61.94, std: 2.32 },
  { name: "MCLDNN", paramsK: 406.4, accuracy: 59.65, std: 2.22 },
];
