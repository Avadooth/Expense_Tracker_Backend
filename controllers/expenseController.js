import Expense from "../Models/Expense.js";

const createExpense = async (req, res) => {
  try {
    const userId = req.user; // Extracted from the authenticated user (after JWT verification)
    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      user: userId, // Make sure the user ID is being added correctly
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { idToDelete } = req.body;
    const userId = req.user; // Extract user from authentication

    const expense = await Expense.findOneAndDelete({
      _id: idToDelete,
      user: userId,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ error: "Expense not found or unauthorized" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default { createExpense, getExpenses, deleteExpense };

// Additional CRUD operations like update and delete can be implemented similarly.
