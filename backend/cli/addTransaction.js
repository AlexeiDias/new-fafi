require('dotenv').config();
const connectDB = require('../config/db');
const Transaction = require('../models/Transaction');
const { ask } = require('./cliUtils');

(async () => {
  await connectDB();

  const type = await ask('Type (income/expense): ');
  const amount = parseFloat(await ask('Amount: '));
  const category = await ask('Category: ');
  const date = await ask('Date (YYYY-MM-DD) or leave blank: ');
  const description = await ask('Description: ');
  const person = await ask('Person: ');

  const tx = new Transaction({
    type,
    amount,
    category,
    date: date ? new Date(date) : new Date(),
    description,
    person,
  });

  await tx.save();
  console.log('✅ Transaction saved!');
  process.exit(0);
})();
