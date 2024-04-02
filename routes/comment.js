import { Router } from "express";
const router = Router();
import { postComment } from "../controllers/comment.js";
import { authenticateUser } from "../middlewares/authmiddlware.js";
import commentSchema from "../validations/comment.js";
import validateSchema from "../middlewares/validation.js";

router.post("/", authenticateUser, validateSchema(commentSchema), postComment);
//router.get("/", getComment);

export default router;
