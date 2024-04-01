import { Router } from "express";
const router = Router();
import { uploadProduct, getProducts } from "../controllers/product.js";
import uploadproductSchema from "../validations/uploadproduct.js";
import validateSchema from "../middlewares/validation.js";
import { authenticateUser } from "../middlewares/authmiddlware.js";
import uploadfile from "../middlewares/fileupload.js";
import uploadmulterconfig from "../services/multerservice.js";

router.post(
  "/",
  authenticateUser,
  uploadmulterconfig.single("image"),
  //uploadfile.single("image"),
  validateSchema(uploadproductSchema),
  uploadProduct
);

router.get("/", getProducts);

export default router;
