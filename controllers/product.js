import Product from "../models/product.js";
import uploadFileToFirestore from "../services/fileuploadservice.js";
import dotenv from "dotenv";
dotenv.config();
export async function uploadProduct(req, res) {
  try {
    const { name, location } = req.body;
    const image = req.file;

    let imageurl = await uploadFileToFirestore(image);
    console.log({ imageurl });
    const product = new Product({
      name,
      image: imageurl,
      location,
      user: req.userId,
    });
    await product.save();
    res.status(201).json({
      message: "Product uploaded successfully",
      data: { name, image: imageurl, location },
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find({ location: req.userAddress });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
