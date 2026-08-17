// ============================================
// 1. IMPORTATIONS
// ============================================

// Importation de React et du hook useState
// useState permet de gérer l'état local du composant
import React, { useState } from "react";

// Importation d'axios pour faire des requêtes HTTP
// Axios est plus simple que fetch pour les appels API
import axios from "axios";

// Importation des styles CSS
import "./App.css";

// ============================================
// 2. COMPOSANT PRINCIPAL App
// ============================================

function App() {
  // ==========================================
  // 2.1 DÉCLARATION DES ÉTATS (useState)
  // ==========================================

  // État pour le texte source (ce que l'utilisateur écrit)
  // sourceText: la valeur actuelle du texte
  // setSourceText: fonction pour mettre à jour cette valeur
  const [sourceText, setSourceText] = useState("");
  // Valeur initiale: chaîne vide ''

  // État pour le texte traduit (résultat de l'API)
  const [translatedText, setTranslatedText] = useState("");
  // Valeur initiale: chaîne vide ''

  // État pour la direction de traduction
  // direction: 'fr-ar' (Français→Arabe) ou 'ar-fr' (Arabe→Français)
  const [direction, setDirection] = useState("fr-ar");
  // Valeur initiale: 'fr-ar'

  // État pour indiquer si la traduction est en cours
  // isLoading: true quand la requête est en cours, false sinon
  const [isLoading, setIsLoading] = useState(false);
  // Valeur initiale: false

  // État pour le message de statut (succès ou erreur)
  const [statusMessage, setStatusMessage] = useState("");
  // Valeur initiale: chaîne vide ''

  // État pour indiquer si le message est une erreur
  // isError: true pour les erreurs (texte en rouge), false pour les succès
  const [isError, setIsError] = useState(false);
  // Valeur initiale: false

  // ==========================================
  // 2.2 CONFIGURATION DE L'API
  // ==========================================

  // URL de l'API Google Translate via RapidAPI
  const API_URL =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/json";

  // Headers (en-têtes HTTP) pour l'authentification
  // Ces headers sont obligatoires pour utiliser RapidAPI
  const API_HEADERS = {
    // Clé API unique fournie par RapidAPI
    "x-rapidapi-key": "9c2fc369bbmshd6d85a4c84ef101p1d6237jsn45a366186078",

    // Nom de l'API sur RapidAPI
    "x-rapidapi-host": "google-translate113.p.rapidapi.com",

    // Format des données envoyées
    "Content-Type": "application/json",
  };

  // ==========================================
  // 2.3 FONCTIONS UTILITAIRES
  // ==========================================

  /**
   * Fonction qui détermine les langues source et cible
   * en fonction de la sélection de l'utilisateur
   *
   * @returns {Object} { from: 'fr'|'ar', to: 'ar'|'fr' }
   */
  const getDirection = () => {
    // Si l'utilisateur a choisi "Arabe → Français"
    if (direction === "ar-fr") {
      return { from: "ar", to: "fr" };
    }
    // Par défaut: "Français → Arabe"
    return { from: "fr", to: "ar" };
  };

  /**
   * Fonction pour extraire le texte traduit de la réponse API
   * Gère différents formats de réponse possibles
   *
   * @param {*} apiResponse - La réponse de l'API (objet ou chaîne)
   * @returns {string} Le texte traduit
   * @throws {Error} Si le format de réponse est inconnu
   */
  const extractTranslatedText = (apiResponse) => {
    // CAS 1: La réponse est une chaîne de caractères
    if (typeof apiResponse === "string") {
      return apiResponse;
    }

    // CAS 2: La réponse est un objet
    if (apiResponse && typeof apiResponse === "object") {
      // Format 1: { trans: "texte" }
      if (typeof apiResponse.trans === "string") {
        return apiResponse.trans;
      }

      // Format 2: { trans: { text: "texte" } }
      if (apiResponse.trans && typeof apiResponse.trans.text === "string") {
        return apiResponse.trans.text;
      }

      // Format 3: { translation: "texte" }
      if (typeof apiResponse.translation === "string") {
        return apiResponse.translation;
      }

      // Format 4: { translated_text: "texte" }
      if (typeof apiResponse.translated_text === "string") {
        return apiResponse.translated_text;
      }

      // Format 5: { data: { translation: "texte" } }
      if (
        apiResponse.data &&
        typeof apiResponse.data.translation === "string"
      ) {
        return apiResponse.data.translation;
      }

      // Format 6: { data: { translatedText: "texte" } }
      if (
        apiResponse.data &&
        typeof apiResponse.data.translatedText === "string"
      ) {
        return apiResponse.data.translatedText;
      }

      // Format 7: { json: { text: "texte" } }
      if (apiResponse.json && typeof apiResponse.json.text === "string") {
        return apiResponse.json.text;
      }
    }

    // Si aucun format n'est reconnu
    throw new Error("Format de réponse API inattendu.");
  };

  // ==========================================
  // 2.4 FONCTION PRINCIPALE DE TRADUCTION
  // ==========================================

  /**
   * Fonction asynchrone qui gère la traduction
   * Utilise Axios pour faire la requête HTTP
   */
  const handleTranslate = async () => {
    // ===== VÉRIFICATION DU TEXTE SOURCE =====
    // Supprime les espaces au début et à la fin
    const trimmedText = sourceText.trim();

    // Si le texte est vide
    if (!trimmedText) {
      // Efface le texte traduit précédent
      setTranslatedText("");

      // Affiche un message d'erreur
      setStatusMessage("Écris d'abord une phrase à traduire.");
      setIsError(true);

      // Arrête l'exécution
      return;
    }

    // ===== PRÉPARATION DE LA REQUÊTE =====
    // Récupère la direction de traduction
    const directionObj = getDirection();

    // Activation de l'état de chargement
    setIsLoading(true);

    // Message de chargement
    setStatusMessage("Traduction en cours...");
    setIsError(false);

    // ===== CONFIGURATION D'AXIOS =====
    // Création de l'objet de configuration pour Axios
    const options = {
      // Méthode HTTP: POST (on envoie des données)
      method: "POST",

      // URL de l'API
      url: API_URL,

      // Headers de la requête
      headers: API_HEADERS,

      // Corps de la requête (données envoyées)
      data: {
        // Langue source (ex: 'fr' ou 'ar')
        from: directionObj.from,

        // Langue cible (ex: 'ar' ou 'fr')
        to: directionObj.to,

        // Tableaux de chemins protégés (requis par l'API)
        protected_paths: [],
        common_protected_paths: [],

        // Texte à traduire dans un objet json
        json: {
          text: trimmedText,
        },
      },
    };

    // ===== EXÉCUTION DE LA REQUÊTE =====
    try {
      // Envoi de la requête avec Axios
      // await attend la réponse avant de continuer
      const response = await axios.request(options);

      // ===== TRAITEMENT DE LA RÉPONSE =====
      // response.data contient le corps de la réponse
      const data = response.data;

      // Extraction du texte traduit
      const translated = extractTranslatedText(data);

      // Mise à jour de l'état avec le texte traduit
      setTranslatedText(translated);

      // Message de succès
      setStatusMessage("Traduction terminée ✓");
      setIsError(false);
    } catch (error) {
      // ===== GESTION DES ERREURS =====

      // Efface le texte traduit en cas d'erreur
      setTranslatedText("");

      // Construction d'un message d'erreur détaillé
      let errorMessage = "Erreur de traduction";

      // Si l'erreur vient d'Axios (réponse HTTP)
      if (error.response) {
        // Erreur avec réponse du serveur
        errorMessage += ` (${error.response.status}): ${error.response.data}`;
      }
      // Si la requête a échoué sans réponse
      else if (error.request) {
        errorMessage += ": Le serveur ne répond pas";
      }
      // Autre type d'erreur
      else {
        errorMessage += `: ${error.message}`;
      }

      // Affichage du message d'erreur
      setStatusMessage(errorMessage);
      setIsError(true);

      // Affichage dans la console pour le débogage
      console.error("Erreur de traduction:", error);
    } finally {
      // ===== NETTOYAGE =====
      // Ce bloc s'exécute toujours, qu'il y ait erreur ou non

      // Désactivation de l'état de chargement
      setIsLoading(false);
    }
  };

  // ==========================================
  // 2.5 GESTIONNAIRE D'ÉVÉNEMENTS
  // ==========================================

  /**
   * Gestionnaire pour le raccourci clavier Ctrl+Enter
   * Permet de lancer la traduction sans cliquer sur le bouton
   *
   * @param {KeyboardEvent} event - L'événement clavier
   */
  const handleKeyDown = (event) => {
    // Vérifie si la touche Enter est pressée AVEC Ctrl (ou Cmd sur Mac)
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      // Empêche le comportement par défaut (saut de ligne)
      event.preventDefault();

      // Déclenche la traduction
      handleTranslate();
    }
  };

  // ==========================================
  // 2.6 RENDU DU COMPOSANT (JSX)
  // ==========================================

  return (
    <div className="app">
      {/* Titre principal */}
      <h1>Traducteur FR ↔ AR</h1>

      {/* Ligne de contrôle: sélecteur + bouton */}
      <div className="row">
        {/* Menu déroulant pour choisir la direction */}
        <select
          // La valeur sélectionnée est liée à l'état 'direction'
          value={direction}
          // Quand l'utilisateur change la sélection, on met à jour l'état
          onChange={(e) => setDirection(e.target.value)}
          // Attribut d'accessibilité pour les lecteurs d'écran
          aria-label="Direction de traduction"
          // Désactiver le select pendant le chargement
          disabled={isLoading}
        >
          <option value="fr-ar">Français → Arabe</option>
          <option value="ar-fr">Arabe → Français</option>
        </select>

        {/* Bouton de traduction */}
        <button
          // Au clic, on appelle la fonction de traduction
          onClick={handleTranslate}
          // Désactiver le bouton pendant le chargement
          disabled={isLoading}
          type="button"
        >
          {/* Affichage conditionnel: texte change selon l'état */}
          {isLoading ? "⏳ Traduction..." : "🚀 Traduire"}
        </button>
      </div>

      {/* Champ de texte source */}
      <label htmlFor="sourceText">Texte source</label>
      <textarea
        id="sourceText"
        // La valeur est liée à l'état 'sourceText'
        value={sourceText}
        // Quand l'utilisateur tape, on met à jour l'état
        onChange={(e) => setSourceText(e.target.value)}
        // Gestionnaire pour le raccourci Ctrl+Enter
        onKeyDown={handleKeyDown}
        // Texte d'aide affiché quand le champ est vide
        placeholder="Écris ta phrase ici..."
        // Désactiver le champ pendant le chargement
        disabled={isLoading}
      />

      {/* Champ de texte traduit (lecture seule) */}
      <label htmlFor="translatedText">Traduction</label>
      <textarea
        id="translatedText"
        // La valeur est liée à l'état 'translatedText'
        value={translatedText}
        // Lecture seule: l'utilisateur ne peut pas modifier
        readOnly
        // Texte d'aide
        placeholder="La traduction s'affichera ici..."
      />

      {/* Zone d'affichage des messages de statut */}
      <div
        // Classe CSS conditionnelle: 'error' si isError est true
        className={`status ${isError ? "error" : ""}`}
        // Rôle pour l'accessibilité
        role="status"
        // Annonce les changements aux lecteurs d'écran
        aria-live="polite"
      >
        {statusMessage}
      </div>
    </div>
  );
}

// ============================================
// 3. EXPORTATION DU COMPOSANT
// ============================================

// Exporte le composant pour qu'il puisse être importé ailleurs
export default App;
