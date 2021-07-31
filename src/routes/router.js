const express = require("express");
const appRouter = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

// render home and edit pages
appRouter.get("/", services.homeRoutes);
appRouter.get("/edit_url", services.edit_url);

// redirect shorturl to fullurl
appRouter.get("/:shortUrl/", services.shortUrlReRoutes);

// APIs
appRouter.post("/api/urls", controller.create);
appRouter.get("/api/urls", controller.find);
appRouter.post("/api/urls/update", controller.update);
appRouter.delete("/api/urls/:id", controller.delete);

module.exports = appRouter;
