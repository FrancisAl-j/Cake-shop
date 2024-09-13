import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Importing files
import connectDB from "./config.js";
import foodRoute from "./routes/foodRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Endpoints
app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);

  connectDB();
});
