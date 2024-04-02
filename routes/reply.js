import { Router } from "express";
const router = Router();
import { postReply } from "../controllers/reply.js";
import { authenticateUser } from "../middlewares/authmiddlware.js";
import replySchema from "../validations/reply.js";
import validateSchema from "../middlewares/validation.js";

router.post("/", authenticateUser, validateSchema(replySchema), postReply);

export default router;
