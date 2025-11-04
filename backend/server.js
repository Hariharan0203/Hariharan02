import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose, { connect } from "mongoose";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import cors from 'cors';
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



const app = express();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors())


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Api endpoints

app.use('/api/user',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get("/", (req, res) => {
  res.send("Hello from Node.js backend!");
});

// Start server with PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
