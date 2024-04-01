import { Router } from "express";
const router = Router();
import { postComment } from "../controllers/comment.js";

router.post("/", postComment);
//router.get("/", getComment);

export default router;
