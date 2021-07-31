const axios = require("axios");
const config = require("../../config/default.json");
const baseUrl = config.baseUrl;
const ShortUrl = require("../../models/url.model");

exports.homeRoutes = async (req, res) => {
  axios
    .get(`${baseUrl}/api/urls`)
    .then((response) => {
      res.render("index", { allUrls: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.edit_url = (req, res) => {
  axios
    .get(`${baseUrl}/api/urls`, { params: { id: req.query.id } })
    .then((urldata) => {
      res.render("edit_url", { singleUrl: urldata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.shortUrlReRoutes = async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    if (shortUrl) {
      return res.redirect(shortUrl.full);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
};
