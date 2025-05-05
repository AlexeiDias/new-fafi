import xlsx from 'xlsx';
import fs from 'fs';
import Transaction from '../models/Transaction.js';

export const importTransactions = async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const transactions = rows.map((row) => ({
      type: row.type.toLowerCase(),
      amount: row.amount,
      category: row.category,
      description: row.description || '',
      date: new Date(row.date),
      person: row.person || 'Alex',
    }));

    await Transaction.insertMany(transactions);
    fs.unlinkSync(filePath);
    res.json({ imported: transactions.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
