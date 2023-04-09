const mongoose= require('mongoose')
const userschema= new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:Object,required:true},
},{
    timestamps:true
})
module.exports = mongoose.model("user",userschema);
