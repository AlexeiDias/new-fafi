import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// ⚠️ Uses local or deployed URL
const BASE_URL = process.env.ALERT_BASE_URL || 'http://localhost:5000';

export const startAlertCron = () => {
  // Every day at 8AM server time
  cron.schedule('0 8 * * *', async () => {
    console.log('⏰ Running scheduled alert check...');

    try {
      const res = await axios.post(`${BASE_URL}/api/alerts/send`);
      console.log(`✅ Alert cron: ${res.data.sent} alert(s) sent`);
    } catch (err) {
      console.error('❌ Alert cron failed:', err.message);
    }
  });
};
