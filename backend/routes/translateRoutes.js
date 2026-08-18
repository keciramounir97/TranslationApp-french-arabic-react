import express from 'express';
import { getLanguages, translateText, reverseTranslate, getAudioSpeech } from '../controllers/translateController.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/languages', getLanguages);
router.post('/', optionalAuthenticateToken, translateText);
router.post('/reverse', optionalAuthenticateToken, reverseTranslate);
router.get('/tts', getAudioSpeech);

export default router;
