module.exports = (app) => {
  const comment = require("../controllers/comment.controller");

  var router = require("express").Router();

  router.post("/", comment.create);

  router.get("/", comment.findAll);

  router.put("/:id", comment.update);

  app.use("/api/comments", router);
};
