export const themes = ["Illustration", "Design", "3D", "Photographie"] as const;

export type Theme = (typeof themes)[number];

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  url: string;
  theme: Theme;
  creatorName: string;
  creatorHandle: string;
  publishedAt: string;
};
