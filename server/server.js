const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(express.json());
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

app.listen(4000, () => {
	console.log("Server listening on port 4000");
});
