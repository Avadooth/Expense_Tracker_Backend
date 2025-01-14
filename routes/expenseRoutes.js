import express from "express";
import expenseController from "../controllers/expenseController.js";
const { createExpense, getExpenses, deleteExpense } = expenseController;
import middleWare from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(middleWare);

router.post("/addexpense", middleWare, createExpense);
router.get("/getexpense", middleWare, getExpenses);
router.delete("/deleteExpense", middleWare, deleteExpense);

export default router;
