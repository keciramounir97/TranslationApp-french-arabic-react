import { readDb, writeDb } from '../data/db.js';

export const getHistory = (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'guest';
    const db = readDb();
    const userHistory = db.history.filter(h => h.userId === userId || userId === 'guest');
    res.json({ history: userHistory });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique.' });
  }
};

export const deleteHistoryItem = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user.id : 'guest';
    const db = readDb();

    db.history = db.history.filter(h => !(h.id === id && (h.userId === userId || userId === 'guest')));
    writeDb(db);

    res.json({ message: 'Élément d\'historique supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'élément.' });
  }
};

export const clearHistory = (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'guest';
    const db = readDb();

    db.history = db.history.filter(h => h.userId !== userId && userId !== 'guest');
    writeDb(db);

    res.json({ message: 'Historique effacé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du nettoyage de l\'historique.' });
  }
};
