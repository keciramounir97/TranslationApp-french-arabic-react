# 📜 Documentation Détaillée du Passage au Full-Stack (Ligne par Ligne / Bloc par Bloc)

Cette documentation explique de manière exhaustive **ce qui a changé**, **tous les fichiers ajoutés**, **pourquoi ils ont été ajoutés** et **comment fonctionne le code** pour passer de l'ancienne application monolithique (`App.jsx`) à la nouvelle architecture Full-Stack professionnelle.

---

## 📑 Sommaire des Changements

1. **Restructuration du Projet** : Séparation du code en deux répertoires distincts `frontend/` et `backend/` et création du dossier `docs/`.
2. **Ajout du Backend Express Node.js** : API REST avec Express, CORS, JWT, bcryptjs, et gestion du dictionnaire, de l'historique et des favoris.
3. **Moteur de Traduction 20 Langues & Reverse App** : Prise en charge de 20 langues avec auto-détection, inversion automatique source/cible, et synthèse vocale (Text-To-Speech).
4. **Intégration de React Router DOM v7** : Découpage de l'application en pages distinctes (`/`, `/history`, `/favorites`, `/dictionary`, `/login`, `/register`, `/settings`).
5. **Contextes React & LocalStorage** :
   - `AuthContext.jsx` : Gestion de l'authentification et du token JWT dans `localStorage`.
   - `ThemeContext.jsx` : Bascule de mode Clair/Sombre sauvegardée dans `localStorage`.
   - `LanguageContext.jsx` : Internationalisation (i18n) de l'interface en FR, EN et AR (avec gestion de la direction RTL/LTR).
6. **Client Axios** : Configuration d'un intercepteur HTTP automatique pour insérer les en-têtes d'authentification Bearer.

---

## 🗂️ 1. LE BACKEND (`/backend`)

### 🔹 `backend/package.json`
- **Pourquoi cet ajout ?** : Définit les dépendances Node.js et les scripts de démarrage du serveur API.
- **Explication des lignes clé** :
  - `"type": "module"` : Permet d'utiliser la syntaxe moderne d'import/export ES6 (`import express from 'express'`).
  - `"express": "^4.21.2"` : Le framework web léger pour créer nos routes d'API REST.
  - `"cors": "^2.8.5"` : Permet aux requêtes provenant du frontend React (port 5173) d'accéder au backend (port 5000) sans être bloquées par le navigateur.
  - `"jsonwebtoken": "^9.0.2"` : Génère et vérifie les jetons JWT sécurisés pour l'authentification des utilisateurs.
  - `"bcryptjs": "^2.4.3"` : Hache de façon sécurisée les mots de passe avant de les enregistrer.
  - `"axios": "^1.7.9"` : Effectue les requêtes HTTP vers les API externes de traduction (Google et MyMemory).

### 🔹 `backend/server.js`
- **Pourquoi cet ajout ?** : Fichier principal qui démarre le serveur web Express.
- **Explication du code ligne par ligne / bloc par bloc** :
  - `import express from 'express';` : Importation d'Express.
  - `const app = express();` : Initialisation de l'application Express.
  - `app.use(cors());` : Activation des règles CORS pour toutes les origines.
  - `app.use(express.json());` : Permet au serveur de lire les corps de requêtes au format JSON (`req.body`).
  - `app.use('/api/auth', authRoutes);` : Associe les routes `/api/auth` aux contrôleurs d'authentification (connexion, inscription).
  - `app.use('/api/translate', translateRoutes);` : Associe les routes `/api/translate` à la traduction des 20 langues et à la synthèse vocale.
  - `app.use('/api/history', historyRoutes);` : Gestion de l'historique utilisateur.
  - `app.use('/api/favorites', favoritesRoutes);` : Gestion des favoris enregistrés.
  - `app.use('/api/dictionary', dictionaryRoutes);` : Recherche dans le dictionnaire interactif.
  - `app.listen(PORT, ...)` : Lance le serveur sur le port 5000 et affiche la confirmation dans la console.

