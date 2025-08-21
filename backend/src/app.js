require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");


const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.models");


const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
const upload = multer({ storage: multer.memoryStorage() });


app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());


app.post("/posts", upload.single("imagefile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const file = req.file;
        const { caption } = req.body;
        const fileName =
            Date.now() +
            "-" +
            Math.floor(Math.random() * 1000) +
            path.extname(file.originalname);

        const image = await uploadFile(file.buffer, fileName);
        const post = await postModel.create({
            caption,
            url: image.url,
        });
        res.json({ message: "post created successfully!", data: post });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await postModel.find();
        res.json({ message: "all post fetched!", data: posts });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.post("/imagine", async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-preview-image-generation",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"], // 👈 model ko dono chahiye
      },
    });

    // console.log(JSON.stringify(result, null, 2)); // 🔥 check response structure

    const parts = result?.response?.candidates?.[0]?.content?.parts;

    const imagePart = parts?.find((p) => p.inlineData?.data);

    if (!imagePart) {
      return res.status(500).json({
        success: false,
        error: "No image returned from AI",
      });
    }

    const imageData = imagePart.inlineData.data;
    res.json({ success: true, data: { url: `data:image/png;base64,${imageData}` } });
  } catch (err) {
    console.error("Imagine route error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});






module.exports = app;
