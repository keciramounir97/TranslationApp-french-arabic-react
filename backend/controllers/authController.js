import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDb, writeDb } from '../data/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_google_trad_app_2026';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires (nom, email, mot de passe).' });
    }

    const db = readDb();
    const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà associé à un compte.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDb(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Compte créé avec succès !',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur interne du serveur lors de l\'inscription.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Veuillez saisir votre email et votre mot de passe.' });
    }

    const db = readDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(400).json({ message: 'Identifiants incorrects.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants incorrects.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Connexion réussie !',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};

export const getMe = (req, res) => {
  try {
    const db = readDb();
    let user = db.users.find(u => u.id === req.user?.id || (u.email && req.user?.email && u.email.toLowerCase() === req.user.email.toLowerCase()));

    // Fallback si l'instance serverless n'a pas encore synchronisé le fichier store.json
    if (!user && req.user && (req.user.id || req.user.email)) {
      user = {
        id: req.user.id || 'usr_guest',
        name: req.user.name || 'Utilisateur',
        email: req.user.email || '',
        createdAt: new Date().toISOString()
      };
    }

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des données utilisateur.' });
  }
};
