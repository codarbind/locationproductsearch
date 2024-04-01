import { storage } from "../app.js";
import fs from "fs";

const bucketName = "tradedepot-41ec2.appspot.com";

const uploadFileToFirestore = async (file) => {
  const bucket = storage.bucket(bucketName);
  const fileName = Date.now() + "-" + file.originalname;
  const fileUpload = bucket.file(fileName);
  return new Promise((resolve, reject) => {
    fs.createReadStream("./uploads/launcher_icon.png")
      .pipe(fileUpload.createWriteStream())
      .on("error", function (err) {
        console.log({ err });
        reject(err);
      })
      .on("finish", function (here) {
        console.log({ here });
        const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        resolve(url);
      });
  });

  /* const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (error) => {
      console.log(error);
      reject(error);
    });

    stream.on("finish", () => {
      const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(url);
    });

    stream.end(file.buffer);
  });*/
};

export default uploadFileToFirestore;
