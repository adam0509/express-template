const db = require("../config/database");
const User = db.user;

exports.create = async (req, res) => {
  try {
    const userData = {
      userName: req.body.userName,
    };
    const user = await User.create(userData)
    res.send(user)
  } catch {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
  
};
