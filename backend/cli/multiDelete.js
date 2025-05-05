#!/usr/bin/env node
import inquirer from "inquirer";
import connectDB from "../config/db.js";
import Transaction from "../models/Transaction.js";

const run = async () => {
  await connectDB();
  const txs = await Transaction.find();

  const { selections } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selections",
      message: "Select transactions to delete:",
      choices: txs.map(tx => ({
        name: `[${tx.type}] $${tx.amount} - ${tx.category}`,
        value: tx._id.toString()
      })),
    },
  ]);

  if (selections.length === 0) return console.log("No items selected."), process.exit(0);

  await Transaction.deleteMany({ _id: { $in: selections } });
  console.log("✅ Selected transactions deleted.");
  process.exit(0);
};

run();
