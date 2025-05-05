const fs = require("fs");
const connectDB = require("../config/db");
const Transaction = require("../models/Transaction");
const Bill = require("../models/Bill");

(async () => {
  await connectDB();
  const tx = await Transaction.find();
  const bills = await Bill.find();

  fs.writeFileSync("backup.json", JSON.stringify({ transactions: tx, bills }, null, 2));
  console.log("✅ Backup saved to backup.json");
  process.exit(0);
})();
