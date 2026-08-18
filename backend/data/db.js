import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'store.json');

// Structure initiale de la base de données JSON
const defaultData = {
  users: [],
  history: [],
  favorites: [],
  dictionary: {
    "hello": {
      word: "hello",
      phonetic: "/həˈloʊ/",
      meanings: [
        {
          partOfSpeech: "exclamation",
          definitions: [
            { definition: "Used as a greeting or to begin a phone conversation.", example: "Hello, how are you today?" }
          ]
        }
      ]
    },
    "bonjour": {
      word: "bonjour",
      phonetic: "/bɔ̃.ʒuʁ/",
      meanings: [
        {
          partOfSpeech: "nom masculin",
          definitions: [
            { definition: "Formule de salutation employée le jour.", example: "Dis bonjour à tes amis." }
          ]
        }
      ]
    },
    "مرحبا": {
      word: "مرحبا",
      phonetic: "/mar-ha-ban/",
      meanings: [
        {
          partOfSpeech: "تحية",
          definitions: [
            { definition: "كلمة ترحيب بالضيف أو الصديق", example: "مرحباً بك في تطبيق الترجمة" }
          ]
        }
      ]
    }
  }
};

// Initialisation du fichier JSON s'il n'existe pas
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

initDb();

export function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("Erreur de lecture de la base de données:", error);
    return defaultData;
  }
}

export function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Erreur d'écriture dans la base de données:", error);
    return false;
  }
}
