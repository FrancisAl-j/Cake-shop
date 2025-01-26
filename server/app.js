import dotenv from "dotenv";
dotenv.config();

import express from "express";

import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importing files
import connectDB from "./config.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import topCakeRoute from "./routes/topCakeRoute.js";
import saleRoute from "./routes/saleRoute.js";
import affiliateRoute from "./routes/affiliateRoute.js";
import salesRoute from "./routes/saleRoute.js";

import { checkDate } from "./checkDate.js";

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://cake-shop-dgvz.onrender.com",
        "https://cake-shop-admin-41ty.onrender.com",
      ];

      // Allow requests with no origin (like Postman or server-to-server calls)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Endpoints
app.use("/api/food", foodRoute);
app.use("/images", express.static(path.join(__dirname, "../uploads")));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/top", topCakeRoute);
app.use("/api/sales", saleRoute);
app.use("/api/affiliate", affiliateRoute);
app.use("/api/sales", salesRoute);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
