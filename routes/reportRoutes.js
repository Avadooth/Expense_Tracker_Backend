import express from "express";
import downloadReport from "../controllers/reportController.js";
// const { downloadReport } = Report;
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/download", authMiddleware, downloadReport);
export default router;
