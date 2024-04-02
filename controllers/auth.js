import User from "../models/user.js";
import bcrypt from "bcryptjs";

import jsonwebtoken from "jsonwebtoken";
import getProductsByLocation from "../services/getproductsbylocation.js";

export async function signup(req, res) {
  try {
    const { email, password, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "Email already exists", success: false, data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, address });
    let saved = await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { email: saved.email, id: saved._id },
    });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jsonwebtoken.sign(
      { userId: user._id },
      process.env.JWTSECRET,
      {
        expiresIn: "1h",
      }
    );

    let closeproducts = await getProductsByLocation(user.address);
    res.status(200).json({
      data: { email: user.email, token, closeproducts },
      message: "login succesful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
