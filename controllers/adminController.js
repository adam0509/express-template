const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const db = require("../config/database");
const Admin = db.admin;

// 创建管理员
exports.create = async (req, res) => {
  try {
    const adminData = {
      admin_name: req.body.adminName,
      password: req.body.password
    };
    const admin = await Admin.create(adminData);
    res.send(admin);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  }
};

// 登录管理员
// 传入用户名userName, 密码password
exports.login = async (req, res) => {
  try {
    // 确认是否存在该用户
    const admin = await Admin.findOne({ where: { admin_name: req.body.adminName } });
    if (!admin) {
      return res.status(404).send({ message: "Admin Not found." });
    }

    // 比对密码
    const passwordIsValid = await bcrypt.compare(req.body.password, admin.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // 密码正确则生成token发回：accessToken
    const token = jwt.sign({ id: admin.admin_id }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours

    res.status(200).send({ accessToken: token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const admins = await Admin.findAll()
    res.send(admins)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }

};
