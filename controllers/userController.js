const jwt = require('jsonwebtoken');
const axios = require("axios");

const APPID = process.env.APPID
const APPSECRET = process.env.APPSECRET
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const db = require("../config/database");
const User = db.user;

// 创建用户
exports.login = async (req, res) => {
    const JSCODE = req.body.code; // 前端发来的code

    try {
        // 向微信服务器发去请求（appid、secret、code），获得用户唯一标识openid
        const wxres = await axios.get(
            `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${JSCODE}&grant_type=authorization_code`
        );
        const openId = wxres.data.openid;

        // 验证是否已存在
        let user = await User.findOne({
            where: {
                openId,
            },
        });

        // 不存在则创建该用户
        if (!user) {
            user = await User.create({ openId });
        }

        // 生成token
        const token = jwt.sign(
            {
                openId: user.openId,
            },
            SECRET_KEY,
            {
                expiresIn: 86400,
            }
        );

        res.send(
            { accessToken: token });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User.",
        });
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
