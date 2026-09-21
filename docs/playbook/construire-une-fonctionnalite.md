# Construire une fonctionnalité — méthode de travail

Objectif : passer d’une idée à une fonctionnalité testée, sans improviser ni tout coder d’un coup.

## 1. Décrire le besoin utilisateur

Avant de toucher au code, écrire une phrase simple :

> En tant qu’utilisateur, je veux [action] afin de [résultat].

Exemple Curato :

> En tant qu’utilisateur, je veux publier une recommandation afin qu’elle apparaisse dans le fil.

Puis écrire ce qui doit se passer concrètement :

- L’utilisateur clique sur « Ajouter une recommandation ».
- Le formulaire apparaît.
- L’utilisateur remplit les champs.
- L’utilisateur clique sur « Publier ».
- Si les champs sont invalides, une erreur apparaît.
- Si tout est valide, la recommandation apparaît en tête du fil.
- Le formulaire se ferme.

## 2. Définir ce qui est “terminé”

Écrire une checklist de tests avant de coder.

Exemple :

- [ ] Le formulaire est fermé au chargement.
- [ ] Le bouton d’ajout l’ouvre.
- [ ] Le bouton Annuler et le bouton Fermer le ferment.
- [ ] Les champs requis sont contrôlés.
- [ ] Une URL invalide affiche une erreur.
- [ ] Une recommandation valide apparaît en haut du fil.
- [ ] La recherche et les filtres trouvent aussi la nouvelle recommandation.
- [ ] Le formulaire est utilisable au clavier.
- [ ] Le responsive reste correct.
- [ ] L’application ne contient pas d’erreur dans la console.

## 3. Découper en petits résultats visibles

Ne pas créer toute la fonctionnalité d’un coup.

Ordre conseillé :

1. Afficher l’interface sans logique.
2. Ajouter les interactions simples.
3. Ajouter les données et l’état.
4. Ajouter la logique métier.
5. Ajouter les cas vides et les erreurs.
6. Tester sur mobile et au clavier.
7. Nettoyer, documenter et commit.

Chaque étape doit produire un changement visible ou vérifiable.

## 4. Choisir les composants

Se demander :

- Quel bloc visuel peut être réutilisé ?
- Quel composant affiche les données ?
- Quel composant reçoit les actions de l’utilisateur ?
- Quel composant coordonne les autres ?

Exemple Curato :

- `App` coordonne la page, la liste et l’ouverture du formulaire.
- `RecommendationForm` affiche les champs, gère leur saisie et valide.
- `RecommendationCard` affiche une recommandation.
- `FilterBar` affiche la recherche et les filtres.
- `Button` est un élément réutilisable.

## 5. Lister les données

Avant d’écrire du JSX, lister les informations nécessaires.

Exemple “recommandation” :

- id
- title
- description
- url
- theme
- creatorName
- creatorHandle
- publishedAt

Puis décider :

- Donnée fixe de démonstration : fichier `data/`.
- Donnée qui change pendant la session : `useState`.
- Donnée qui doit survivre à un rechargement : localStorage ou base de données.
- Donnée venant d’un serveur : API / Supabase plus tard.

## 6. Décider où vit le state

Poser ces questions :

1. Cette donnée change-t-elle ?
2. Est-elle utilisée par un seul composant ?
3. Est-elle utilisée par plusieurs composants ?
4. Peut-elle être calculée depuis une autre donnée ?

Décision :

- Elle ne change pas : constante ou prop.
- Un seul composant l’utilise : state local dans ce composant.
- Plusieurs composants l’utilisent : state dans leur parent commun.
- Elle peut être calculée : ne pas créer de state inutile.

Exemple Curato :

- `values` : dans `RecommendationForm`, car seuls les champs du formulaire l’utilisent.
- `isFormOpen` : dans `App`, car le header ouvre le formulaire et le formulaire peut le fermer.
- `recommendationList` : dans `App`, car le formulaire ajoute, le filtre lit et les cartes affichent.
- `filteredRecommendations` : calculé avec `.filter()`, donc pas stocké dans un state.

## 7. Dessiner le flux de données

Toujours écrire le chemin avant de coder :

```text
Action utilisateur
→ événement
→ fonction
→ mise à jour du state
→ React réaffiche l’interface
```

Exemple Curato :

```text
Clic sur « Ajouter une recommandation »
→ onClick
→ setIsFormOpen(true)
→ isFormOpen devient true
→ RecommendationForm apparaît
```

Exemple publication :

```text
Clic sur « Publier »
→ onSubmit
→ handleSubmit
→ validation
→ onSubmit(newRecommendation)
→ handleAddRecommendation dans App
→ setRecommendationList(...)
→ le fil est réaffiché
→ le formulaire se ferme
```

## 8. Implémenter dans l’ordre

Pour une fonctionnalité React :

1. Créer ou modifier les types TypeScript.
2. Créer les données de démonstration si nécessaire.
3. Créer le composant visuel avec du JSX statique.
4. Ajouter les styles et vérifier mobile / clavier.
5. Ajouter les props.
6. Ajouter le state et les événements.
7. Calculer les données dérivées : filtre, tri, compteur, etc.
8. Ajouter validation, erreurs et état vide.
9. Relier le composant à la page.
10. Tester le parcours complet.

Ne pas chercher à tout faire dans un seul fichier avant de tester.

## 9. Tester avant commit

Tester systématiquement :

- Cas normal : la fonctionnalité fait ce qui est attendu.
- Cas vide : aucune donnée, aucun résultat ou champ vide.
- Cas erreur : entrée invalide, URL invalide, action impossible.
- Clavier : Tab, Entrée, Espace, focus visible.
- Mobile : fenêtre réduite ou DevTools.
- Console et terminal : aucune erreur.
- Régression : les fonctions déjà existantes marchent encore.

## 10. Enregistrer proprement

Quand tout est validé :

```powershell
git status
git add .
git status
git commit -m "feat: description claire"
git push
```

Le commit doit correspondre à une fonctionnalité testée et explicable.

## Questions anti-blocage

Quand je bloque, je réponds dans cet ordre :

1. Quel comportement exact veux-je obtenir ?
2. Quel fichier ou composant est responsable ?
3. Quel état ou quelle donnée doit changer ?
4. Quel événement déclenche ce changement ?
5. Quel élément doit se mettre à jour à l’écran ?
6. Existe-t-il déjà un exemple proche dans le projet ?
7. Quel est le plus petit test possible ?
8. Quel est le message d’erreur exact ?
