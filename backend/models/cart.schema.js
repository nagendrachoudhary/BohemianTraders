const mongoose =require('mongoose')

const cartschema= new mongoose.Schema({
    productid:String,
    name:String,
    size:String,
    brand:String,
    img:String,
    price:Number,
    quantity:{type:Number,default:1},
    total:Number,
    userid:String,
},{
    timestamps:true
})
module.exports = mongoose.model("cart",cartschema)