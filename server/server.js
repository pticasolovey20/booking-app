const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (request, response) => {
	mongoose.connect(process.env.MONGO_URL);
	response.json("test ok");
});

app.post("/upload-by-link", async (request, response) => {
	const { link } = request.body;
	const newName = "photo" + Date.now() + ".jpg";
	await imageDownloader.image({
		url: link,
		dest: __dirname + "/uploads/" + newName,
	});
	response.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), async (request, response) => {
	const uploadedFiles = [];
	for (let i = 0; i < request.files.length; i++) {
		const { path, originalname } = request.files[i];
		const parts = originalname.split(".");
		const ext = parts[parts.length - 1];
		const newPath = path + "." + ext;
		fs.renameSync(path, newPath);
		uploadedFiles.push(newPath.replace("uploads\\", ""));
	}
	response.json(uploadedFiles);
});

app.listen(4000, () => {
	console.log("Server listening on port 4000");
});
