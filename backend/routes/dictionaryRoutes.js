import express from 'express';
import { lookupWord } from '../controllers/dictionaryController.js';

const router = express.Router();

router.get('/lookup', lookupWord);

export default router;
