import type { Recommendation } from "../types/recommendation";
import { themes } from "../types/recommendation";

export { themes };

export const recommendations: Recommendation[] = [
  {
    id: "margaux-keller-objets",
    title: "Les objets narratifs de Margaux Keller",
    description:
      "Un univers d’objets et de mobilier où la couleur, la matière et la narration transforment le quotidien.",
    url: "https://www.margauxkellercollections.com/",
    theme: "Design",
    creatorName: "Margaux Keller",
    creatorHandle: "@margauxkeller",
    publishedAt: "Aujourd’hui",
  },
  {
    id: "laurie-grez-illustration",
    title: "Les silhouettes colorées de Laurie Grez",
    description:
      "Une illustration graphique, vive et généreuse, construite autour de personnages, de textures et de compositions expressives.",
    url: "https://www.lauriegrez.com/",
    theme: "Illustration",
    creatorName: "Laurie Grez",
    creatorHandle: "@lauriegrez",
    publishedAt: "Aujourd’hui",
  },
  {
    id: "manvs-machine-3d",
    title: "Les expériences visuelles de ManvsMachine",
    description:
      "Un studio qui associe animation, direction artistique et expérimentation 3D pour créer des images immédiatement reconnaissables.",
    url: "https://mvsm.com/",
    theme: "3D",
    creatorName: "ManvsMachine",
    creatorHandle: "@manvsmachine",
    publishedAt: "Hier",
  },
];
