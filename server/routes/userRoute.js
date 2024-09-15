import express from "express";
import controller from "../controllers/userController.js";

const router = express.Router();

router.post("/register", controller.registerUser);

router.post("/login", controller.userLogin);

router.put("/verify/:token", controller.verifyToken);

export default router;
