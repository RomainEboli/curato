import { useState } from "react";
import Button from "./components/Button";
import FilterBar from "./components/FilterBar";
import RecommendationCard from "./components/RecommendationCard";
import RecommendationForm from "./components/RecommendationForm";
import { recommendations, themes } from "./data/recommendations";
import type { Recommendation } from "./types/recommendation";
import styles from "./App.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<
    (typeof themes)[number] | "Tous"
  >("Tous");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [recommendationList, setRecommendationList] =
    useState<Recommendation[]>(recommendations);

  function handleAddRecommendation(recommendation: Recommendation) {
    setRecommendationList((currentRecommendations) => [
      recommendation,
      ...currentRecommendations,
    ]);

    setIsFormOpen(false);
  }
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("fr-FR");

  const filteredRecommendations = recommendationList.filter(
    (recommendation) => {
      const matchesTheme =
        selectedTheme === "Tous" || recommendation.theme === selectedTheme;

      const searchableContent = [
        recommendation.title,
        recommendation.description,
        recommendation.theme,
        recommendation.creatorName,
        recommendation.creatorHandle,
      ]
        .join(" ")
        .toLocaleLowerCase("fr-FR");

      const matchesSearch =
        normalizedSearchTerm === "" ||
        searchableContent.includes(normalizedSearchTerm);

      return matchesTheme && matchesSearch;
    },
  );
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a className={styles.logo} href="/">
            Curato
          </a>

          <nav aria-label="Navigation principale">
            <ul className={styles.navigationList}>
              <li>
                <a href="#feed">Découvrir</a>
              </li>
              <li>
                <a href="#collections">Collections</a>
              </li>
              <li>
                <a href="#profile">Mon goût</a>
              </li>
            </ul>
          </nav>

          <Button type="button" onClick={() => setIsFormOpen(true)}>
            Ajouter une recommandation
          </Button>
        </div>
      </header>

      <main id="main-content" className={styles.main}>
        <section className={styles.intro} aria-labelledby="page-title">
          <p className={styles.eyebrow}>La sélection du jour</p>

          <h1 id="page-title" className={styles.title}>
            Des découvertes choisies par des personnes, pas par un algorithme.
          </h1>

          <p className={styles.description}>
            Une recommandation par jour, sélectionnée par des curateurs aux
            goûts proches des tiens.
          </p>
        </section>

        {isFormOpen ? (
          <RecommendationForm
            themes={[...themes]}
            onSubmit={handleAddRecommendation}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : null}

        <section id="feed" className={styles.feed} aria-labelledby="feed-title">
          <div className={styles.sectionHeader}>
            <h2 id="feed-title" className={styles.sectionTitle}>
              Aujourd’hui pour toi
            </h2>

            <p className={styles.sectionDescription}>
              Trois découvertes sélectionnées dans ton univers visuel.
            </p>
          </div>

          <FilterBar
            searchTerm={searchTerm}
            selectedTheme={selectedTheme}
            themes={[...themes]}
            onSearchTermChange={setSearchTerm}
            onThemeChange={setSelectedTheme}
          />

          {filteredRecommendations.length > 0 ? (
            <div className={styles.recommendationList}>
              {filteredRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>Aucune découverte trouvée</h3>
              <p>Essaie un autre mot-clé ou sélectionne un autre thème.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
