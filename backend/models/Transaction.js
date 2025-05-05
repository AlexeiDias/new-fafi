import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be greater than 0'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  person: {
    type: String,
    required: [true, 'Person name is required'],
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
