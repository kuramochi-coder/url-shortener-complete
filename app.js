const express = require("express");
const validUrl = require("valid-url");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/default.json");
const db = config.mongoURI;

const app = express();

// Initialize express for json and urlencoded
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to mongodb
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected"))
  .catch((error) => console.log("Error connecting to DB"));

// Template engine display using EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Routes
const appRouter = require("./src/routes/urlRoutes");

app.use("/", appRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
