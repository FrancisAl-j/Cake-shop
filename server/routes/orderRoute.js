import express from "express";
import controller from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, controller.placeOrder);
router.post("/verify", controller.verifyOrder);
router.get("/userorders", authMiddleware, controller.userOrder);

// Admin side
router.get("/list", controller.fetchUserOrders);

export default router;
