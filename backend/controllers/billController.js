import Bill from '../models/Bill.js';

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ dueDate: 1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBill = async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

