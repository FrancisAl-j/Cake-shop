import express from "express";
import controller from "../controllers/topCakeController.js";

const router = express.Router();

router.get("/foods", controller.topProducts);

export default router;
