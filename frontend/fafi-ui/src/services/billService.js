import Bill from '../models/Bill.js';

export async function runRecurringBills() {
  try {
    const today = new Date();

    // Get all recurring bills
    const recurringBills = await Bill.find({ recurring: true });

    for (const bill of recurringBills) {
      // Guard: has a bill already been created for this period?
      const existing = await Bill.findOne({
        name: bill.name,
        user: bill.user,
        amount: bill.amount,
        dueDate: {
          $gte: new Date(today.getFullYear(), today.getMonth(), 1),
          $lte: new Date(today.getFullYear(), today.getMonth() + 1, 0)
        }
      });

      if (existing) continue; // Already exists for this month

      // Clone the bill for the next period
      const nextDue = new Date(bill.dueDate);
      nextDue.setMonth(nextDue.getMonth() + 1);

      const newBill = new Bill({
        ...bill.toObject(),
        _id: undefined, // avoid duplicate _id
        dueDate: nextDue,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await newBill.save();
    }

    console.log(`✅ Recurring bills processed at ${today.toISOString()}`);
  } catch (err) {
    console.error('❌ Error running recurring bills:', err.message);
  }
}
