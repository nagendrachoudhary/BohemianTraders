const mongoose = require("mongoose");
const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const userDB = require("../models/user.schema")
const isAuth = async (res, req, next) => {
    let token = res.headers;
    let user = jwt.decode(token.auth, "narenchoudhary")
    if (user) {
        let userInDB = await userDB.find({ _id: user._doc._id, password: user._doc.password })
        if (userInDB.length == 0) {
            req.status(401).send({ Message: "Loging again" })
        }
        next()
    }
    else {
        req.status(401).send({ Message: "Loging again" })
    }
}
module.exports = isAuth