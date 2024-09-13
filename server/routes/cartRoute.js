import express from "express";
import controller from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, controller.addToCart);

router.post("/remove", authMiddleware, controller.removeFromCart);

router.post("/get", authMiddleware, controller.getCart);

export default router;
