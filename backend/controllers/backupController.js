import Bill from '../models/Bill.js';
import Transaction from '../models/Transaction.js';

export const exportBackup = async (req, res) => {
  const transactions = await Transaction.find();
  const bills = await Bill.find();
  const backup = { transactions, bills };
  res.setHeader("Content-Disposition", "attachment; filename=backup.json");
  res.json(backup);
};

export const restoreBackup = async (req, res) => {
  const { transactions, bills } = req.body;
  await Transaction.deleteMany();
  await Bill.deleteMany();
  await Transaction.insertMany(transactions);
  await Bill.insertMany(bills);
  res.json({ status: "Restored" });
};
