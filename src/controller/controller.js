const ShortUrl = require("../../models/url.model");

// create new short url
exports.create = async (req, res, next) => {
  try {
    const existingFullUrl = await ShortUrl.findOne({
      full: req.body.full,
    });
    if (existingFullUrl) {
      //   pass
    } else {
      if (req.body.shortUrl) {
        // if there is a custom input for short url name we will use it
        await ShortUrl.create({
          full: req.body.full,
          short: req.body.short,
        });
      } else {
        // else just generate a short url name using shorid
        await ShortUrl.create({ full: req.body.full });
      }
    }
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

// find all urls generated or a single url by id
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    ShortUrl.findOne({ _id: id })
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
  } else {
    ShortUrl.find()
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `No urls found` });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({ message: `Error retriving urls` });
      });
  }
};

// update existing full and short url
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data cannot be empty" });
  }

  const id = req.body._id;
  ShortUrl.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot update url with ${id}.` });
      } else {
        // res.send(data);
        res.redirect("/");
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Error updating url" });
    });
};

// delete url by id
exports.delete = (req, res) => {
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
};
