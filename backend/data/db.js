import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INITIAL_DB_FILE = path.join(__dirname, 'store.json');
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production');
const DB_FILE = isServerless ? '/tmp/store.json' : INITIAL_DB_FILE;

// Structure initiale de la base de données JSON
const defaultData = {
  users: [
    {
      id: "usr_1787085020950_ou2o",
      name: "Mounir",
      email: "keciramounir89@gmail.com",
      password: "$2a$10$jg3uRdB9784HePa/DJu//O8UklGHzF.fO2Ln/5xY6fhGQEHEfphSy",
      createdAt: "2026-08-18T20:30:20.950Z"
    }
  ],
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

let memoryDb = null;

// Initialisation du fichier JSON
function initDb() {
  try {
    if (isServerless) {
      if (!fs.existsSync(DB_FILE)) {
        let initialContent = JSON.stringify(defaultData, null, 2);
        if (fs.existsSync(INITIAL_DB_FILE)) {
          initialContent = fs.readFileSync(INITIAL_DB_FILE, 'utf-8');
        }
        fs.writeFileSync(DB_FILE, initialContent, 'utf-8');
      }
    } else {
      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      }
    }
  } catch (error) {
    console.warn("Fichier de base de données non inscriptible, utilisation en mémoire:", error.message);
  }
}

initDb();

export function readDb() {
  if (memoryDb) return memoryDb;
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    } else if (fs.existsSync(INITIAL_DB_FILE)) {
      const raw = fs.readFileSync(INITIAL_DB_FILE, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb;
    }
  } catch (error) {
    console.error("Erreur de lecture de la base de données:", error);
  }
  memoryDb = defaultData;
  return memoryDb;
}

export function writeDb(data) {
  memoryDb = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.warn("Écriture disque ignorée sur environnement serverless, données gardées en mémoire.", error.message);
    return true;
  }
}
