module.exports = app => {
    const user = require("../controllers/userController");
    const authenticateToken = require("../middlewares/auth");
  
    var router = require("express").Router();
  
    router.get("/", authenticateToken, user.findAll);
    router.post("/login", user.login);
  
  
    app.use('/api/users', router);
  };