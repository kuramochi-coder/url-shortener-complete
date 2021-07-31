const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/default.json");
const db = config.mongoURI;

const app = express();

// Load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

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

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
