import express from "express";
import controller from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, controller.placeOrder);
router.post("/verify", authMiddleware, controller.verifyOrder);
router.get("/userorders", authMiddleware, controller.userOrder);
router.post("/COD", authMiddleware, controller.orderCOD);

// Admin side
router.get("/list", controller.fetchUserOrders);
router.put("/status", controller.updateStatus);
router.delete("/delete/:id", controller.cancelOrder);
router.get("/all-orders", controller.allOrders);
router.get("/receipt/:id", controller.orderReceipt);

export default router;
