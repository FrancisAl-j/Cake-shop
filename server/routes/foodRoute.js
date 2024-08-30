import express from "express";
import controller from "../controllers/foodController.js";
import multer from "multer";

const router = express.Router();

router.post("/create", controller.addProduct);

export default router;
