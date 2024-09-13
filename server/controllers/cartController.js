import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    // Checks if the user has token
    const user = await User.findById(req.body.userId);

    // Get the cartData of users to store the food/product " Can be use to add to favorite or add to cart "
    const cartData = await user.cartData;

    // the if checks if the item exist in the cartData if it is not existing then it is equals to 1 if it is existing in the cart the increment the food or product to 1
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Update and finding the User using "id" then updating the cartData
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ message: "Added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    // Checks if the user has token
    const users = await User.findById(req.body.userId);

    // Get the cartData of users to store the food/product " Can be use to add to favorite or add to cart "
    const cartData = await users.cartData;

    // Checks if the cartData is greater than 0 meaning that the user had that food then if he has it and wants to remove it then minus 1
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    // Find the user by id then updates the cartData in this case by removing the food or product from the cart
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ message: "Remove to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const users = await User.findById(req.body.userId);
    const cartData = await users.cartData;

    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { addToCart, removeFromCart, getCart };
