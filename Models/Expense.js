import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
