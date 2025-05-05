import express from 'express';
import { exportBackup, restoreBackup } from '../controllers/backupController.js';

const router = express.Router();

router.get('/', exportBackup);
router.post('/restore', restoreBackup);

export default router;