### 🔹 `backend/data/db.js`
- **Pourquoi cet ajout ?** : Fournit un système de stockage de données persistant basé sur un fichier JSON (`store.json`), éliminant le besoin de configurer une base de données externe lourde (ex: MongoDB ou MySQL).
- **Fonctionnement** :
  - `initDb()` : Vérifie si `store.json` existe. S'il est absent, il le crée avec une structure par défaut contenant les utilisateurs, l'historique et le dictionnaire.
  - `readDb()` : Lit et décode le fichier JSON en objet JavaScript manipulable.
  - `writeDb(data)` : Sauvegarde l'objet modifié dans le fichier physique `store.json`.

### 🔹 `backend/middleware/authMiddleware.js`
- **Pourquoi cet ajout ?** : Sécurise les routes de l'API en vérifiant la présence et la validité du jeton JWT dans l'en-tête `Authorization: Bearer <token>`.
- **Fonctionnement** :
  - `authenticateToken` : Vérifie le token JWT. Si le token est absent ou corrompu, renvoie une erreur `401 Unauthorized`. Si valide, extrait l'utilisateur et le fixe sur `req.user`.
  - `optionalAuthenticateToken` : Permet l'accès aux utilisateurs invités (non connectés) tout en identifiant les utilisateurs connectés si un jeton est transmis.

### 🔹 `backend/controllers/authController.js`
- **Pourquoi cet ajout ?** : Contient la logique d'inscription (`register`), de connexion (`login`) et d'obtention du profil (`getMe`).
- **Explication des blocs de code** :
  - `register` :
    1. Reçoit `name`, `email`, et `password`.
    2. Vérifie qu'aucun compte n'existe déjà avec cet email.
    3. Hache le mot de passe avec `bcrypt.hash(password, salt)`.
    4. Sauvegarde le nouvel utilisateur dans la base de données.
    5. Génère un jeton JWT avec `jwt.sign()` valable 7 jours.
  - `login` :
    1. Vérifie l'existence de l'utilisateur par son email.
    2. Compare le mot de passe saisi avec le hash stocké en base via `bcrypt.compare()`.
    3. Si le mot de passe est correct, renvoie le token JWT et les informations de l'utilisateur.

### 🔹 `backend/controllers/translateController.js`
- **Pourquoi cet ajout ?** : Le cœur de l'application de traduction supportant **20 langues**.
- **Explication des blocs de code** :
  - `SUPPORTED_LANGUAGES` : Tableau de 20 langues (Français, Arabe, Anglais, Espagnol, Allemand, Italien, Portugais, Russe, Chinois, Japonais, Coréen, Hindi, Turc, Néerlandais, Polonais, Suédois, Grec, Vietnamien, Indonésien, Ukrainien). Chaque langue possède son code ISO, son drapeau emoji, son nom natif et son orientation de texte (`ltr` ou `rtl`).
  - `performTranslation(text, from, to)` :
    - Tente d'abord de traduire via l'API Google Translate publique.
    - En cas d'indisponibilité réseau, bascule automatiquement sur l'API MyMemory Translate.
    - Si aucune connexion n'est disponible, utilise un dictionnaire local de secours.
  - `translateText` : Reçoit le texte, exécute `performTranslation`, et enregistre l'opération dans l'historique.
  - `reverseTranslate` : Permute la langue d'origine et la langue cible et traduit en sens inverse (fonctionnalité Reverse App).
  - `getAudioSpeech` : Génère l'URL de synthèse vocale Google TTS pour l'écoute orale du texte.

---

## 💻 2. LE FRONTEND (`/frontend`)

### 🔹 `frontend/vite.config.js`
- **Pourquoi cet ajout ?** : Configure le serveur de développement Vite.
- **Clé essentielle** :
  - `proxy: { '/api': { target: 'http://localhost:5000' } }` : Redirige automatiquement toutes les requêtes `/api` envoyées par le frontend vers le serveur backend Express (port 5000).

