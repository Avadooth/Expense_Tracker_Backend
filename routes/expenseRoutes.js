import express from "express"
import expenseController from "../controllers/expenseController.js"
const { createExpense, getExpenses } = expenseController
import middleWare from "../middlewares/authMiddleware.js"

const router = express.Router();
router.use(middleWare);

router.post("/addexpense",middleWare, createExpense);
router.get("/getexpense",middleWare, getExpenses);

export default router