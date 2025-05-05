import express from 'express';
import Transaction from '../models/Transaction.js';
import Bill from '../models/Bill.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const bills = await Bill.find();

    const suggestions = [];

    // 🔎 Duplicate detection
    const seen = new Set();
    for (const tx of transactions) {
      const key = `${tx.amount}_${tx.category}_${tx.person}`;
      if (seen.has(key)) {
        suggestions.push({
          type: 'duplicate',
          message: `⚠️ Possible duplicate: ${tx.category} $${tx.amount} by ${tx.person}`,
        });
      } else {
        seen.add(key);
      }
    }

    // 💰 Overspending
    const categorySpend = {};
    transactions.forEach(tx => {
      if (tx.type === 'expense') {
        categorySpend[tx.category] = (categorySpend[tx.category] || 0) + tx.amount;
      }
    });
    for (const [cat, amount] of Object.entries(categorySpend)) {
      if (amount > 1000) {
        suggestions.push({
          type: 'overspend',
          message: `💸 High spending in ${cat}: $${amount}`,
        });
      }
    }

    // 🧠 Forecast check
    const incomeTotal = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const billTotal = bills.reduce((sum, b) => sum + b.amount, 0);

    if (billTotal > incomeTotal) {
      suggestions.push({
        type: 'forecast',
        message: `🔮 Warning: Bills ($${billTotal}) exceed income ($${incomeTotal})`,
      });
    }

    res.json({ suggestions });
  } catch (err) {
    console.error('❌ Suggestion engine failed:', err.message);
    res.status(500).json({ error: 'Failed to analyze suggestions' });
  }
});

export default router;
