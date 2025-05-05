import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Transaction from './models/Transaction.js';

dotenv.config();
await connectDB();

const seedData = [
  {
    type: 'income',
    amount: 5000,
    category: 'Salary',
    description: 'Monthly salary',
    person: 'Alex',
  },
  {
    type: 'expense',
    amount: 1200,
    category: 'Rent',
    description: 'April rent',
    person: 'Alex',
  },
  {
    type: 'expense',
    amount: 250,
    category: 'Groceries',
    person: 'John',
  },
  {
    type: 'income',
    amount: 1500,
    category: 'Freelance',
    person: 'John',
  },
];

try {
  await Transaction.deleteMany();
  await Transaction.insertMany(seedData);
  console.log('✅ Transaction seed data inserted');
  process.exit(0);
} catch (err) {
  console.error('❌ Seed failed:', err);
  process.exit(1);
}
