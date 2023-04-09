const mongoose = require('mongoose')
const productschema = new mongoose.Schema({
    brand: String,
    category: String,
    name: String,
    price: Number,
    reviews: Number,
    rating: Number,
    sizes: Array,
    details: String,
    features: Array,
    img: Object,
    inStock: Boolean,
    newest: Boolean,
    bestSelling: Boolean,
    featured: Boolean
}, {
    timestamps: true
})
module.exports = mongoose.model("product", productschema);