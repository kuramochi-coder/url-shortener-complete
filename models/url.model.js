const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
    unique: false,
  },
  short: {
    type: String,
    required: true,
    unique: true,
    default: shortId.generate,
  },
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
