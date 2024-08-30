import foodModel from "../models/foodModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  const image_filename = `${req.file.filename}`;
  try {
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();
    res.status(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all food
const fetchProduct = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { addProduct, fetchProduct };
