const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User.js");
const Place = require("./models/Place.js");

const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const { request } = require("http");

require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

app.use(express.json());
app.use(cookieParser());
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

// register

app.post("/register", async (request, response) => {
	const { name, email, password } = request.body;

	try {
		const userDoc = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});

		response.json(userDoc);
	} catch (error) {
		response.status(422).json(error);
	}
});

// login

app.post("/login", async (request, response) => {
	const { email, password } = request.body;
	const userDoc = await User.findOne({ email });
	if (userDoc) {
		const passOk = bcrypt.compareSync(password, userDoc.password);
		if (passOk) {
			jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (error, token) => {
				if (error) throw error;
				response.cookie("token", token).json(userDoc);
			});
		} else {
			response.status(422).json("not ok");
		}
	} else {
		response.json("not found");
	}
});

// profile

app.get("/profile", (request, response) => {
	const { token } = request.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (error, userData) => {
			if (error) throw error;
			const { name, email, _id } = await User.findById(userData.id);
			response.json({ name, email, _id });
		});
	} else {
		response.json(null);
	}
});

// upload photos

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

// user places (create, reed, update)

app.post("/places", (request, response) => {
	const { token } = request.cookies;
	const {
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
	} = request.body;
	jwt.verify(token, jwtSecret, {}, async (error, userData) => {
		if (error) throw error;
		const placeDoc = await Place.create({
			owner: userData.id,
			title,
			address,
			photos: addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
		});
		response.json(placeDoc);
	});
});

app.get("/user-places", (request, response) => {
	const { token } = request.cookies;
	jwt.verify(token, jwtSecret, {}, async (error, userData) => {
		const { id } = userData;
		response.json(await Place.find({ owner: id }));
	});
});

app.get("/places/:id", async (request, response) => {
	const { id } = request.params;
	response.json(await Place.findById(id));
});

app.put("/places", async (request, response) => {
	const { token } = request.cookies;
	const {
		id,
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
	} = request.body;
	jwt.verify(token, jwtSecret, {}, async (error, userData) => {
		const placeDoc = await Place.findById(id);
		if (userData.id === placeDoc.owner.toString()) {
			placeDoc.set({
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
			});
			await placeDoc.save();
			response.json("ok");
		}
	});
});

// all places

app.get("/places", async (request, response) => {
	response.json(await Place.find());
});

app.listen(4000, () => {
	console.log("Server listening on port 4000");
});
