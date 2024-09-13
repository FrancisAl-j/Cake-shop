import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import stripe from "stripe";
import axios from "axios";

// Placing order user
const placeOrder = async (req, res) => {
  const { items, amount, address } = req.body;
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "php",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      currency: "php",
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: 50 * 100,
      quantity: 1,
    });

    // Create PayMongo payment link options
    const options = {
      method: "POST",
      url: "https://api.paymongo.com/v1/links",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${process.env.PAYMONGO_SECRET_KEY}`, // Secure your API key using environment variables
      },
      data: {
        data: {
          attributes: {
            amount: amount * 100, // Amount should be in centavos
            description: "Order payment",
            // Optional: Add your own metadata to identify the order
            metadata: {
              order_id: newOrder._id,
              user_id: req.body.userId,
            },
            redirect: {
              success: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Redirect on payment success
              failed: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Redirect on payment failure
            },
          },
        },
      },
    };

    // Make the API request to PayMongo to create the payment link
    const paymongoResponse = await axios.request(options);

    // Send back the payment link to the frontend
    res.status(201).json({
      orderId: newOrder._id,
      paymentUrl: paymongoResponse.data.data.attributes.checkout_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { placeOrder };
