import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Recommendation, Theme } from "../types/recommendation";
import Button from "./Button";
import styles from "./RecommendationForm.module.css";

type RecommendationFormProps = {
  themes: Theme[];
  onSubmit: (recommendation: Recommendation) => void;
  onCancel: () => void;
};

type FormValues = {
  title: string;
  description: string;
  url: string;
  theme: Theme;
  creatorName: string;
  creatorHandle: string;
};

const initialFormValues: FormValues = {
  title: "",
  description: "",
  url: "",
  theme: "Illustration",
  creatorName: "",
  creatorHandle: "",
};

function RecommendationForm({
  themes,
  onSubmit,
  onCancel,
}: RecommendationFormProps) {
  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const hasEmptyField = Object.values(values).some(
      (value) => value.trim() === "",
    );

    if (hasEmptyField) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    try {
      new URL(values.url);
    } catch {
      setErrorMessage(
        "Ajoute une URL valide, par exemple https://exemple.com.",
      );
      return;
    }

    onSubmit({
      id: crypto.randomUUID(),
      title: values.title.trim(),
      description: values.description.trim(),
      url: values.url.trim(),
      theme: values.theme,
      creatorName: values.creatorName.trim(),
      creatorHandle: values.creatorHandle.trim(),
      publishedAt: "À l’instant",
    });

    setValues(initialFormValues);
    setErrorMessage("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <div>
          <p className={styles.eyebrow}>Nouvelle recommandation</p>
          <h2 className={styles.title}>Partage une découverte</h2>
        </div>

        <button
          className={styles.closeButton}
          type="button"
          onClick={onCancel}
          aria-label="Fermer le formulaire"
        >
          ×
        </button>
      </div>

      {errorMessage ? (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            placeholder="Ex. Une série d’images à découvrir"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="theme">Thème</label>
          <select
            id="theme"
            name="theme"
            value={values.theme}
            onChange={handleChange}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Pourquoi la recommandes-tu ?</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Décris ce qui rend cette découverte intéressante."
          rows={4}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="url">Lien</label>
        <input
          id="url"
          name="url"
          type="url"
          value={values.url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor="creatorName">Ton nom</label>
          <input
            id="creatorName"
            name="creatorName"
            type="text"
            value={values.creatorName}
            onChange={handleChange}
            placeholder="Ex. Romain Eboli"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="creatorHandle">Ton pseudo</label>
          <input
            id="creatorHandle"
            name="creatorHandle"
            type="text"
            value={values.creatorHandle}
            onChange={handleChange}
            placeholder="@pseudo"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit">Publier la recommandation</Button>

        <button
          className={styles.cancelButton}
          type="button"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default RecommendationForm;
