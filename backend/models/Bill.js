import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Bill name is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [1, "Amount must be greater than 0"],
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
  category: {
    type: String,
    default: "Other",
  },
  person: {
    type: String,
    required: [true, "Family member is required"],
  },
  phone: String,
  email: String,
  notes: String,
  recurring: {
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "yearly"],
    },
    nextDue: Date,
  },
  lastAlertedAt: Date,
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
