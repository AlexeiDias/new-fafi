import express from 'express';
import multer from 'multer';
import { importTransactions } from '../controllers/importController.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/transactions', upload.single('file'), importTransactions);

export default router;
