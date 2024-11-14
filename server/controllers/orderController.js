import dotenv from "dotenv";
dotenv.config();
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import axios from "axios";
import nodemailer from "nodemailer";

/* const emailReceipt = {
  from: "Cake Shop Staff, staff@CakeShop@gmail.com",
  to: user.email,
  subject: "E-receipt",
  text: `Hello ${user.name}, This is your payment receipt`, // Plain text fallback
  html: `Hello <strong>${user.name}</strong>,<br><br>Receipt<br><br>
      <ul>
        <li></li>
      </ul>`,
}; */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kikobilas123@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmailReceipt = async (orderId, userEmail, amount, lineItems) => {
  let mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Receipt for Your Order",
    html: `
      <h2>Receipt for Order ${orderId}</h2>
      <p><strong>Total Amount:</strong> ${amount} PHP</p>
      <h3>Line Items:</h3>
      <ul>
        ${lineItems
          .map(
            (item) => `<li>${item.name} - ${item.price * item.quantity}</li>`
          )
          .join("")}
      </ul>
      <p>Thank you for your purchase!</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.response}`);
};

const sendEmailOutForDelivery = async (orderId, userEmail) => {
  const mailOptions = {
    from: "cakeshop@gmail.com",
    to: userEmail,
    subject: "Status Of Order",
    html: `<h1>Status of order</h1> </br></br>
         <h3>Order ID : ${orderId}</h3>
         <p>Your order is out for delivery</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const deliveredEmail = async (orderId, userEmail) => {
  const mailOptions = {
    from: "cakeshop@gmail.com",
    to: userEmail,
    subject: "Order Delivered",
    html: `<h1>Your order has been delivered</h1>
          <h3>Your order ID: ${orderId}</h3>
          <p>Thank you for purchasing</p>
    `,
  };

  transporter.sendMail(mailOptions);
};

// Placing order user (Check out using paymongo)
const placeOrder = async (req, res) => {
  const { items, amount, address } = req.body;
  const frontend_url = "http://localhost:5174";
  const PAYMONGO_SECRET_KEY = Buffer.from(
    `${process.env.PAYMONGO_SECRET_KEY}:`
  ).toString("base64"); // Turn the secret key to base64

  try {
    const userId = req.body.userId;
    const newOrder = new Order({
      userId: req.body.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    for (const item of req.body.items) {
      await foodModel.findByIdAndUpdate(
        item._id,
        { $inc: { buys: item.quantity } }, //$inc means increment
        { new: true }
      );
    }

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
    const user = await User.findById(req.body.userId);
    const order = await Order.findById(orderId);
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(req.body.userId, { cartData: {} });
      await sendEmailReceipt(order._id, user.email, order.amount, order.items);
      console.log("Successfully sent a receipt");

      res.status(200).json({ message: "Paid" });
    } else if (success === "false") {
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      console.log("Receipt didn't send");

      if (deletedOrder) {
        res
          .status(200)
          .json({ message: "Order deleted, payment not successful" });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid success value" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users order
const userOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetching orders of all user, Admin side
const fetchUserOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.body.orderId, { status });
    const userId = order.userId;
    const user = await User.findById(userId);

    const updatedOrder = await Order.findById(order._id);
    if (updatedOrder.status === "Out for delivery") {
      try {
        await sendEmailOutForDelivery(updatedOrder._id, user.email);
        console.log("Successfully sent email!");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    } else if (updatedOrder.status === "Delivered") {
      try {
        await deliveredEmail(updatedOrder._id, user.email);
        console.log("Successfully sent email!");
      } catch (error) {
        console.log(`Failed to send email`);
      }
    }
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

// For Dashboard
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    const allCustomersOrder = orders.length;

    res.status(200).json(allCustomersOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Order Cash On Deliver "COD"
const orderCOD = async (req, res) => {
  const { items, amount, address } = req.body;
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items,
      amount,
      address,
      paymentMethod: "Cash on delivery",
    });

    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    await newOrder.save();

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  placeOrder,
  verifyOrder,
  userOrder,
  fetchUserOrders,
  updateStatus,
  cancelOrder,
  allOrders,
  orderCOD,
};
