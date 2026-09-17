import type { Theme } from "../types/recommendation";
import styles from "./FilterBar.module.css";

type FilterBarProps = {
  searchTerm: string;
  selectedTheme: Theme | "Tous";
  themes: Theme[];
  onSearchTermChange: (value: string) => void;
  onThemeChange: (theme: Theme | "Tous") => void;
};

function FilterBar({
  searchTerm,
  selectedTheme,
  themes,
  onSearchTermChange,
  onThemeChange,
}: FilterBarProps) {
  return (
    <div className={styles.filters}>
      <div className={styles.searchGroup}>
        <label className={styles.label} htmlFor="recommendation-search">
          Rechercher une découverte
        </label>

        <input
          id="recommendation-search"
          className={styles.searchInput}
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Titre, créateur, thème..."
        />
      </div>

      <div className={styles.themeGroup}>
        <p className={styles.label} id="theme-filter-label">
          Filtrer par thème
        </p>

        <div
          className={styles.themeList}
          aria-labelledby="theme-filter-label"
          role="group"
        >
          <button
            className={
              selectedTheme === "Tous"
                ? `${styles.themeButton} ${styles.themeButtonActive}`
                : styles.themeButton
            }
            type="button"
            onClick={() => onThemeChange("Tous")}
          >
            Tous
          </button>

          {themes.map((theme) => (
            <button
              key={theme}
              className={
                selectedTheme === theme
                  ? `${styles.themeButton} ${styles.themeButtonActive}`
                  : styles.themeButton
              }
              type="button"
              onClick={() => onThemeChange(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
