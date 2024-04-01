import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
