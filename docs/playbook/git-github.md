# Git et GitHub — workflow Curato

## Différence

- Git enregistre l’historique des changements sur mon ordinateur.
- GitHub héberge une copie distante du dépôt, accessible en ligne.

## Vérifier l’état avant de faire quoi que ce soit

```powershell
git status
```

Je vérifie qu’aucun fichier sensible ou inattendu ne sera ajouté.

## Enregistrer une fonctionnalité validée

```powershell
git add .
git status
git commit -m "feat: description claire du changement"
git push
```

## Signification

- `git add .` : prépare les changements pour le prochain commit.
- `git status` : montre les fichiers modifiés et préparés.
- `git commit -m "..."` : crée un instantané local nommé.
- `git push` : envoie les commits locaux sur GitHub.

## Règles

- Ne jamais envoyer `node_modules`.
- Ne jamais envoyer `.env`, `.env.local`, clés API, mots de passe ou tokens.
- Toujours lire `git status` avant `git add .`.
- Un commit doit décrire une fonctionnalité, une correction ou une tâche claire.
- Si l’application est cassée, corriger ou revenir en arrière avant de commit.
