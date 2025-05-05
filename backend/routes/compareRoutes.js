import express from 'express';
import Bill from '../models/Bill.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { month, year } = req.query;
    const m = parseInt(month); // 1-12
    const y = parseInt(year);
  
    try {
      const bills = await Bill.find().lean();
      const transactions = await Transaction.find().lean();
  
      const categoryTotals = {};
  
      bills.forEach(bill => {
        const date = new Date(bill.dueDate);
        if (m && y && (date.getMonth() + 1 !== m || date.getFullYear() !== y)) return;
  
        const cat = bill.category || 'Uncategorized';
        categoryTotals[cat] = categoryTotals[cat] || { planned: 0, actual: 0 };
        categoryTotals[cat].planned += bill.amount;
      });
  
      transactions.forEach(tx => {
        const date = new Date(tx.date);
        if (m && y && (date.getMonth() + 1 !== m || date.getFullYear() !== y)) return;
  
        const cat = tx.category || 'Uncategorized';
        categoryTotals[cat] = categoryTotals[cat] || { planned: 0, actual: 0 };
        if (tx.type === 'expense') {
          categoryTotals[cat].actual += tx.amount;
        }
      });
  
      res.json(categoryTotals);
    } catch (err) {
      console.error('❌ Comparison error:', err.message);
      res.status(500).json({ error: 'Failed to filter comparison data' });
    }
  });
  
export default router;
