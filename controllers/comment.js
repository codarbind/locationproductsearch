import Comment from "../models/comment.js";
import User from "../models/user.js";

export async function postComment(req, res) {
  try {
    const { content, productId } = req.body;
    const user = await user.findById(req.userId);
    const comment = new Comment({
      content,
      user: req.userId,
      product: productId,
    });
    await comment.save();
    console.log(" Send SMS and email notification");

    res.status(201).json({ message: "Comment posted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
