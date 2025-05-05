import express from 'express';
import { sendDueAlerts } from '../controllers/alertController.js';
const router = express.Router();

router.post('/send', sendDueAlerts);

export default router;
