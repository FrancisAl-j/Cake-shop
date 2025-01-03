import express from "express";
import controller from "../controllers/saleController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, controller.addSaleCakes);
router.post("/remove", authMiddleware, controller.removeSaleCakes);
router.get("/get", authMiddleware, controller.fetchSaleCakes);
router.post("/create", authMiddleware, controller.createSale);

router.get("/all", controller.getAllSales);

export default router;
