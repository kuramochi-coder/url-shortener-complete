const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/default.json");
const db = config.mongoURI;
const ShortUrl = require("./models/url.model");

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

// Views using EJS
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

// Post functions
app.post("/shortUrls", async (req, res, next) => {
  try {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

// Get function for redirecting short urls
app.get("/:shortUrl/", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl) {
      return res.redirect(shortUrl.full);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

// Error handling
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("index", { error: err.message });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
