const express =require('express')
const mongoose=require('mongoose');
const connect = require('./db/connect');
const app=express();
const port =8080
const isAuth= require('./middlewar/isAuth')

app.get('/',(req,res)=>{
    res.send("hello");
})
app.get('/auth',isAuth,(req,res)=>{
    res.send(true);
})
app.listen(port,async ()=>{
await mongoose.connect('mongodb+srv://nagendradangi105:QQs4CtejEaQ9ezsC@cluster0.5kodmg9.mongodb.net/?retryWrites=true&w=majority').then(()=>{
console.log("data connect")
})
    console.log(`server start on port http://localhost:8080`)
})