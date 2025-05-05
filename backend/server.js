// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import connectDB from './config/db.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import backupRoutes from './routes/backupRoutes.js';
import billRoutes from './routes/billRoutes.js';
import importRoutes from './routes/importRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import compareRoutes from './routes/compareRoutes.js';
import { runRecurringBills } from './services/runRecurringBills.js'; // ✅ Only source

dotenv.config();
const app = express();
await connectDB();

// 🧱 Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 🔌 Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/backup', backupRoutes);
app.use('/api/import', importRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/ask', aiRoutes);
app.use('/api/compare', compareRoutes);

// ✅ Health checks
app.get('/ping', (req, res) => res.json({ status: 'ok' }));
app.get('/', (req, res) => res.send('👋 FAFI API is live!'));

// 🕛 Cron Job – Once a day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('🕛 [CRON] Running scheduled recurring bills');
  await runRecurringBills();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 MongoDB connected`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
