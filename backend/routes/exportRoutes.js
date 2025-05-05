import express from 'express';
import { exportTransactionsXLSX, exportBillsPDF } from '../controllers/exportController.js';

const router = express.Router();

router.get('/xlsx', exportTransactionsXLSX);
router.get('/pdf', exportBillsPDF);

export default router;
