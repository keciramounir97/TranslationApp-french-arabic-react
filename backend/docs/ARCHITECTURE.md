# 📐 Architecture Technique - Google Traduction Full-Stack

## 1. Vue d'Ensemble de l'Architecture

L'application repose sur un modèle **Client-Serveur découplé** :
- **Frontend** : Développé en **React 19** avec **Vite**, gérant le rendu visuel, la navigation dynamique via **React Router DOM v7**, la gestion des états globaux avec le **Context API**, et les requêtes HTTP avec **Axios**.
- **Backend** : Un serveur **Node.js Express** exposant des API REST sécurisées pour la traduction multi-fournisseurs (Google Translate & MyMemory API fallback), l'authentification JWT, la gestion du dictionnaire et la persistance des données.

---

## 2. API Endpoints (Serveur Express Port 5000)

| Méthode | Endpoint | Description | Authentification |
|---|---|---|---|
| `POST` | `/api/auth/register` | Inscription d'un nouvel utilisateur | Non |
| `POST` | `/api/auth/login` | Connexion et génération d'un token JWT | Non |
| `GET` | `/api/auth/me` | Récupération du profil utilisateur | Requis (`Bearer Token`) |
| `GET` | `/api/translate/languages` | Obtention des 20 langues supportées | Non |
| `POST` | `/api/translate` | Exécution d'une traduction source -> cible | Optionnel |
| `POST` | `/api/translate/reverse` | Inversion des langues et du texte | Optionnel |
| `GET` | `/api/translate/tts` | Flux audio de synthèse vocale | Non |
| `GET` | `/api/history` | Récupération de l'historique de l'utilisateur | Optionnel |
| `DELETE` | `/api/history/:id` | Suppression d'un élément d'historique | Optionnel |
| `DELETE` | `/api/history` | Vidage complet de l'historique | Optionnel |
| `GET` | `/api/favorites` | Liste des traductions en favoris | Optionnel |
| `POST` | `/api/favorites` | Ajout d'une traduction aux favoris | Optionnel |
| `DELETE` | `/api/favorites/:id` | Retrait d'un favori | Optionnel |
| `GET` | `/api/dictionary/lookup` | Recherche de définition et phonétique | Non |

---

## 3. Clés de Stockage Local (LocalStorage)

| Clé | Description | Exemple de Valeur |
|---|---|---|
| `trad_token` | Jeton JWT d'authentification de l'utilisateur connecté | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `app_theme` | Mode d'apparence de l'interface graphique | `'dark'` ou `'light'` |
| `app_ui_lang` | Langue choisie pour l'interface utilisateur | `'fr'`, `'en'` ou `'ar'` |
