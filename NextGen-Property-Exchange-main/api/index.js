import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3120;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "INTERNAL SERVER ERROR";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

const MONGO_URI = "mongodb+srv://real:real@real.5ewanta.mongodb.net/?retryWrites=true&w=majority&appName=real";
// MongoDB connection
mongoose.set("strictQuery", true); // optional, recommended for new Mongoose versions
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.error("❌ Failed to connect with MongoDB -->", err.message);
  console.error("Full error:", err);
  process.exit(1); // exit app if DB connection fails
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
