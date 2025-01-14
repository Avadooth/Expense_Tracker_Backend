import Expense from "../Models/Expense.js";
import generatePDF from "../utils/generatePDF.js";

const downloadReport = async (req, res) => {
  const { type } = req.query;
  //   const { user } = req.user;

  try {
    const expenses = await Expense.find({ user: req.user });
    console.log("downloadReport_expenses----------->>>", expenses);

    if (type === "pdf") {
      const pdfBuffer = await generatePDF(expenses, req.user);
      res.setHeader("Content-Type", "application/pdf");
      res.send(pdfBuffer);
    } else if (type === "csv") {
      const csvData = await generateCSV(expenses);
      res.setHeader("Content-Type", "text/csv");
      res.attachment("expenses.csv");
      res.send(csvData);
    } else {
      res.status(400).json({ message: "Invalid report type" });
    }
  } catch (error) {
    console.log("downloadReport_error", error);
    res.status(500).json({ message: error.message });
  }
};

export default downloadReport;
