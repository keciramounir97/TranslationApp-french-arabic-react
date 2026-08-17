# 🌍 TranslationApp React — French 🇫🇷 ↔ Arabic 🇩🇿

A modern React application that uses the Google Translate API through RapidAPI for French-Arabic translation, built with Vite and optimized with Oxlint and React Compiler.

---

## 📁 Project Structure

```
TranslationApp-react/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── LICENSE
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
```

---

## ⚙️ Configuration Files

### 📄 `package.json`

```json
{
  "name": "translationapp-react",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "oxlint . --fix"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "axios": "^1.7.9",
    "react-compiler-runtime": "^0.0.0-experimental-20250108-2"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "oxlint": "^0.15.10",
    "vite": "^6.0.7"
  }
}
```

---

### 📄 `vite.config.js`

```javascript
// ============================================
// CONFIGURATION VITE
// ============================================

// Importation du plugin React pour Vite
import react from '@vitejs/plugin-react';
// Importation de la fonction defineConfig de Vite
import { defineConfig } from 'vite';

// ============================================
// EXPORTATION DE LA CONFIGURATION
// ============================================

export default defineConfig({
  // Configuration des plugins
  plugins: [
    // Plugin React avec options spécifiques
    react({
      // Activation du React Compiler (Babel)
      // Améliore les performances en optimisant les re-rendus
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {}]
        ]
      }
    })
  ],
  
  // Configuration du serveur de développement
  server: {
    // Port d'écoute (par défaut: 5173)
    port: 5173,
    // Ouverture automatique du navigateur
    open: true
  },
  
  // Configuration du build
  build: {
    // Dossier de sortie
    outDir: 'dist',
    // Minification du code
    minify: 'esbuild',
    // Source maps pour le débogage
    sourcemap: true
  }
});
```

---

### 📄 `.oxlintrc.json`

```json
{
  "rules": {
    "eqeqeq": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2]
  },
  "ignorePatterns": [
    "node_modules",
    "dist",
    "*.min.js"
  ]
}
```

---

## 📄 HTML - `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Encodage des caractères -->
    <meta charset="UTF-8" />
    
    <!-- Compatibilité mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Titre de la page -->
    <title>French ↔ Arabic Translator</title>
    
    <!-- Icône du site -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  </head>
  
  <body>
    <!-- Point d'entrée React -->
    <div id="root"></div>
    
    <!-- Script principal (chargé par Vite) -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 🎨 CSS - `src/index.css`

```css
/* ============================================
   STYLES GLOBAUX
   ============================================ */

/* Reset des marges et paddings */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Styles du corps de la page */
body {
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background: #f4f7fb;
  color: #172033;
  
  /* Centrage du contenu */
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 24px;
}

/* Style du code */
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

---

## 🎨 CSS - `src/assets/App.css`

```css
/* ============================================
   VARIABLES CSS
   ============================================ */

:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-light: rgba(37, 99, 235, 0.12);
  --danger: #dc2626;
  --text: #172033;
  --text-secondary: #667085;
  --border: #d0d5dd;
  --border-light: #e4e7ec;
  --background: #ffffff;
  --background-body: #f4f7fb;
}

/* ============================================
   CONTENEUR PRINCIPAL
   ============================================ */

.app {
  width: 100%;
  max-width: 900px;
}

/* ============================================
   EN-TÊTE
   ============================================ */

.app-header {
  text-align: center;
  margin-bottom: 28px;
}

.eyebrow {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  margin-bottom: 12px;
  color: var(--text);
}

.description {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* ============================================
   SECTION TRADUCTEUR
   ============================================ */

.translator {
  background: var(--background);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(16, 24, 40, 0.08);
}

/* ============================================
   CHAMPS DE FORMULAIRE
   ============================================ */

.field {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field + .field {
  margin-top: 24px;
}

label {
  font-weight: 700;
  color: var(--text);
}

textarea,
select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px;
  font: inherit;
  background: var(--background);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

textarea {
  resize: vertical;
  min-height: 180px;
}

textarea:focus,
select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-light);
}

