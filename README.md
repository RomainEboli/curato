# Curato

Curato est une application web de découverte créative. Elle propose un fil de recommandations sélectionnées autour de l’illustration, du design, de la 3D et de la photographie.

Le projet sert aussi de terrain d’apprentissage concret : construire une interface React maintenable, typée avec TypeScript, versionnée avec Git et documentée au fil de son évolution.

## Objectif

Curato aide une personne intéressée par la création visuelle à découvrir et partager des recommandations de créateurs ou de contenus, dans une interface simple, lisible et accessible.

La première version repose sur des données locales. Elle permet de valider l’expérience principale avant l’ajout éventuel d’une authentification, d’une base de données et d’un déploiement plus complet.

## Fonctionnalités prévues

### Version actuelle / MVP

- Afficher un fil de recommandations.
- Afficher les informations essentielles d’une recommandation : titre, description, thème, créateur, date et lien.
- Rechercher des recommandations.
- Filtrer les recommandations par thème.
- Ajouter une recommandation depuis un formulaire.
- Valider les champs nécessaires avant publication.
- Limiter la publication à une recommandation toutes les 24 heures.
- Proposer une interface responsive, navigable au clavier et avec un focus visible.

### Évolutions possibles

- Authentification des utilisateurs.
- Persistance des données avec une base de données.
- Profils et image de profil.
- Collections de recommandations.
- Page de détail d’une recommandation.
- Routing entre plusieurs pages.
- Tests automatisés et intégration continue.
- Déploiement public.

## Parcours principal

```text
Accueil
→ consulter le fil de recommandations
→ rechercher ou filtrer par thème
→ ouvrir le lien d’une recommandation

Accueil
→ cliquer sur « Ajouter une recommandation »
→ remplir le formulaire
→ valider les champs
→ publier
→ voir la nouvelle recommandation dans le fil
```

## Stack technique

| Domaine | Choix |
|---|---|
| Interface | React |
| Langage | TypeScript |
| Outil de développement et build | Vite |
| Styles | CSS Modules et variables CSS |
| Données de la V1 | Données locales typées |
| Versionnage | Git |
| Hébergement du code | GitHub |
| Tests, plus tard | Vitest et React Testing Library |
| Déploiement, plus tard | Vercel ou solution équivalente |

## Installation locale

### Prérequis

- Node.js installé.
- npm disponible dans le terminal.
- Git installé.

### Lancer le projet

Depuis un terminal, ouvrir le dossier du projet puis exécuter :

```powershell
npm install
npm run dev
```

Vite affiche ensuite une adresse locale, généralement :

```text
http://localhost:5173/
```

Ouvrir cette adresse dans le navigateur.

### Arrêter le serveur

Dans le terminal où Vite est lancé :

```text
Ctrl + C
```

## Commandes utiles

| Commande | Rôle |
|---|---|
| `npm install` | Installe les dépendances du projet |
| `npm run dev` | Démarre le serveur de développement Vite |
| `npm run build` | Génère la version de production |
| `npm run preview` | Prévisualise localement la version de production |
| `git status` | Affiche les fichiers modifiés et l’état du dépôt |
| `git add .` | Prépare les changements pour un commit |
| `git commit -m "type: message"` | Enregistre un instantané local du travail |
| `git push` | Envoie les commits vers GitHub |

## Structure du projet

```text
curato/
├── docs/                  # Documentation personnelle et technique du projet
│   ├── README.md          # Index des fiches
│   └── playbook/          # Mémos de travail
├── public/                # Fichiers statiques publics
├── src/                   # Code source de l’application
│   ├── assets/            # Ressources importées par l’application
│   ├── components/        # Composants React réutilisables
│   ├── data/              # Données locales de démonstration
│   ├── types/             # Types TypeScript métier
│   ├── App.tsx            # Composant racine
│   ├── main.tsx           # Point d’entrée React
│   └── index.css          # Styles globaux
├── package.json           # Dépendances et scripts npm
├── tsconfig.json          # Configuration TypeScript
├── vite.config.ts         # Configuration Vite
└── README.md              # Présentation publique du projet
```

La structure évoluera lorsque l’application grandira. Un dossier ou un composant est ajouté lorsqu’il répond à un besoin réel, pas par anticipation.

## Documentation de travail

Le dossier `docs/` contient les mémos utilisés pour développer le projet sans devoir tout mémoriser.

- `demarrer-un-projet.md` : passer d’une idée à un projet cadré et initialisé.
- `construire-une-fonctionnalite.md` : passer d’un besoin à une fonctionnalité testée.
- `vite.md` : démarrer et utiliser le projet localement.
- `git-github.md` : enregistrer et publier le travail proprement.
- `react.md` : composants, props, state et flux de données.
- `typescript.md` : types et modélisation des données.
- `css.md` : styles, responsive et accessibilité visuelle.
- `checklists.md` : vérifications avant commit ou fin de fonctionnalité.
- `journal-de-bugs.md` : erreurs rencontrées et solutions retenues.

## Méthode de développement

Chaque ajout suit le même chemin :

```text
Besoin utilisateur
→ critères de fin
→ plus petite tranche visible
→ composants et données nécessaires
→ state et flux d’événements
→ implémentation
→ tests manuel et technique
→ documentation utile
→ commit Git
```

Avant de commencer une fonctionnalité, répondre à ces questions :

1. Quel résultat concret l’utilisateur doit-il obtenir ?
2. Comment vérifier que la fonctionnalité est terminée ?
3. Quel est le plus petit résultat visible à livrer ?
4. Quels composants sont concernés ?
5. Quelles données sont nécessaires et où doivent-elles vivre ?
6. Quelle action utilisateur déclenche quel changement ?
7. Quels cas normal, vide et erreur faut-il vérifier ?

## Qualité attendue

Chaque fonctionnalité ajoutée doit viser les points suivants :

- Interface lisible sur ordinateur et mobile.
- Navigation possible au clavier.
- Focus visible sur les éléments interactifs.
- Boutons, champs et liens avec des libellés explicites.
- Types TypeScript clairs pour les données métier.
- Aucun secret, token ou fichier `.env` envoyé dans Git.
- Aucune erreur non comprise dans la console ou le terminal.
- Commits petits, explicites et réalisés après vérification.

## Convention de commits

Utiliser un préfixe et une description courte à l’impératif ou sous forme de changement clair :

```text
feat: add recommendation form
fix: prevent duplicate publication
style: improve mobile card layout
docs: add project documentation
refactor: extract recommendation card
chore: update dependencies
```

## État du projet

Curato est en cours de construction. La priorité est de livrer un MVP local propre et cohérent, puis de faire évoluer les données, les tests et le déploiement par étapes.

## Licence

Projet personnel d’apprentissage et de portfolio. La licence pourra être précisée avant une publication ou une réutilisation externe.
