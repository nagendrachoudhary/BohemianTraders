const express = require("express");
const jwt=require("jsonwebtoken")
const isAuth = require("../middlewar/isAuth");
const order = require("../models/order.schema")
const cart=require('../models/cart.schema')
const route=express.Router();
route.get('/order',isAuth,async(req,res)=>{
    try{
        let token=req.headers.auth
        let user = jwt.decode(token,"narenchoudhary")
        console.log(user);
        let orders=await order.find({userid:user._doc._id})
        res.send(orders)

    }catch{
        res.status(400).send("Server Error")
    }
})
route.post('/order',isAuth,async(req,res)=>{
    let data=req.body.data
    let total=0;
    console.log(data.length)
    data.forEach( async(element) => {
        total=total+(element.price*element.quantity)
        await cart.deleteOne({_id:element._id})
        delete element._id
        delete element.createdAt
        delete element.updatedAt
    });
     await order.insertMany(data)
    res.send(data)
})
route.delete(`/order/:id`,isAuth,async(req,res)=>{
    try{
        let id = req.params.id
        await order.deleteOne({_id:id})
        res.send("DELETE")
    }catch{
        res.status(400).send("Server Error")
    }
})
module.exports=route