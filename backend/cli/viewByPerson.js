require("dotenv").config();
const connectDB = require("../config/db");
const Transaction = require("../models/Transaction");
const { ask } = require("./cliUtils");

module.exports = async () => {
  await connectDB();

  const person = await ask("Filter transactions for: ");
  const txs = await Transaction.find({ person: new RegExp(person, "i") });

  console.log(`🧾 Transactions for ${person}`);
  txs.forEach(t => console.log(`- [${t.type}] $${t.amount} | ${t.category} | ${t.date.toDateString()}`));
  process.exit(0);
};