### 🔹 `frontend/src/styles/index.css`
- **Pourquoi cet ajout ?** : Définit le système de design complet en Vanilla CSS avec thèmes dynamique Dark/Light et Glassmorphism.
- **Explication des variables CSS** :
  - `:root` : Définit la palette de couleurs du Mode Clair (`--bg-primary`, `--bg-secondary`, `--text-primary`, `--accent-primary`).
  - `[data-theme="dark"]` : Redéfinit les variables pour le Mode Sombre élégant (fond bleu-nuit foncé, textes clairs, lueurs néon).
  - `[dir="rtl"]` : Change automatiquement la police vers `'Cairo'` pour un affichage optimal de la langue arabe.

### 🔹 `frontend/src/context/AuthContext.jsx`
- **Pourquoi cet ajout ?** : Maintient l'état d'authentification global de l'application React.
- **Explication des méthodes** :
  - `token` : Initialisé avec `localStorage.getItem('trad_token')`.
  - `useEffect` : À chaque changement de token, charge le profil utilisateur `/api/auth/me` et sauvegarde le token dans `localStorage`.
  - `login` & `register` : Appellent l'API backend et enregistrent le token dans l'état et dans `localStorage`.
  - `logout` : Réinitialise le token et supprime l'entrée du `localStorage`.

### 🔹 `frontend/src/context/ThemeContext.jsx`
- **Pourquoi cet ajout ?** : Gère la bascule entre Mode Sombre et Mode Clair.
- **Fonctionnement** :
  - Stocke le choix du thème dans `localStorage` sous la clé `'app_theme'`.
  - Met à jour l'attribut du document HTML `document.documentElement.setAttribute('data-theme', theme)` pour appliquer les styles CSS correspondants.

### 🔹 `frontend/src/context/LanguageContext.jsx`
- **Pourquoi cet ajout ?** : Gère l'internationalisation (i18n) de l'interface graphique (FR, EN, AR).
- **Fonctionnement** :
  - Fournit une fonction utilitaire `t(key)` qui renvoie la chaîne traduite dans la langue choisie.
  - Si la langue de l'interface choisie est l'Arabe (`'ar'`), règle automatiquement la direction de la page entière à `rtl` (Right-To-Left).

### 🔹 `frontend/src/services/api.js`
- **Pourquoi cet ajout ?** : Instance Axios centralisée.
- **Intercepteur Request** :
  ```javascript
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('trad_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  ```
  À chaque appel API, lit le jeton dans `localStorage` et l'ajoute dans le header HTTP `Authorization`.

### 🔹 `frontend/src/pages/HomePage.jsx`
- **Pourquoi cette modication/création ?** : Remplace l'ancien `App.jsx` monolithique par la page principale de traduction.
- **Fonctionnalités avancées intégrées** :
  - **Détection automatique et 20 langues** : Sélecteur de 20 langues avec flags emojis.
  - **Traduction instantanée (Debounce)** : Traduit automatiquement après 550ms de frappe sans surcharger l'API.
  - **Bouton Reverse (Swap)** : Inverse les deux langues et intervertit les zones de texte.
  - **Actions Rapides** : Copier dans le presse-papier, écoute audio, ajout aux favoris ★ et vidage de zone.

### 🔹 `frontend/src/pages/HistoryPage.jsx`, `FavoritesPage.jsx` & `DictionaryPage.jsx`
- **HistoryPage.jsx** : Affiche l'historique complet avec filtre de recherche en temps réel et option de suppression.
- **FavoritesPage.jsx** : Liste toutes les traductions marquées d'une étoile par l'utilisateur.
- **DictionaryPage.jsx** : Recherche de mots en dictionnaire interactif avec phonétique, nature grammaticale et phrases d'exemple.

---

## 📊 Résumé du Flux de Données

1. **Saisie par l'utilisateur** dans `HomePage.jsx`.
2. **Requête HTTP POST** envoyée via `api.post('/translate')` au backend Express (`http://localhost:5000/api/translate`).
3. **Traitement backend** dans `translateController.js` :
   - Requête transmise au moteur Google Translate / MyMemory.
   - Enregistrement automatique du résultat dans `store.json`.
4. **Réponse envoyée au Frontend** avec le texte traduit et le nom du fournisseur.
5. **Mise à jour de l'état React** et affichage fluide dans l'interface utilisateur.
