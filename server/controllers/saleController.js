import foodModel from "../models/foodModel.js";
import Admin from "../models/adminModel.js";
import Sale from "../models/saleModel.js";

// Admin side
const addSaleCakes = async (req, res) => {
  const { itemId } = req.body;
  try {
    const user = await Admin.findById(req.body.userId);

    const salesData = await user.salesData;

    if (!salesData[itemId]) {
      salesData[itemId] = 1;
    } else {
      return res.json({ message: "Product already on Sale." });
    }

    await Admin.findByIdAndUpdate(req.body.userId, { salesData });

    res.status(200).json({ message: "Added to sale." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSaleCakes = async (req, res) => {
  const { itemId } = req.body;
  try {
    const user = await Admin.findById(req.body.userId);
    const salesData = user.salesData;

    if (salesData[itemId] > 0) {
      salesData[itemId] -= 1;
    }

    await Admin.findByIdAndUpdate(req.body.userId, { salesData });
    res.status(200).json({ message: "Remove from sales" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchSaleCakes = async (req, res) => {
  try {
    const admin = await Admin.findById(req.body.userId);
    //console.log(admin);

    const salesData = await admin.salesData;

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSale = async (req, res) => {
  const { products, date, saleRate } = req.body;
  try {
    const today = new Date();
    today.setDate(today.getDate() + date);
    const admin = await Admin.findById(req.body.userId);
    if (!admin) {
      return res.status(401).json({ message: "Not authenticated!" });
    }
    const newSale = new Sale({
      products,
      date: today,
      saleRate,
    });

    await newSale.save();

    await Admin.findByIdAndUpdate(req.body.userId, { salesData: {} });

    res.status(200).json(newSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Client side (Fetching)

export default { addSaleCakes, removeSaleCakes, fetchSaleCakes, createSale };
