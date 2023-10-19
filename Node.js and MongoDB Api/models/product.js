const mongoose = require('mongoose')

const productScheema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
}, { timestamps: true } // automatically set the time 

);

module.exports = mongoose.model('Product', productScheema)  // we can use this schema other files