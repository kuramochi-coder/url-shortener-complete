const express = require("express");
const appRouter = express.Router();
const createHttpError = require("http-errors");
const ShortUrl = require("../../models/url.model");

// render
appRouter.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

appRouter.get("/edit", async (req, res) => {
  res.render("edit");
});

// create shorturl API
appRouter.post("/api/shortUrls", async (req, res, next) => {
  try {
    const existingFullUrl = await ShortUrl.findOne({
      full: req.body.fullUrl,
    });
    console.log(existingFullUrl);
    if (existingFullUrl) {
      //   pass
    } else {
      if (req.body.shortUrl) {
        await ShortUrl.create({
          full: req.body.fullUrl,
          short: req.body.shortUrl,
        });
      } else {
        await ShortUrl.create({ full: req.body.fullUrl });
      }
    }
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

// find by id API
appRouter.get("/api/find", (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    shortUrl
      .findOne({ _id: id })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `No urls found with id: ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({ message: `Error retriving url with id: ${id}` });
      });
  }
});

// edit API
appRouter.put("/api/edit/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data cannot be empty" });
  }

  const id = req.params.id;
  ShortUrl.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot update url with ${id}.` });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Error updating url" });
    });
});

// delete API
appRouter.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  ShortUrl.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete with id ${id}` });
      } else {
        res.send({ message: "Url deleted successfully" });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: `Cannot delete with id ${id}` });
    });
});

// redirect shorturl to fullurl
appRouter.get("/:shortUrl/", async (req, res) => {
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

// error handling
appRouter.use((req, res, next) => {
  next(createHttpError.NotFound());
});

appRouter.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("index", { error: err.message });
});

module.exports = appRouter;
