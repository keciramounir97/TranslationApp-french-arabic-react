import { readDb, writeDb } from '../data/db.js';

export const getFavorites = (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'guest';
    const db = readDb();
    const userFavorites = db.favorites.filter(f => f.userId === userId || userId === 'guest');
    res.json({ favorites: userFavorites });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des favoris.' });
  }
};

export const addFavorite = (req, res) => {
  try {
    const { sourceText, translatedText, from, to } = req.body;
    const userId = req.user ? req.user.id : 'guest';

    if (!sourceText || !translatedText) {
      return res.status(400).json({ message: 'Texte source et texte traduit requis.' });
    }

    const db = readDb();
    const existing = db.favorites.find(
      f => f.userId === userId && f.sourceText === sourceText && f.from === from && f.to === to
    );

    if (existing) {
      return res.json({ message: 'Cette traduction est déjà enregistrée dans vos favoris.', favorite: existing });
    }

    const newFav = {
      id: 'fav_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      userId,
      sourceText,
      translatedText,
      from,
      to,
      timestamp: new Date().toISOString()
    };

    db.favorites.unshift(newFav);
    writeDb(db);

    res.status(201).json({ message: 'Traduction ajoutée aux favoris !', favorite: newFav });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout aux favoris.' });
  }
};

export const removeFavorite = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : 'guest';
    const db = readDb();

    db.favorites = db.favorites.filter(f => !(f.id === id && (f.userId === userId || userId === 'guest')));
    writeDb(db);

    res.json({ message: 'Favori retiré avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du favori.' });
  }
};
