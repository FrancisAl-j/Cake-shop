import express from "express";
import controller from "../controllers/foodController.js";
import multer from "multer";

const router = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Data.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); // <- for uploading file images to uploads folder line 8-15

router.post("/add", upload.single("image"), controller.addProduct);

export default router;
