const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const cards = [];

// Endpoint to create a card using POST
app.post('/api/cards', (req, res) => {
    const {cardType, cardBank, cardHolderName, cardNumber, cardExpiry, cardCVC} = req.body;

    // Basic Validation
    if (!cardType || !cardBank || !cardHolderName || !cardNumber || !cardExpiry || !cardCVC) {
        return res.status(400).json({error: 'ALl fields are required'});
    }

    // Create a new card object
    const newCard = {
        cardType,
        cardBank,
        cardHolderName,
        cardNumber,
        cardExpiry,
        cardCVC,
    };

    // Add a new card to the array
    cards.push(newCard);

    return res.status(201).json(newCard);
});

app.listen(3000, () => {
    console.log(`app running on port ${PORT}`);
});