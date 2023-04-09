const mongoose = require("mongoose");
const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const userDB = require("../models/user.schema")
router.post('/auth', async (res, req,next) => {
    let token = res.headers;
    let user = jwt.decode(token.auth, "narenchoudhary")
    // console.log(token)
    if(user){
        let userInDB = await userDB.find({ _id: user._doc._id,password:user._doc.password })
        if (userInDB.length == 0) {
            req.status(401).send({ Message: "Loging again" })
        }
        let resdata = { fname: userInDB[0].fname, email: userInDB[0].email, address: userInDB[0].address }
        // console.log(resdata)
        req.send(resdata)
    }
    else{
        req.status(401).send({ Message: "Loging again" })
    }
    next();
})
module.exports = router