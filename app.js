import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as mongoose from "mongoose";
import admin, * as firebaseAdmin from "firebase-admin";

const { connect, connection } = mongoose;

const app = express();
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.FIRESTORE_PROJECT,
  credentials: JSON.parse(process.env.FIRESTORE_KEY),
});
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const serviceAccount = JSON.parse(process.env.FIRESTORE_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DB_URL,
});

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import commentRoutes from "./routes/comment.js";
import bp from "body-parser";

app.use(
  bp.json({
    limit: "50mb",
  })
);
app.use(
  bp.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { storage };
