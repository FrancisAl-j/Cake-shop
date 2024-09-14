import dotenv from "dotenv";
dotenv.config();
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import axios from "axios";

// Placing order user (Check out using paymongo)
const placeOrder = async (req, res) => {
  const { items, amount, address } = req.body;
  const frontend_url = "http://localhost:5174";
  const PAYMONGO_SECRET_KEY = Buffer.from(
    `${process.env.PAYMONGO_SECRET_KEY}:`
  ).toString("base64");

  try {
    const userId = req.body.userId;
    const newOrder = new Order({
      userId: req.body.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      currency: "PHP",
      name: item.name,
      amount: item.price * 100,
      quantity: item.quantity,
    }));

    line_items.push({
      currency: "PHP",
      name: "Delivery Charges",
      amount: 50 * 100,
      quantity: 1,
    });

    const metadata = {
      order_id: newOrder._id.toString(), // Ensure ID is a string
      user_id: userId.toString(), // Ensure ID is a string
      items: items.map((item) => ({
        product_id: item._id.toString(), // Ensure ID is a string
        quantity: item.quantity,
      })),
    };

    // Create PayMongo payment link options
    const options = {
      method: "POST",
      url: "https://api.paymongo.com/v1/checkout_sessions",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Basic ${PAYMONGO_SECRET_KEY}`, // Secure your API key using environment variables
      },
      data: {
        data: {
          attributes: {
            line_items, // Include line items properly
            payment_method_types: ["gcash"],
            amount: amount * 100, // Amount in centavos
            description: "Order payment",
            metadata: metadata,
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Redirect on payment success
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Redirect on payment failure
            send_email_receipt: false, // Optional: Disable sending email receipts
            show_description: true, // Optional: Show description
            show_line_items: true, // Optional: Show line items
          },
        },
      },
    };

    // Make the API request to PayMongo to create the checkout session
    const paymongoResponse = await axios.request(options);
    //console.log("PayMongo Response:", paymongoResponse.data);
    // Send back the checkout URL to the frontend
    res.status(201).json({
      orderId: newOrder._id,
      checkoutUrl: paymongoResponse.data.data.attributes.checkout_url,
    });
  } catch (error) {
    console.error(
      "Error in placeOrder:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(201).json({ message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ message: "Not paid" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { placeOrder, verifyOrder };
