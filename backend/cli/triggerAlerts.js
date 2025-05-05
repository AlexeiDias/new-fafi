require('dotenv').config();
const connectDB = require('../config/db');
const { runAlertCheck } = require('../utils/alertScheduler');

(async () => {
  await connectDB();
  await runAlertCheck();
  console.log('📡 Alert scan complete.');
  process.exit(0);
})();
