module.exports = app => {
  const admin = require("../controllers/adminController");
  const authenticateToken = require("../middlewares/auth");

  var router = require("express").Router();

  router.get("/", authenticateToken, admin.findAll);
  router.post("/", admin.create);
  router.post("/login", admin.login);


  app.use('/api/admins', router);
};