import foodModel from "../models/foodModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
  const { name, price, description, category, image } = req.body;
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
    res.json(200).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { addProduct };
