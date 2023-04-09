const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const user = require('../models/user.schema')
var jwt = require('jsonwebtoken');
router.post('/create', async (res, req) => {
       let data = res.body
       let password = data.password
       const alreadyuser = await user.find({ email: data.email })
       if (alreadyuser.length > 0) {
              console.log("user already persent")
              req.status(201).send("user already ragester")
       }
       else {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(password, salt);
              console.log(data);
              const users = { fname: data.fName ,lname:data.lName, email: data.email, password: hash, address: { name: data.address, city: data.city, state: data.state, pinCode: data.pinCode, country: data.country } }

              user.create(users);
              req.send(res.body);
       }
})
router.post('/login', async (req, res) => {
       let data = req.body
       const finduser = await user.find({ email: data.email })
       if (finduser.length==0) {
              res.send("user not found")
       }
       else { const founduser=finduser[0]
       console.log(founduser)
              const hash = finduser[0].password
              const userpass = data.password
              bcrypt.compare(userpass, hash, (err, result) => {
                     if (result) {
                            let token= jwt.sign({...founduser},"narenchoudhary")
                          //  console.log(token)
                            res.send({token})
                     }
                     else {
                            res.status(401).send("email and password worng")
                     }

              })

       }
})

module.exports = router