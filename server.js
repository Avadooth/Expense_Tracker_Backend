import express from "express";
import dotenv from "dotenv";  // Only import dotenv once
import cors from "cors";
import connectDB from "./config/db.js";
import auth from "./routes/authRoutes.js";
import expense from "./routes/expenseRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware for CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials if necessary
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", auth);
app.use("/api/expense",expense)
app.use('/api/reports', reportRoutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
