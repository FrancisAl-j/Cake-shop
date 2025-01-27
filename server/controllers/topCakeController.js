import foodModel from "../models/foodModel.js";

// Shows the top 5 top foods
const topProducts = async (req, res) => {
  try {
    const foods = await foodModel.find({ buys: { $gt: 0 } }).sort({ buys: -1 }); // Fetch only products with buys > 0
    const results = foods.slice(0, 5);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { topProducts };
