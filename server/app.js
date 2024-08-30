import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Importing files
import connectDB from "./config.js";

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
