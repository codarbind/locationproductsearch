import Product from "../models/product.js";

async function getProductsByLocation(location) {
  try {
    const products = await Product.find({ location });
    return products;
  } catch (error) {
    console.error("Error fetching products by location:", error);
    throw error;
  }
}

export default getProductsByLocation;
