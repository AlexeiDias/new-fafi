import Bill from '../models/Bill.js';

export const updateRecurringBills = async (req, res) => {
  try {
    const today = new Date();
    const updated = [];

    const recurringBills = await Bill.find({ 'recurring.frequency': { $exists: true } });

    for (const bill of recurringBills) {
      if (bill.recurring.nextDue && bill.recurring.nextDue <= today) {
        const nextDue = new Date(bill.recurring.nextDue);

        switch (bill.recurring.frequency) {
          case 'weekly':
            nextDue.setDate(nextDue.getDate() + 7);
            break;
          case 'monthly':
            nextDue.setMonth(nextDue.getMonth() + 1);
            break;
          case 'yearly':
            nextDue.setFullYear(nextDue.getFullYear() + 1);
            break;
        }

        bill.recurring.nextDue = nextDue;
        bill.dueDate = nextDue;
        await bill.save();
        updated.push(bill);
      }
    }

    res.json({ updated: updated.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
