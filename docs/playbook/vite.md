# Vite — démarrer et travailler sur Curato

## À quoi sert Vite ?

Vite démarre le serveur local de développement et met à jour automatiquement la page lorsque j’enregistre un fichier.

## Démarrer l’application

Dans PowerShell :

```powershell
E:
cd \EnCours\curato
npm run dev
```

Ouvrir ensuite l’adresse affichée, généralement :

```text
http://localhost:5173/
```

## Arrêter l’application

Dans le terminal où Vite tourne :

```text
Ctrl + C
```

## Rappels

- Le terminal doit rester ouvert pendant le développement.
- `Ctrl + S` dans VS Code déclenche normalement une mise à jour automatique du navigateur.
- Si le port 5173 est déjà occupé, ouvrir l’adresse différente indiquée par Vite.
- `src/main.tsx` est le point d’entrée React.
- `src/App.tsx` est le composant racine de Curato.
- `src/index.css` contient les styles globaux.
