// services/runRecurringBills.js
import Bill from '../models/Bill.js';
import dayjs from 'dayjs';

const advanceDate = (date, frequency) => {
  switch (frequency) {
    case 'weekly': return dayjs(date).add(1, 'week').toDate();
    case 'monthly': return dayjs(date).add(1, 'month').toDate();
    case 'yearly': return dayjs(date).add(1, 'year').toDate();
    default: return null;
  }
};

export async function runRecurringBills() {
  const now = new Date();
  const bills = await Bill.find({
    'recurring.frequency': { $in: ['weekly', 'monthly', 'yearly'] },
    'recurring.nextDue': { $lte: now },
  });

  for (const bill of bills) {
    const newBill = new Bill({
      ...bill.toObject(),
      dueDate: bill.recurring.nextDue,
      _id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      recurring: bill.recurring,
    });

    await newBill.save();

    bill.recurring.nextDue = advanceDate(bill.recurring.nextDue, bill.recurring.frequency);
    await bill.save();
  }

  console.log(`✅ Processed ${bills.length} recurring bills`);
}
