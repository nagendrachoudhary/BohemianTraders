const express = require('express')
const mongoose = require('mongoose');
const connect = require('./db/connect');
const app = express();
const port = 8080
const isAuth = require('./middlewar/isAuth')
const user = require('./models/user.schema')
const login = require('./Routes/account')
const auth = require('./Routes/auth')
const cart = require('./Routes/cart')
const order = require('./Routes/order')
const product = require('./models/product.schema')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use('/', login)
app.use('/', auth)
app.use('/', cart)
app.use('/', order)
app.get('/products', async (req, res) => {
    try{

        // http://localhost:8080/products/?page=1&sort=2XS,XS,M&price_gte=10&price_lte=10000&order=All
        let query = req.query
    let page = query.page
    let min = query.price_gte
    let max = query.price_lte
    let size = [...query.sort]
    let order = query.order
    if (order == "All") {
        order = 0;
    }
    else if (order == "PRICE:DESCENDING") {
        order = -1
    }
    else if(order=="PRICE:DESCENDING") {
        order = 1;
    }
    else {
        order=0;
    }
    console.log(query)
    let skip = (query.page - 1) * 12
    if (size.length > 0) {
        if (order) {
            let data = await product.find({ sizes: { $in: size } }).limit(12).skip(skip);
            res.send(data)
        }
        else {
            let data = await product.find({ sizes: { $in: size } }).limit(12).skip(skip);
            res.send(data)
        }
    }
    else {
        if (order) {

            let data = await product.find({ price: { $gte: min, $lte: max } }).sort({ price: order }).limit(12).skip(skip)
            res.send(data)
        }
        else {
            let data = await product.find({ price: { $gte: min, $lte: max } }).limit(12).skip(skip)
            res.send(data)
        }
    }
}catch{
    res.status(400).send("ERROR")
}
})
app.get('/products/:id', async (req, res) => {
    let id = req.params.id
    let data = await product.findOne({ _id: id })
    res.send(data);
})
app.listen(port, async () => {
    await mongoose.connect('mongodb+srv://nagendradangi105:QQs4CtejEaQ9ezsC@cluster0.5kodmg9.mongodb.net/?retryWrites=true&w=majority').then(() => {
        console.log("data connect")
    })
    console.log(`server start on port http://localhost:8080`)
})