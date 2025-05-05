require('dotenv').config();
const connectDB = require('../config/db');
const Bill = require('../models/Bill');

(async () => {
  await connectDB();

  const today = new Date();
  const thisWeek = new Date();
  thisWeek.setDate(today.getDate() + 7);

  const todayBills = await Bill.find({
    dueDate: { $eq: today.toISOString().split('T')[0] }
  });

  const weekBills = await Bill.find({
    dueDate: { $gte: today, $lte: thisWeek }
  });

  console.log('🔴 Bills Due Today:');
  todayBills.forEach(b => console.log(`- ${b.name}: $${b.amount}`));

  console.log('\n🟠 Bills Due This Week:');
  weekBills.forEach(b => console.log(`- ${b.name} on ${b.dueDate.toDateString()}: $${b.amount}`));

  process.exit(0);
})();
