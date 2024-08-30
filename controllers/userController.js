const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const db = require("../config/database");
const User = db.user;


exports.create = async (req, res) => {
  try {
    const userData = {
      user_name: req.body.userName,
      password: req.body.password,
      user_role: 1 // 注册普通用户
    };
    const user = await User.create(userData);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_name: req.body.userName } });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.user_id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours

    res.status(200).send({ accessToken: token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }

};
