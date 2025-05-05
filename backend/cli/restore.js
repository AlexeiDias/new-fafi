const fs = require("fs");
const connectDB = require("../config/db");
const Transaction = require("../models/Transaction");
const Bill = require("../models/Bill");

(async () => {
  await connectDB();
  const data = JSON.parse(fs.readFileSync("backup.json"));
  await Transaction.deleteMany({});
  await Bill.deleteMany({});
  await Transaction.insertMany(data.transactions);
  await Bill.insertMany(data.bills);
  console.log("✅ Backup restored");
  process.exit(0);
})();
