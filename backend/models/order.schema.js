const mongoose = require("mongoose")
const OrderSchema =new mongoose.Schema({
    productid:String,
    name:String,
    size:String,
    brand:String,
    img:String,
    price:Number,
    quantity:{type:Number,default:1},
    total:Number,
    status:{type:String,default:"pending"},
    userid:String,
},{
    timestamps:true
})
module.exports = mongoose.model("order",OrderSchema)