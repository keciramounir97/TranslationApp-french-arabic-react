import axios from 'axios';
import { readDb } from '../data/db.js';

export const lookupWord = async (req, res) => {
  try {
    const { word, lang = 'en' } = req.query;

    if (!word || !word.trim()) {
      return res.status(400).json({ message: 'Veuillez fournir un mot à chercher.' });
    }

    const cleanWord = word.trim().toLowerCase();

    // 1. Recherche via API publique de dictionnaire (ex: Free Dictionary API pour l'anglais)
    if (lang === 'en') {
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`, { timeout: 4000 });
        if (response.data && response.data.length > 0) {
          const item = response.data[0];
          return res.json({
            word: item.word,
            phonetic: item.phonetic || (item.phonetics && item.phonetics[0] ? item.phonetics[0].text : ''),
            meanings: item.meanings || []
          });
        }
      } catch (err) {
        // Fallback local en cas de non-trouvé ou erreur réseau
      }
    }

    // 2. Recherche dans le dictionnaire local JSON
    const db = readDb();
    if (db.dictionary && db.dictionary[cleanWord]) {
      return res.json(db.dictionary[cleanWord]);
    }

    // 3. Réponse générique si le mot n'est pas dans la base
    res.json({
      word: cleanWord,
      phonetic: `/${cleanWord}/`,
      meanings: [
        {
          partOfSpeech: "mot",
          definitions: [
            { definition: `Définition pour "${cleanWord}" : Mot recherché dans le dictionnaire interactif.`, example: `Exemple d'utilisation avec ${cleanWord}.` }
          ]
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche dans le dictionnaire.' });
  }
};
