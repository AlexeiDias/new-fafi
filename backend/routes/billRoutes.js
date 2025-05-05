import express from 'express';
import {
  getBills,
  createBill,
  updateBill,
  updateRecurringBills,
  deleteBill,
} from '../controllers/billController.js';
import Bill from '../models/Bill.js';
import { runRecurringBills } from '../services/runRecurringBills.js';

const router = express.Router();

// 🧠 Monthly-filtered GET (overriding default getBills)
router.get('/', async (req, res) => {
  const { month, year, recurring } = req.query;
  const m = parseInt(month);
  const y = parseInt(year);

  const filter = {};

  // 📅 Month/Year filter
  if (m && y) {
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);
    filter.dueDate = { $gte: start, $lt: end };
  }

  // 🔁 Recurring toggle
  if (recurring === 'true') {
    filter['recurring.frequency'] = { $exists: true };
  }

  try {
    const bills = await Bill.find(filter);
    res.json(bills);
  } catch (err) {
    console.error('❌ Error fetching bills:', err.message);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});

// ➕ Create
router.post('/', createBill);

// 🔁 Update + Delete by ID
router.route('/:id')
  .put(updateBill)
  .delete(deleteBill);

// 🗓️ Drag-n-drop reschedule
router.put('/reschedule/:id', async (req, res) => {
  const { dueDate } = req.body;

  if (!dueDate) {
    return res.status(400).json({ error: 'Missing dueDate in request body' });
  }

  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { dueDate },
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json({ success: true, bill });
  } catch (err) {
    console.error('❌ Failed to reschedule bill:', err.message);
    res.status(500).json({ error: 'Failed to update due date' });
  }
});

// 🧪 Manual endpoint to trigger recurring bills
router.post('/run-recurring', async (req, res) => {
  await runRecurringBills();
  res.send({ message: 'Recurring bills processed' });
});

export default router;
