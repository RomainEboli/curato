# Démarrer un projet web — de l’idée au premier commit

Objectif : transformer une idée vague en premier livrable simple, testable et publié.

Règle principale : ne pas construire “l’application complète”.
Construire la plus petite version qui prouve que l’idée fonctionne.

## 1. Décrire le projet en une phrase

Utiliser cette phrase :

> [Nom] aide [type d’utilisateur] à [action principale] afin de [bénéfice].

Exemple Curato :

> Curato aide les personnes qui veulent découvrir des créations visuelles à recevoir et partager une recommandation humaine par jour.

Si je ne peux pas écrire cette phrase, l’idée est encore trop floue.

## 2. Identifier le problème et l’utilisateur

Répondre brièvement :

- Pour qui est ce projet ?
- Quel problème concret rencontre cette personne ?
- Que fait-elle aujourd’hui à la place ?
- Quel résultat utile doit-elle obtenir ?
- Pourquoi mon projet serait-il préférable ou différent ?

Ne pas chercher à répondre pour “tout le monde”.
Choisir un premier public précis.

Exemple Curato :

- Public de départ : personnes francophones intéressées par illustration, design, 3D et photographie.
- Problème : trop de contenus, difficile de trouver des créateurs réellement intéressants.
- Résultat : recevoir une découverte humaine, courte et pertinente.

## 3. Définir le MVP

MVP = version la plus petite qui apporte déjà la valeur principale.

Écrire trois listes :

### Obligatoire pour la V1

Ce sans quoi l’idée ne fonctionne pas.

### Utile plus tard

Fonctions intéressantes, mais non nécessaires au premier livrable.

### À ne pas faire maintenant

Fonctions coûteuses, risquées ou éloignées de l’objectif.

Exemple Curato :

Obligatoire :

- Voir un fil de recommandations.
- Voir une fiche recommandation.
- Rechercher et filtrer.
- Ajouter une recommandation.
- Limiter la publication à une par 24 heures.
- Avoir une interface responsive et accessible.

Plus tard :

- Authentification.
- Base de données partagée.
- Image de profil.
- Carte de goût.
- Collections.

Pas maintenant :

- Paiement.
- Messagerie.
- Application mobile.
- IA générative.
- Réseau social complet.
- Microservices.

## 4. Définir les parcours utilisateur

Décrire les actions principales sous forme de parcours.

Format :

```text
Départ
→ action utilisateur
→ résultat attendu
→ étape suivante éventuelle
```

Exemple :

```text
Accueil
→ l’utilisateur consulte le fil
→ il voit des recommandations
→ il filtre par thème
→ il ouvre une recommandation
→ il visite le lien externe
```

Un parcours doit inclure :

- le cas normal ;
- le cas vide ;
- le cas erreur ;
- la sortie ou l’annulation.

## 5. Définir les écrans et les composants

Lister les écrans avant de coder :

- Accueil / fil
- Détail d’un item
- Profil
- Collections
- Formulaire d’ajout

Puis identifier les blocs réutilisables :

- Header
- Navigation
- Button
- Input
- Card
- Badge
- EmptyState
- Form

Ne pas créer tous les composants d’avance.
Créer un composant seulement lorsqu’un écran en a réellement besoin.

## 6. Définir les données

Lister les entités avant de créer l’interface.

Pour chaque entité :

```text
Nom :
Champs :
Relation avec les autres :
Donnée fixe, locale, navigateur ou serveur :
```

Exemple Curato :

```text
Recommendation
- id
- title
- description
- url
- theme
- creatorName
- creatorHandle
- publishedAt

Donnée V1 : locale et typée.
Donnée V2 : Supabase.
```

## 7. Choisir une stack minimale

Choisir seulement ce qui est nécessaire au MVP.

Questions :

- Quel langage ?
- Quel framework ?
- Comment gérer les styles ?
- Où vivent les données au départ ?
- Comment tester ?
- Comment déployer ?

Exemple Curato :

```text
React + TypeScript
Vite
CSS Modules + variables CSS
Données JSON locales pour la V1
Vitest + React Testing Library plus tard
Vercel pour le déploiement
GitHub pour le dépôt
```

Ne pas choisir une technologie pour “faire professionnel”.
Choisir une technologie que je peux apprendre, utiliser et expliquer.

## 8. Définir le premier jalon

Le premier jalon ne doit pas contenir toute la V1.

Format :

```text
Objectif :
Ce qui est visible :
Ce qui est volontairement exclu :
Comment je vérifie :
```

Exemple Curato :

```text
Objectif :
Afficher un premier fil de recommandations en React et TypeScript.

Visible :
Header, introduction, trois cartes, responsive.

Exclu :
Connexion, API, vraie publication, images, paiement.

Vérification :
L’application démarre, les cartes s’affichent, le responsive fonctionne,
la navigation clavier est possible.
```

## 9. Initialiser le projet

Avant de coder :

1. Créer le dossier du projet.
2. Initialiser la stack.
3. Vérifier que l’application démarre.
4. Créer le dépôt Git local.
5. Créer le dépôt GitHub.
6. Créer un README simple.
7. Faire le premier commit.

Pour Curato :

```powershell
npm create vite@latest . -- --template react-ts
npm install
npm run dev

git init -b main
git add .
git commit -m "chore: initialize project"
git remote add origin URL_DU_DEPOT
git push -u origin main
```

## 10. Construire par tranches visibles

Une tranche = une petite partie visible et testable de l’application.

Bon ordre général :

1. Projet qui démarre.
2. Page ou écran statique.
3. Données locales typées.
4. Liste affichée.
5. Composants réutilisables.
6. Responsive et accessibilité.
7. Interactions locales.
8. Validation et erreurs.
9. Routing.
10. Données serveur / API.
11. Tests, CI, déploiement.
12. README, captures et présentation.

Chaque tranche doit être :

- visible pour l’utilisateur ;
- testable ;
- compréhensible ;
- suffisamment petite pour être commitée.

## 11. Questions avant d’écrire du code

Avant une nouvelle idée :

1. Est-ce obligatoire pour la valeur principale ?
2. Quel problème utilisateur résout-elle ?
3. Quel est le plus petit résultat visible ?
4. Quels écrans sont concernés ?
5. Quelles données sont nécessaires ?
6. Est-ce une donnée locale, une donnée serveur ou un état temporaire ?
7. Quel composant doit être créé ou modifié ?
8. Comment je teste le cas normal, vide et erreur ?
9. Quel support existant puis-je réutiliser ?
10. Quel commit validera cette étape ?

## 12. Fin de projet portfolio

Avant de présenter ou candidater :

- [ ] Application déployée sur une URL publique.
- [ ] README clair : problème, cible, fonctionnalités, stack, installation, captures.
- [ ] Dépôt GitHub lisible.
- [ ] Historique de commits cohérent.
- [ ] Responsive vérifié.
- [ ] Navigation clavier et focus visible vérifiés.
- [ ] États loading, empty et error présents lorsque nécessaire.
- [ ] Tests des comportements critiques.
- [ ] CI verte.
- [ ] Vidéo courte de démonstration.
- [ ] Capacité à expliquer les choix et les compromis.
