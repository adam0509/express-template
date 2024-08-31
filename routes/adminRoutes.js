module.exports = app => {
  const admin = require("../controllers/adminController");
  const authenticateToken = require("../middlewares/auth");
  const log = require("../middlewares/log");

  var router = require("express").Router();

  router.get("/", authenticateToken, log, admin.findAll);
  router.post("/", admin.create);
  router.post("/login", admin.login);


  app.use('/api/admins', router);
};