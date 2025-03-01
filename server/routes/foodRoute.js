import express from "express";
import controller from "../controllers/foodController.js";
import multer from "multer";

const router = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage }); // <- for uploading file images to uploads folder line 8-15

router.post("/add", controller.addProduct);
router.get("/list", controller.fetchProduct);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/paginate/foods", controller.paginatedFood);
router.get("/new", controller.newProduct);
router.put("/update/:id", upload.single("image"), controller.updateFood);

export default router;
