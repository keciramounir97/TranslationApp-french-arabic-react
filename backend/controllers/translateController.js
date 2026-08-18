import axios from "axios";
import { readDb, writeDb } from "../data/db.js";

// Liste complète des 20 langues supportées avec leurs métadonnées
export const SUPPORTED_LANGUAGES = [
  {
    code: "auto",
    name: "Détecter la langue",
    nativeName: "Auto Detect",
    flag: "🌐",
    dir: "ltr",
  },
  {
    code: "fr",
    name: "Français",
    nativeName: "Français",
    flag: "🇫🇷",
    dir: "ltr",
  },
  { code: "ar", name: "Arabe", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  {
    code: "en",
    name: "Anglais",
    nativeName: "English",
    flag: "🇬🇧",
    dir: "ltr",
  },
  {
    code: "es",
    name: "Espagnol",
    nativeName: "Español",
    flag: "🇪🇸",
    dir: "ltr",
  },
  {
    code: "de",
    name: "Allemand",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    dir: "ltr",
  },
  {
    code: "it",
    name: "Italien",
    nativeName: "Italiano",
    flag: "🇮🇹",
    dir: "ltr",
  },
  {
    code: "pt",
    name: "Portugais",
    nativeName: "Português",
    flag: "🇵🇹",
    dir: "ltr",
  },
  { code: "ru", name: "Russe", nativeName: "Русский", flag: "🇷🇺", dir: "ltr" },
  {
    code: "zh",
    name: "Chinois (Simplifié)",
    nativeName: "中文",
    flag: "🇨🇳",
    dir: "ltr",
  },
  {
    code: "ja",
    name: "Japonais",
    nativeName: "日本語",
    flag: "🇯🇵",
    dir: "ltr",
  },
  { code: "ko", name: "Coréen", nativeName: "한국어", flag: "🇰🇷", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "tr", name: "Turc", nativeName: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  {
    code: "nl",
    name: "Néerlandais",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    dir: "ltr",
  },
  {
    code: "pl",
    name: "Polonais",
    nativeName: "Polski",
    flag: "🇵🇱",
    dir: "ltr",
  },
  {
    code: "sv",
    name: "Suédois",
    nativeName: "Svenska",
    flag: "🇸🇪",
    dir: "ltr",
  },
  { code: "el", name: "Grec", nativeName: "Ελληνικά", flag: "🇬🇷", dir: "ltr" },
  {
    code: "vi",
    name: "Vietnamien",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    dir: "ltr",
  },
  {
    code: "id",
    name: "Indonésien",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    dir: "ltr",
  },
  {
    code: "uk",
    name: "Ukrainien",
    nativeName: "Українська",
    flag: "🇺🇦",
    dir: "ltr",
  },
];

export const getLanguages = (req, res) => {
  res.json({ languages: SUPPORTED_LANGUAGES });
};

// Extraction du texte traduit gérant les différents formats de réponse RapidAPI d'origine
function extractTranslatedText(apiResponse) {
  if (typeof apiResponse === "string") return apiResponse;
  if (apiResponse && typeof apiResponse === "object") {
    if (typeof apiResponse.trans === "string") return apiResponse.trans;
    if (apiResponse.trans && typeof apiResponse.trans.text === "string")
      return apiResponse.trans.text;
    if (typeof apiResponse.translation === "string")
      return apiResponse.translation;
    if (typeof apiResponse.translated_text === "string")
      return apiResponse.translated_text;
    if (apiResponse.data && typeof apiResponse.data.translation === "string")
      return apiResponse.data.translation;
    if (apiResponse.data && typeof apiResponse.data.translatedText === "string")
      return apiResponse.data.translatedText;
    if (apiResponse.json && typeof apiResponse.json.text === "string")
      return apiResponse.json.text;
  }
  return null;
}

// Fonction d'exécution de la traduction utilisant EXCLUSIVEMENT l'API RapidAPI
async function performTranslation(text, from, to) {
  let sourceLang = from === "auto" ? "en" : from;
  let targetLang = to;

  const API_URL =
    "https://google-translate113.p.rapidapi.com/api/v1/translator/json";
  const API_HEADERS = {
    "x-rapidapi-key":
      process.env.RAPIDAPI_KEY ||
      "9c2fc369bbmshd6d85a4c84ef101p1d6237jsn45a366186078",
    "x-rapidapi-host": "google-translate113.p.rapidapi.com",
    "Content-Type": "application/json",
  };

  const options = {
    method: "POST",
    url: API_URL,
    headers: API_HEADERS,
    data: {
      from: sourceLang,
      to: targetLang,
      protected_paths: [],
      common_protected_paths: [],
      json: {
        text: text,
      },
    },
    timeout: 10000,
  };

  try {
    const response = await axios.request(options);
    const translated = extractTranslatedText(response.data);
    if (translated) {
      return {
        translatedText: translated,
        detectedLanguage: sourceLang,
        provider: "RapidAPI Google Translate",
      };
    }
    throw new Error("Format de réponse RapidAPI invalide.");
  } catch (error) {
    console.error("Erreur RapidAPI Google Translate:", error.message);
    throw error;
  }
}

export const translateText = async (req, res) => {
  try {
    const { text, from = "fr", to = "ar", saveToHistory = true } = req.body;

    if (!text || !text.trim()) {
      return res
        .status(400)
        .json({ message: "Le texte à traduire ne peut pas être vide." });
    }

    const trimmedText = text.trim();
    const result = await performTranslation(trimmedText, from, to);

    // Enregistrer dans l'historique si demandé
    if (saveToHistory) {
      const userId = req.user ? req.user.id : "guest";
      const db = readDb();
      const historyItem = {
        id:
          "hist_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
        userId,
        sourceText: trimmedText,
        translatedText: result.translatedText,
        from,
        to,
        detectedLanguage: result.detectedLanguage,
        timestamp: new Date().toISOString(),
      };

      // Garder les 100 dernières traductions
      db.history.unshift(historyItem);
      if (db.history.length > 200) db.history = db.history.slice(0, 200);
      writeDb(db);
    }

    res.json({
      success: true,
      originalText: trimmedText,
      translatedText: result.translatedText,
      from,
      to,
      detectedLanguage: result.detectedLanguage,
      provider: result.provider,
    });
  } catch (error) {
    console.error("Erreur traduction backend:", error);
    res
      .status(500)
      .json({ message: "Erreur lors du traitement de la traduction." });
  }
};

export const reverseTranslate = async (req, res) => {
  try {
    const { text, from, to } = req.body;

    if (!text || !text.trim()) {
      return res
        .status(400)
        .json({ message: "Aucun texte fourni pour l'inversion." });
    }

    // Inverser la direction de langue
    const reversedFrom = to === "auto" ? "fr" : to;
    const reversedTo = from === "auto" ? "en" : from;

    const result = await performTranslation(
      text.trim(),
      reversedFrom,
      reversedTo,
    );

    res.json({
      success: true,
      reversedText: text.trim(),
      translatedText: result.translatedText,
      newFrom: reversedFrom,
      newTo: reversedTo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'inversion de la traduction." });
  }
};

export const getAudioSpeech = (req, res) => {
  const { text, lang = "fr" } = req.query;
  if (!text) {
    return res
      .status(400)
      .json({ message: "Texte manquant pour la synthèse vocale." });
  }

  // Générer une URL audio Google TTS fluide
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
  res.json({ audioUrl: ttsUrl });
};
