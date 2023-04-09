const mongoose = require('mongoose');
const express = require("express");
const isAuth = require('../middlewar/isAuth');
const cart = require('../models/cart.schema');
const product = require('../models/product.schema')
const jwt = require('jsonwebtoken')
const routes = express.Router();
routes.get("/cart", isAuth, async (req, res) => {
    let token = req.headers;
    let user = jwt.decode(token.auth, "narenchoudhary")
    let cartsitem = await cart.find({ userid: user._doc._id })
    res.send(cartsitem)
})
routes.post("/cart/:id/:size", isAuth, async (req, res) => {
    try {

        let token = req.headers;
        let id = req.params.id
        let size = req.params.size
        let user = jwt.decode(token.auth, "narenchoudhary")
        let already = await cart.find({ productid: id, size: size, userid: user._doc._id })
        if (already.length == 1) {
            res.send({ Message: "already add in cart" })
        }
        else {
            let item = await product.find({ _id: id })
            let cartItem = {
                productid: item[0]._id,
                name: item[0].name,
                img: item[0].img.item1,
                size: size,
                brand: item[0].brand,
                price: item[0].price,
                total: item[0].price,
                userid: user._doc._id,
            }
            await cart.create(cartItem);
            res.send("Done")
        }
    } catch {
        res.status(400).send("ERROR")
    }
})
routes.patch("/cart/:id/:operation", isAuth, async (req, res) => {
    try {
        let id = req.params.id
        let operation = req.params.operation
        let already = await cart.find({ _id: id })
        if (operation == "inc") {
            let quantity = already[0].quantity
            quantity++;
            await cart.updateOne({ _id: id }, { $set: { quantity: quantity } })
            let updateed = await cart.find({ _id: id })
            res.send(updateed[0])
        }
        else if (operation == "dic") {
            let quantity = already[0].quantity
            quantity--;
            if (quantity == 0) {
                await cart.deleteOne({ _id: id })
                res.send({Message:"DELETED"})
            }
            else {
                await cart.updateOne({ _id: id }, { $set: { quantity: quantity } })
                let updateed = await cart.find({ _id: id })
                res.send(updateed[0])
            }
        }
    } catch {
        res.send("ERROR")
    }
})
routes.delete("/cart/:id", isAuth, async (req, res) => {
    try {
        let id = req.params.id
        await cart.deleteOne({_id:id})
        res.send({Message:"item remove"})
    } catch {
        res.send("ERROR")
    }
})
module.exports = routes