import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoritesController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuthenticateToken, getFavorites);
router.post('/', optionalAuthenticateToken, addFavorite);
router.delete('/:id', optionalAuthenticateToken, removeFavorite);

export default router;
