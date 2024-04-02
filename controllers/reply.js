import Reply from "../models/reply.js";
import checkRecordExists from "../services/recordexists.js";

export async function postReply(req, res) {
  try {
    const { content, commentId } = req.body;

    if (!(await checkRecordExists("Comment", commentId)))
      return res.status(404).json({ error: "comment doesnt exist" });
    const reply = new Reply({
      content,
      user: req.userId,
      comment: commentId,
    });
    await reply.save();
    console.log(" Send SMS and email notification");

    res.status(201).json({ message: "Replied posted", data: { reply } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
