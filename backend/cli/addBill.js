require('dotenv').config();
const connectDB = require('../config/db');
const Bill = require('../models/Bill');
const { ask } = require('./cliUtils');

(async () => {
  await connectDB();

  const name = await ask('Bill name: ');
  const amount = parseFloat(await ask('Amount: '));
  const dueDate = new Date(await ask('Due Date (YYYY-MM-DD): '));
  const category = await ask('Category: ');
  const person = await ask('Person: ');
  const phone = await ask('Phone (for alerts): ');
  const email = await ask('Email (for alerts): ');
  const notes = await ask('Notes (optional): ');
  const recurring = await ask('Recurring? (none/weekly/monthly/yearly): ');

  const bill = new Bill({
    name,
    amount,
    dueDate,
    category,
    person,
    phone,
    email,
    notes,
    recurring: recurring !== 'none' ? { frequency: recurring, nextDue: dueDate } : null,
  });

  const existing = await Bill.findOne({ 
    name, 
    amount, 
    dueDate: { $gte: new Date(dueDate).setHours(0,0,0,0), $lte: new Date(dueDate).setHours(23,59,59,999) } 
  });
  if (existing) {
    console.log("⚠️ Duplicate bill detected — already exists!");
    process.exit(0);
  }
  

  await bill.save();
  console.log('✅ Bill added!');
  process.exit(0);
})();
