import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
