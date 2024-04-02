import { storage } from "../app.js";
import fs from "fs";

const bucketName = "tradedepot-41ec2.appspot.com";

const uploadFileToFirestore = async (file) => {
  const bucket = storage.bucket(bucketName);
  const fileName = Date.now() + "-" + file.originalname;
  const fileUpload = bucket.file(fileName);
  const filePath = `./uploads/${file.originalname}`;
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(fileUpload.createWriteStream())
      .on("error", function (err) {
        console.log(err);
        reject(err);
      })
      .on("finish", function () {
        const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        fs.unlink(filePath, (err) => {
          /* if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully");*/
        });
        resolve(url);
      });
  });
};

export default uploadFileToFirestore;
