export interface CvStyle {
  id: string;
  label: string;
  description: string;
  file: string;
}

/** Generated at build time by `npm run cv` into public/cv/. */
export const cvStyles: CvStyle[] = [
  { id: "classic", label: "Classic", description: "Single column, ATS-friendly", file: "/cv/Sayad_CV_Classic.pdf" },
  { id: "modern", label: "Modern", description: "Two columns, matches this site", file: "/cv/Sayad_CV_Modern.pdf" },
  { id: "academic", label: "Academic", description: "Research and honors first", file: "/cv/Sayad_CV_Academic.pdf" },
];
