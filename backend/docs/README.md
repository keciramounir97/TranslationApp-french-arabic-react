# 🚀 Google Traduction Full-Stack React & Node.js

Bienvenue dans la documentation complète de la nouvelle version de l'application **Google Traduction Full-Stack**.

L'application est passée d'un composant React unique monolithic (`App.jsx`) à une architecture professionnelle séparée en **Frontend** et **Backend**, supportant **20 langues**, avec système de reverse translation (inversion automatique), authentification JWT, gestion de thèmes (Clair/Sombre), internationalisation i18n (FR, EN, AR), dictionnaire interactif, favoris, historique et stockage local (`localStorage`).

---

## 📁 Structure du Projet

```text
googletrad/
├── frontend/                  # Application React 19 + Vite + React Router DOM
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── components/        # Navbar, Footer, LanguageSelector, AudioPlayer, ProtectedRoute
│       ├── context/           # AuthContext, ThemeContext, LanguageContext
│       ├── pages/             # HomePage, HistoryPage, FavoritesPage, DictionaryPage, LoginPage, RegisterPage, SettingsPage
│       ├── services/          # Client Axios intercepté
│       └── styles/            # Système de design CSS Glassmorphism
├── backend/                   # Serveur API REST Node.js + Express
│   ├── package.json
│   ├── server.js              # Point d'entrée du serveur Express
│   ├── controllers/           # authController, translateController, historyController, favoritesController, dictionaryController
│   ├── routes/                # authRoutes, translateRoutes, historyRoutes, favoritesRoutes, dictionaryRoutes
│   ├── middleware/            # authMiddleware (Vérification des jetons JWT)
│   └── data/                  # Base de données locale JSON (db.js)
└── docs/                      # Documentation complète en Français
    ├── README.md              # Ce fichier
    ├── ARCHITECTURE.md        # Guide d'architecture technique
    └── LINE_BY_LINE_EXPLANATION_FR.md # Explication détaillée ligne par ligne / bloc par bloc
```

---

## 🛠️ Installation et Démarrage

### 1. Démarrer le Backend (API Express sur le port 5000)
```bash
cd backend
npm install
npm start
```
Le serveur sera accessible sur `http://localhost:5000`.

### 2. Démarrer le Frontend (Vite React sur le port 5173)
```bash
cd frontend
npm install
npm run dev
```
Ouvrez votre navigateur sur `http://localhost:5173`.

---

## 🌟 Fonctionnalités Clés
- **20 Langues Supportées** : Français, Arabe, Anglais, Espagnol, Allemand, Italien, Portugais, Russe, Chinois, Japonais, Coréen, Hindi, Turc, Néerlandais, Polonais, Suédois, Grec, Vietnamien, Indonésien, Ukrainien.
- **Inversion Automatique (Reverse App)** : Bouton de permutation instantanée des langues source/cible et du texte.
- **Synthèse Vocale (Text-To-Speech)** : Écoute de la prononciation dans chaque langue.
- **Authentification Sécurisée (JWT)** : Inscription, connexion, persistance du jeton et profil utilisateur.
- **Local Storage** : Sauvegarde des préférences (Thème, Langue d'interface, Jeton Auth).
- **Favoris & Historique** : Gestion des traductions enregistrées et recherche dans l'historique.
- **Dictionnaire Interactif** : Définitions, phonétique et exemples d'utilisation des mots.
