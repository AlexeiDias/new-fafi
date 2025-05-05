import Transaction from '../models/Transaction.js';

export const getSummaryStats = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    res.json({
      income: totalIncome,
      expenses: totalExpenses,
      balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
