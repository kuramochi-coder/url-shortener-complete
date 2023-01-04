const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/config");
const db = config.mongoURI;
const favicon = require("serve-favicon");
require("dotenv").config();

const app = express();

// Load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use(favicon(path.join(__dirname, "assets", "image", "favicon.ico")));

// Initialize express for json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongoDB connected"))
  .catch((error) => console.log("Error connecting to DB"));

// Template engine display using EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Routes
const appRouter = require("./src/routes/router");

app.use("/", appRouter);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} & env is ${process.env.ENV}`)
);
