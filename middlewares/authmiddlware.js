import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";

export function authenticateUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  try {
    const decodedToken = jsonwebtoken.verify(token, process.env.JWTSECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authorization token" });
  }
}

export function handleErrors(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
}
