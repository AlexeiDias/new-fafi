#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";

const run = () => {
  const logPath = path.resolve("logs/test-results.json");

  if (!fs.existsSync(logPath)) {
    console.log("⚠️ No test results found.");
    return process.exit(0);
  }

  const logs = JSON.parse(fs.readFileSync(logPath, "utf-8"));

  console.clear();
  console.log("📜 TEST HISTORY LOGS:\n");

  logs.slice(-10).reverse().forEach((log, index) => {
    const statusColor = log.status === "passed" ? chalk.green : chalk.red;
    console.log(
      `${chalk.cyan(`#${logs.length - index}`)} | ${new Date(log.timestamp).toLocaleString()} | TX: ${log.transactions} | Bills: ${log.bills} | Status: ${statusColor(log.status)}`
    );
  });

  process.exit(0);
};

run();
