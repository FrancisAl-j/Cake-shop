import foodModel from "../models/foodModel.js";

// Admin side
const saleCakes = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Client side (Fetching)

export default { saleCakes };
