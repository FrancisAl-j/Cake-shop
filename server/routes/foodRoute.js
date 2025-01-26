import express from "express";
import controller from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Image storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads folder exists before saving the file
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); // <- for uploading file images to uploads folder line 8-15

router.post("/add", upload.single("image"), controller.addProduct);
router.get("/list", controller.fetchProduct);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/paginate/foods", controller.paginatedFood);
router.get("/new", controller.newProduct);
router.put("/update/:id", upload.single("image"), controller.updateFood);

export default router;
