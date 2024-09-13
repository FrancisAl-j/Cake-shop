import express from "express";
import controller from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, controller.placeOrder);

export default router;
