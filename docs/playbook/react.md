# React — composants, state et données

Ce mémo contient les patrons React réellement utilisés dans Curato.

## 1. Props : données données par le parent

Une prop est une donnée qu’un composant parent transmet à un composant enfant.

```tsx
type ProfilePreviewProps = {
  firstName: string;
  city: string;
};

export function ProfilePreview({ firstName, city }: ProfilePreviewProps) {
  return (
    <section>
      <h2>{firstName}</h2>
      <p>{city}</p>
    </section>
  );
}
```

Utilisation dans le parent :

```tsx
<ProfilePreview
  firstName={currentProfile.firstName}
  city={currentProfile.city}
/>
```

Règle :

```text
Parent
→ donne les données avec des props
→ enfant
→ affiche les données
```

Les props ne doivent pas être modifiées directement par l’enfant.

## 2. useState : donnée qui change dans l’interface

Utiliser `useState` lorsqu’une information doit changer pendant l’utilisation de l’application.

```tsx
import { useState } from "react";

const [isFormOpen, setIsFormOpen] = useState(false);
```

- `isFormOpen` contient la valeur actuelle.
- `setIsFormOpen` remplace cette valeur.
- `false` est la valeur initiale.

Exemple :

```tsx
<Button type="button" onClick={() => setIsFormOpen(true)}>
  Ajouter une recommandation
</Button>
```

Après le clic :

```text
isFormOpen devient true
→ React réaffiche App
→ le formulaire apparaît
```

## 3. State tableau : ajouter sans modifier l’ancien tableau

Les recommandations de Curato sont stockées dans un tableau.

```tsx
const [recommendationList, setRecommendationList] =
  useState<Recommendation[]>(recommendations);
```

Pour ajouter un élément au début :

```tsx
setRecommendationList((currentRecommendations) => [
  recommendation,
  ...currentRecommendations,
]);
```

Signification :

```text
recommendation
→ nouvelle recommandation

...currentRecommendations
→ toutes les recommandations déjà présentes

[recommendation, ...currentRecommendations]
→ nouveau tableau avec le nouvel élément en premier
```

Ne pas faire ceci :

```tsx
currentRecommendations.push(recommendation);
```

`push()` modifie directement le tableau existant. En React, un state tableau doit être remplacé par un nouveau tableau.

## 4. Données dérivées : filtrer sans créer un nouveau state

Une donnée dérivée peut être calculée depuis un state existant.

Dans Curato :

```tsx
const filteredRecommendations = recommendationList.filter((recommendation) => {
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
});
```

Règle :

```text
Si une valeur peut être calculée depuis un state existant,
ne pas la mettre dans un nouveau useState.
```

Exemple :

```text
recommendationList + recherche + thème
→ filteredRecommendations
```

`filteredRecommendations` est calculé à chaque affichage à partir des vraies sources de données.

## 5. useEffect : synchroniser React avec l’extérieur

Un effet sert à synchroniser le state React avec un système extérieur à React.

Exemples de systèmes extérieurs :

- `localStorage`
- Une API
- Une base de données
- Le titre de l’onglet
- Un minuteur
- Un abonnement temps réel

Dans Curato, `useEffect` sauvegarde la liste dans le navigateur :

```tsx
useEffect(() => {
  localStorage.setItem(
    RECOMMENDATIONS_STORAGE_KEY,
    JSON.stringify(recommendationList),
  );
}, [recommendationList]);
```

Le flux est :

```text
recommendationList change
→ React réaffiche l’interface
→ useEffect se déclenche
→ JSON.stringify transforme le tableau en texte
→ localStorage sauvegarde ce texte
```

La liste des dépendances est :

```tsx
[recommendationList];
```

Elle signifie :

```text
Refaire cet effet quand recommendationList change.
```

Toute valeur React utilisée dans un effet doit apparaître dans son tableau de dépendances.

## 6. localStorage : conserver une donnée localement

`localStorage` est une mémoire du navigateur associée au site.

Il conserve seulement du texte.

```text
Objet ou tableau JavaScript
→ JSON.stringify(...)
→ texte stocké dans localStorage

Texte de localStorage
→ JSON.parse(...)
→ objet ou tableau JavaScript
```

### Nom de la clé

Déclarer une constante hors du composant :

```tsx
const RECOMMENDATIONS_STORAGE_KEY = "curato-recommendations";
```

Cette clé doit rester stable. Si son nom change, l’application ne retrouvera plus les anciennes données.

### Lire au premier chargement

```tsx
const [recommendationList, setRecommendationList] = useState<Recommendation[]>(
  () => {
    const savedRecommendations = localStorage.getItem(
      RECOMMENDATIONS_STORAGE_KEY,
    );

    if (!savedRecommendations) {
      return recommendations;
    }

    try {
      return JSON.parse(savedRecommendations) as Recommendation[];
    } catch {
      return recommendations;
    }
  },
);
```

Le `() => { ... }` est un initialiseur de state.

Il indique à React :

```text
Lire localStorage seulement au démarrage du composant,
puis utiliser le résultat comme valeur initiale.
```

### Pourquoi le try/catch ?

`JSON.parse()` peut échouer si le texte stocké est invalide.

```tsx
try {
  return JSON.parse(savedRecommendations) as Recommendation[];
} catch {
  return recommendations;
}
```

En cas de problème, Curato continue de fonctionner avec les données de démonstration.

## 7. Patron complet : state + localStorage

```tsx
import { useEffect, useState } from "react";

const STORAGE_KEY = "nom-de-la-donnee";

function Example() {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);

    if (!savedItems) {
      return initialItems;
    }

    try {
      return JSON.parse(savedItems) as Item[];
    } catch {
      return initialItems;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function handleAddItem(item: Item) {
    setItems((currentItems) => [item, ...currentItems]);
  }

  return <div>{/* interface */}</div>;
}
```

À adapter :

- `Item` : le type métier concerné.
- `items` : le nom de ton state.
- `initialItems` : les données utilisées quand rien n’est enregistré.
- `STORAGE_KEY` : un nom unique et clair.
- `handleAddItem` : l’action qui modifie le tableau.

## 8. Limites de localStorage

`localStorage` est utile pour une démonstration locale, des préférences ou un brouillon.

Il ne convient pas pour :

- Authentifier un utilisateur.
- Stocker un mot de passe, un token ou une clé secrète.
- Partager des données entre plusieurs utilisateurs.
- Appliquer une règle métier importante de manière sécurisée.
- Utiliser les mêmes données sur plusieurs appareils.

Dans Curato, la persistance locale est temporaire.

Plus tard :

```text
localStorage
→ remplacé ou complété par
→ Supabase Auth + base de données + règles de sécurité
```

La règle d’une recommandation par 24 heures devra être appliquée côté base de données, pas seulement dans React.