textarea:disabled {
  background: #f8fafc;
  cursor: not-allowed;
  opacity: 0.7;
}

select:disabled {
  background: #f8fafc;
  cursor: not-allowed;
  opacity: 0.7;
}

textarea[readonly] {
  background: #f8fafc;
  color: var(--text);
}

/* ============================================
   CONTROLES
   ============================================ */

.controls {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 14px;
  margin-top: 24px;
}

.controls label {
  grid-column: 1 / -1;
}

select {
  min-height: 48px;
}

button {
  min-height: 48px;
  border: 0;
  border-radius: 12px;
  padding: 0 22px;
  background: var(--primary);
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s, background 0.2s;
}

button:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
}

/* ============================================
   STATUT
   ============================================ */

.status {
  min-height: 24px;
  margin-top: 18px;
  font-weight: 600;
  color: var(--text-secondary);
}

.status.error {
  color: var(--danger);
}

.status.success {
  color: #16a34a;
}

/* ============================================
   RACCOURCI CLAVIER
   ============================================ */

.shortcut {
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

kbd {
  border: 1px solid var(--border);
  border-bottom-width: 2px;
  border-radius: 5px;
  padding: 2px 6px;
  background: #f9fafb;
  font-size: 0.8rem;
  font-family: inherit;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 650px) {
  body {
    padding: 14px;
  }

  .translator {
    padding: 18px;
  }

  .controls {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
```

---

## ⚛️ React - `src/main.jsx`

```jsx
// ============================================
// POINT D'ENTRÉE DE L'APPLICATION
// ============================================

// Importation de React (obligatoire pour JSX)
import React from 'react';
// Importation de ReactDOM pour le rendu
import ReactDOM from 'react-dom/client';
// Importation des styles globaux
import './index.css';
// Importation du composant principal
import App from './assets/App.jsx';

// ============================================
// RENDU DE L'APPLICATION
// ============================================

// Création du root React
// document.getElementById('root') cible l'élément HTML avec l'id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu du composant App dans le DOM
// React.StrictMode active les vérifications de développement
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ⚛️ React - `src/assets/App.jsx`

```jsx
// ============================================
// 1. IMPORTATIONS
// ============================================

// Importation de React et des hooks useState
// useState : gère l'état local du composant
// useCallback : mémorise les fonctions pour éviter les re-rendus inutiles
import React, { useState, useCallback } from 'react';

// Importation d'Axios pour les requêtes HTTP
import axios from 'axios';

// Importation des styles du composant
import './App.css';

// ============================================
// 2. COMPOSANT PRINCIPAL
// ============================================

function App() {
  // ==========================================
  // 2.1 DÉCLARATION DES ÉTATS
  // ==========================================

  // État pour le texte source (ce que l'utilisateur tape)
  const [sourceText, setSourceText] = useState('');
  
  // État pour le texte traduit (résultat de l'API)
  const [translatedText, setTranslatedText] = useState('');
  
  // État pour la direction de traduction ('fr-ar' ou 'ar-fr')
  const [direction, setDirection] = useState('fr-ar');
  
  // État de chargement (true pendant la requête API)
  const [isLoading, setIsLoading] = useState(false);
  
  // État pour le message de statut
  const [statusMessage, setStatusMessage] = useState('');
  
  // État pour indiquer si le statut est une erreur
  const [isError, setIsError] = useState(false);

  // ==========================================
  // 2.2 CONFIGURATION DE L'API
  // ==========================================

  // URL de l'API Google Translate via RapidAPI
  const API_URL = 'https://google-translate113.p.rapidapi.com/api/v1/translator/json';

  // Headers (en-têtes) HTTP pour l'authentification
  const API_HEADERS = {
    // Clé API (à remplacer par votre clé)
    'x-rapidapi-key': 'VOTRE_CLE_RAPIDAPI',
    // Nom de l'hôte sur RapidAPI
    'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
    // Format des données
    'Content-Type': 'application/json',
  };

  // ==========================================
  // 2.3 FONCTIONS UTILITAIRES
  // ==========================================

  /**
   * Détermine les codes de langue source et cible
   * @returns {Object} { from: 'fr'|'ar', to: 'ar'|'fr' }
   */
  const getDirection = useCallback(() => {
    // Si l'utilisateur a choisi Arabe → Français
    if (direction === 'ar-fr') {
      return { from: 'ar', to: 'fr' };
    }
    // Par défaut: Français → Arabe
    return { from: 'fr', to: 'ar' };
  }, [direction]);

  /**
   * Extrait le texte traduit de la réponse API
   * Gère les différents formats de réponse possibles
   * @param {*} apiResponse - Réponse de l'API
   * @returns {string} - Texte traduit
   * @throws {Error} - Si le format est inconnu
   */
  const extractTranslatedText = useCallback((apiResponse) => {
    // CAS 1 : La réponse est une chaîne de caractères
    if (typeof apiResponse === 'string') {
      return apiResponse;
    }

    // CAS 2 : La réponse est un objet
    if (apiResponse && typeof apiResponse === 'object') {
      // Format: { trans: "texte traduit" }
      if (typeof apiResponse.trans === 'string') {
        return apiResponse.trans;
      }
      
      // Format: { trans: { text: "texte traduit" } }
      if (apiResponse.trans && typeof apiResponse.trans.text === 'string') {
        return apiResponse.trans.text;
      }

      // Format: { translation: "texte traduit" }
      if (typeof apiResponse.translation === 'string') {
        return apiResponse.translation;
      }

      // Format: { translated_text: "texte traduit" }
      if (typeof apiResponse.translated_text === 'string') {
        return apiResponse.translated_text;
      }

      // Format: { data: { translation: "texte traduit" } }
      if (apiResponse.data && typeof apiResponse.data.translation === 'string') {
        return apiResponse.data.translation;
      }

      // Format: { data: { translatedText: "texte traduit" } }
      if (apiResponse.data && typeof apiResponse.data.translatedText === 'string') {
        return apiResponse.data.translatedText;
      }

      // Format: { json: { text: "texte traduit" } }
      if (apiResponse.json && typeof apiResponse.json.text === 'string') {
        return apiResponse.json.text;
      }
    }

    // Si aucun format n'est reconnu
    throw new Error('Format de réponse API inattendu.');
  }, []);

  // ==========================================
  // 2.4 FONCTION PRINCIPALE DE TRADUCTION
  // ==========================================

  /**
   * Fonction asynchrone qui gère la traduction
   * Utilise Axios pour envoyer la requête à l'API
   */
  const handleTranslate = useCallback(async () => {
    // ===== VÉRIFICATION DU TEXTE =====
    const trimmedText = sourceText.trim();
    
    if (!trimmedText) {
      setTranslatedText('');
      setStatusMessage('Veuillez saisir un texte à traduire.');
      setIsError(true);
      return;
    }

    // ===== PRÉPARATION DE LA REQUÊTE =====
    const directionObj = getDirection();

    setIsLoading(true);
    setStatusMessage('Traduction en cours...');
    setIsError(false);

    // ===== CONFIGURATION D'AXIOS =====
    const options = {
      method: 'POST',
      url: API_URL,
      headers: API_HEADERS,
      data: {
        from: directionObj.from,
        to: directionObj.to,
        protected_paths: [],
        common_protected_paths: [],
        json: {
          text: trimmedText,
        },
      },
    };

    // ===== EXÉCUTION DE LA REQUÊTE =====
    try {
      // Envoi de la requête avec Axios
      const response = await axios.request(options);
      
      // Extraction du texte traduit
      const translated = extractTranslatedText(response.data);
      
      // Mise à jour des états
      setTranslatedText(translated);
      setStatusMessage('✅ Traduction terminée avec succès.');
      setIsError(false);
      
    } catch (error) {
      // ===== GESTION DES ERREURS =====
      setTranslatedText('');
      
      let errorMessage = '❌ Erreur de traduction';
      
      if (error.response) {
        errorMessage += ` (${error.response.status}): ${JSON.stringify(error.response.data)}`;
      } else if (error.request) {
        errorMessage += ': Le serveur ne répond pas.';
      } else {
        errorMessage += `: ${error.message}`;
      }
      
      setStatusMessage(errorMessage);
      setIsError(true);
      
      // Log dans la console pour le débogage
      console.error('Erreur de traduction:', error);
      
    } finally {
      // ===== NETTOYAGE =====
      setIsLoading(false);
    }
  }, [sourceText, direction, getDirection, extractTranslatedText, API_URL, API_HEADERS]);

  // ==========================================
  // 2.5 GESTIONNAIRE D'ÉVÉNEMENTS
  // ==========================================

  /**
   * Gestionnaire de touche pour Ctrl+Enter / Cmd+Enter
   * @param {KeyboardEvent} event - Événement clavier
   */
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      handleTranslate();
    }
  }, [handleTranslate]);

  // ==========================================
  // 2.6 RENDU DU COMPOSANT (JSX)
  // ==========================================

  return (
    <div className="app">
      {/* En-tête */}
      <header className="app-header">
        <p className="eyebrow">🌍 TranslationApp</p>
        <h1>French ↔ Arabic Translator</h1>
        <p className="description">
          Translate text between French and Arabic using RapidAPI.
        </p>
      </header>

      {/* Section Traducteur */}
      <section className="translator">
        {/* Texte source */}
        <div className="field">
          <label htmlFor="sourceText">Text to translate</label>
          <textarea
            id="sourceText"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your French or Arabic text here..."
            rows="8"
            disabled={isLoading}
          />
        </div>

        {/* Contrôles */}
        <div className="controls">
          <label htmlFor="direction">Translation direction</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            disabled={isLoading}
          >
            <option value="fr-ar">🇫🇷 French → 🇩🇿 Arabic</option>
            <option value="ar-fr">🇩🇿 Arabic → 🇫🇷 French</option>
          </select>
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? '⏳ Translating...' : '🚀 Translate'}
          </button>
        </div>

        {/* Résultat */}
        <div className="field">
          <label htmlFor="translatedText">Translation</label>
          <textarea
            id="translatedText"
            value={translatedText}
            placeholder="The translation will appear here..."
            rows="8"
            readOnly
          />
        </div>

        {/* Statut */}
        <p className={`status ${isError ? 'error' : translatedText ? 'success' : ''}`}>
          {statusMessage}
        </p>

        {/* Raccourci clavier */}
        <p className="shortcut">
          💡 Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to translate.
        </p>
      </section>
    </div>
  );
}

// ============================================
// 3. EXPORTATION DU COMPOSANT
// ============================================

export default App;
```

---

## 🔍 Explication du Code Ligne par Ligne

### 📄 `main.jsx` - Point d'entrée

| Ligne | Explication |
|-------|-------------|
| `import React from 'react'` | Importe React pour utiliser JSX |
| `import ReactDOM from 'react-dom/client'` | Importe ReactDOM pour le rendu dans le DOM |
| `import './index.css'` | Importe les styles globaux |
| `import App from './assets/App.jsx'` | Importe le composant principal |
| `const root = ReactDOM.createRoot(document.getElementById('root'))` | Crée un root React sur l'élément #root |
| `root.render(<React.StrictMode><App /></React.StrictMode>)` | Rend le composant App avec StrictMode |

---

### 📄 `App.jsx` - Composant Principal

| Lignes | Explication |
|--------|-------------|
| `import React, { useState, useCallback } from 'react'` | Importe React et les hooks useState/useCallback |
| `import axios from 'axios'` | Importe Axios pour les requêtes HTTP |
| `import './App.css'` | Importe les styles du composant |
| `const [sourceText, setSourceText] = useState('')` | État pour le texte source, initialisé vide |
| `const [translatedText, setTranslatedText] = useState('')` | État pour le texte traduit, initialisé vide |
| `const [direction, setDirection] = useState('fr-ar')` | État pour la direction, par défaut FR→AR |
| `const [isLoading, setIsLoading] = useState(false)` | État de chargement, initialisé à false |
| `const [statusMessage, setStatusMessage] = useState('')` | État du message de statut |
| `const [isError, setIsError] = useState(false)` | État d'erreur, initialisé à false |
| `const API_URL = '...'` | URL de l'API Google Translate |
| `const API_HEADERS = { ... }` | Headers pour l'authentification RapidAPI |
| `const getDirection = useCallback(() => {...}, [direction])` | Retourne les codes de langue selon la direction |
| `const extractTranslatedText = useCallback((apiResponse) => {...}, [])` | Extrait le texte traduit de la réponse API |
| `const handleTranslate = useCallback(async () => {...}, [sourceText, direction, ...])` | Fonction principale de traduction avec Axios |
| `const handleKeyDown = useCallback((event) => {...}, [handleTranslate])` | Gestionnaire pour Ctrl+Enter |
| `return (...)` | Rendu JSX du composant |
| `export default App` | Exporte le composant pour l'utiliser ailleurs |

---

## 🔄 Flux de l'Application

```
1. 👤 L'utilisateur écrit un texte
         ↓
2. 🌐 L'utilisateur choisit la direction
         ↓
3. 🔘 L'utilisateur clique sur "Translate"
         ↓
4. 🧹 Le texte est validé (non vide)
         ↓
5. 📦 Axios crée la requête POST
         ↓
6. 📡 La requête est envoyée à l'API
         ↓
7. ☁️ RapidAPI traite la traduction
         ↓
8. 📥 La réponse est reçue
         ↓
9. 🧩 Le texte traduit est extrait
         ↓
10. 📝 Le résultat est affiché
         ↓
11. ✅ Le statut est mis à jour
```

---

## 🚀 Commandes

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting avec Oxlint
npm run lint
```

---

## 📦 Différences avec la version Vanilla JS

| Aspect | Vanilla JS | React |
|--------|------------|-------|
| **Structure** | 3 fichiers (HTML, CSS, JS) | Plusieurs fichiers (JSX, CSS) |
| **Gestion du DOM** | Manipulation directe (`getElementById`) | DOM virtuel avec états (`useState`) |
| **Mise à jour** | Manuelle (`value = ...`) | Automatique via les états |
| **Événements** | `addEventListener` | Props (`onClick`, `onChange`) |
| **Build** | Aucun (fichiers statiques) | Vite (bundling, minification) |
| **Linting** | Manuel | Oxlint (automatisé) |
| **Performance** | Standard | Optimisé avec React Compiler |

---

## ⚠️ Note de Sécurité

**Important :** La clé API est visible dans le code frontend. Pour la production :

1. **Créez un fichier `.env` :**
   ```
   VITE_RAPIDAPI_KEY=votre_cle_api
   ```

2. **Utilisez la variable d'environnement :**
   ```jsx
   'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
   ```

3. **Ajoutez `.env` au `.gitignore`**

---

## 📚 Technologies Utilisées

| Technologie | Rôle |
|-------------|------|
| **React 18** | Bibliothèque UI |
| **Vite** | Bundler et serveur de développement |
| **Axios** | Client HTTP |
| **React Compiler** | Optimisation des performances |
| **Oxlint** | Linting et analyse de code |
| **RapidAPI** | Plateforme d'API |
| **Google Translate** | Service de traduction |