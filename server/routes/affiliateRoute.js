import express from "express";
import controller from "../controllers/affiliateController.js";

const router = express.Router();

router.post("/signup", controller.affiliateSignUp); // Sign up/Registration of account

export default router;
