const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/jwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.log('connection error', err);
});
db.once('open', () => {
    console.log('connected to database');
});