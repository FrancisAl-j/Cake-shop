import foodModel from "../models/foodModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { addProduct };
