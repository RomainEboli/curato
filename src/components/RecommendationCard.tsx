import type { Recommendation } from "../types/recommendation";
import styles from "./RecommendationCard.module.css";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.theme}>{recommendation.theme}</span>
        <time className={styles.date}>{recommendation.publishedAt}</time>
      </div>

      <h2 className={styles.title}>{recommendation.title}</h2>

      <p className={styles.description}>{recommendation.description}</p>

      <footer className={styles.footer}>
        <p className={styles.creator}>
          Recommandé par {recommendation.creatorName}{" "}
          <span>{recommendation.creatorHandle}</span>
        </p>

        <a
          className={styles.link}
          href={recommendation.url}
          target="_blank"
          rel="noreferrer"
        >
          Voir la découverte
        </a>
      </footer>
    </article>
  );
}

export default RecommendationCard;
