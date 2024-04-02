import Comment from "../models/comment.js";
import checkRecordExists from "../services/recordexists.js";

export async function postComment(req, res) {
  try {
    const { content, productId } = req.body;
    if (!(await checkRecordExists("Product", productId)))
      return res.status(404).json({ error: "product doesnt exist" });
    const comment = new Comment({
      content,
      user: req.userId,
      product: productId,
    });
    await comment.save();

    res.status(201).json({ message: "Comment posted", data: { comment } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
