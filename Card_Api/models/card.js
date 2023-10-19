const mongoose = require('mongoose')

const cardScheema = mongoose.Schema({
    // name: String,
    // description: String,
    // price: Number,

    cardType: String,
    cardBank: String,
    cardHolderName: String,
    cardNumber: String,
    cardExpiry: String,
    cardCvc: String


}, { timestamps: true } // automatically set the time 

);

module.exports = mongoose.model('Card', cardScheema)  // we can use this schema other files