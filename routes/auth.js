import { Router } from "express";
const router = Router();
import { signup, login } from "../controllers/auth.js";
import validateSchema from "../middlewares/validation.js";
import signupSchema from "../validations/signup.js";
import loginSchema from "../validations/login.js";

router.post("/signup", validateSchema(signupSchema), signup);
router.post("/login", validateSchema(loginSchema), login);

export default router;
