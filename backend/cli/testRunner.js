#!/usr/bin/env node
import connectDB from '../config/db.js';
import Transaction from '../models/Transaction.js';
import Bill from '../models/Bill.js';

import fs from "fs";
import path from "path";

const run = async () => {
  await connectDB();

  console.log("🧪 Starting CLI Function Test...");

  await Transaction.deleteMany({});
  await Bill.deleteMany({});

  const tx1 = new Transaction({ type: "income", amount: 3000, category: "Salary", person: "Alex" });
  const tx2 = new Transaction({ type: "expense", amount: 1000, category: "Rent", person: "Alex" });
  const bill = new Bill({
    name: "Internet",
    amount: 80,
    dueDate: new Date(),
    category: "Utilities",
    person: "Alex",
    recurring: { frequency: "monthly", nextDue: new Date() }
  });

  await tx1.save();
  await tx2.save();
  await bill.save();

  const txs = await Transaction.find();
  const bills = await Bill.find();

  const result = {
    timestamp: new Date().toISOString(),
    transactions: txs.length,
    bills: bills.length,
    status: txs.length >= 2 && bills.length >= 1 ? "passed" : "failed"
  };

  const logPath = path.resolve("cli/logs/test-results.json");

  let previous = [];
  try {
    if (fs.existsSync(logPath)) {
      previous = JSON.parse(fs.readFileSync(logPath, "utf-8"));
    }
  } catch (e) {
    console.warn("⚠️ Failed to read existing log file, starting fresh.");
  }

  previous.push(result);
  fs.writeFileSync(logPath, JSON.stringify(previous, null, 2));

  console.log(`\n✅ Test ${result.status.toUpperCase()}`);
  console.log(`🗂️ Results saved to: ${logPath}`);

  process.exit(0);
};

run();
