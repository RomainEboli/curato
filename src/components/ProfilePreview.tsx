import styles from "./ProfilePreview.module.css";

type ProfilePreviewProps = {
  firstName: string;
  city: string;
};

export function ProfilePreview({ firstName, city }: ProfilePreviewProps) {
  return (
    <section
      className={styles.profilePreview}
      aria-labelledby="profile-preview-title"
    >
      <p className={styles.eyebrow}>Profil curateur</p>

      <h2 id="profile-preview-title" className={styles.title}>
        {firstName}
      </h2>

      <p className={styles.location}>{city}</p>

      <p className={styles.intro}>
        Tes recommandations apparaîtront avec ton nom dans le fil Curato.
      </p>
    </section>
  );
}
