import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const replySchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
  },
  { timestamps: true }
);

export default model("Reply", replySchema);
