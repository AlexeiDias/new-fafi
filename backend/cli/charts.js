#!/usr/bin/env node
import connectDB from "../config/db.js";
import Transaction from "../models/Transaction.js";
import asciichart from "asciichart";
import chalk from "chalk";

const run = async () => {
  await connectDB();

  const transactions = await Transaction.find();
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const savings = income - expense;

  const data = [income, expense, savings];

  console.clear();
  console.log("📊 " + chalk.cyanBright("Budget vs Actual") + "\n");

  const chart = asciichart.plot(data, { height: 10 });
  console.log(chart);

  console.log(`${chalk.green("Income:")}   $${income}`);
  console.log(`${chalk.red("Expenses:")} $${expense}`);
  console.log(`${chalk.yellow("Savings:")}  $${savings}`);

  process.exit(0);
};

run();
