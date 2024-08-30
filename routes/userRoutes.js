module.exports = app => {
    const users = require("../controllers/userController");
    const authenticateToken = require("../middlewares/auth");

    var router = require("express").Router();
  
    router.get("/",  users.findAll);
    router.post("/",  users.create);
    router.post("/login", users.login);

  
    app.use('/api/users', router);
  };