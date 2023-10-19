// const express = require('express');
// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT | 3000;


// const card = [];

// // Endpoint to create a card using POST method
// app.post('/api/cards', (req, res) => {
//     const { cardType, cardBank, cardHolderName, cardNumber, cardExpiry, cardCvc } = req.body;

//     // validation
//     if (!cardType || !cardBank || !cardHolderName || !cardNumber || !cardExpiry || !cardCvc) {
//         res.status(404).json({ error: 'All fields are required' });
//     }

//     const newUser = {
//         cardType,
//         cardBank,
//         cardHolderName,
//         cardNumber,
//         cardExpiry,
//         cardCvc
//     }

//     // push newUser to card array
//     card.push(newUser);

//     return res.status(201).json(newUser);

// });

// // Endpoint to get a card by card number
// app.get('/api/cards/:cardNumber', (req, res) => {
//     const { cardNumber } = req.params;

//     const foundCard = card.find(card => card.cardNumber === cardNumber);

//     if (!foundCard) {
//         res.status(404).json({ error: 'Card not found' });
//     } else {
//         res.status(200).json(foundCard);
//     }
// });
// app.listen(PORT, () => {
//     console.log(`Server running on Port ${PORT}`);
// })







const express = require('express');
const app = express();
const port = 3000;
const cardRoutes = require('./routes/card_routes');
const bodyParser = require('body-parser');
require('./utils/db.js');


// Middleware
app.use(bodyParser.json());

// apis
app.use('/api', cardRoutes);

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})