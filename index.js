const express = require("express");
const cloudinary = require("./cloudinary");
const uploader = require("./multer");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/v1/upload", uploader.single("file"), async (req, res, next) => {
  try {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.status(200).json({
      success: true,
      file: upload.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
    next();
  }
});

app.listen(3000);
