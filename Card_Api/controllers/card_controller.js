const Card = require('../models/card'); // Use the correct module name

async function createCard(req, res) {
    try {
        const card = await Card.create(req.body); // Use the correct model name
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createCard
}
