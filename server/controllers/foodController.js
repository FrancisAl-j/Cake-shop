import foodModel from "../models/foodModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
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

// delete specific food
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const paginatedFood = async (req, res) => {
  const { query } = req.query; // Query to use for searching on foods
  const searchQuery = query ? String(query) : ""; // Checks if he query is empty if it's empty it will display all the foods
  try {
    const page = parseInt(req.query.page); // Query the the current page of the food
    const limit = parseInt(req.query.limit); // limit the food display in the web app

    let foods;
    if (searchQuery) {
      foods = await foodModel.find({ name: { $regex: query, $options: "i" } });
    } else {
      foods = await foodModel.find();
    }

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalFoods = foods.length;
    results.pageCount = Math.ceil(foods.length / limit);

    if (lastIndex < foods.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
      };
    }

    const result = foods.slice(startIndex, lastIndex);

    res.status(200).json({ results, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Display new food or product
const newProduct = async (req, res) => {
  const currentDate = new Date();
  const weekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
  try {
    const foods = await foodModel.find();

    const newFoods = foods.filter((food) => {
      return new Date(food.createdAt) >= weekAgo;
    });

    res.status(200).json(newFoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updating the foods
const updateFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  const image_filename = `${req.file.filename}`;
  try {
    const existingProduct = await foodModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    const updatedData = {
      name,
      price,
      description,
      category,
      image: req.file ? req.file.filename : existingProduct.image,
    };
    const product = await foodModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  addProduct,
  fetchProduct,
  deleteProduct,
  paginatedFood,
  newProduct,
  updateFood,
};
