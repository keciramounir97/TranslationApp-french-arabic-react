import express from 'express';
import { getHistory, deleteHistoryItem, clearHistory } from '../controllers/historyController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuthenticateToken, getHistory);
router.delete('/:id', optionalAuthenticateToken, deleteHistoryItem);
router.delete('/', optionalAuthenticateToken, clearHistory);

export default router;
