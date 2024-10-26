import express from "express";
import controller from "../controllers/saleController.js";

const router = express.Router();

router.post("/cakes", controller.saleCakes);

export default router;
