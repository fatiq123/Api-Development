const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


mongoose.connect("mongodb://127.0.0.1:27017/productDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (err) => {
    console.log("connection error", err);
});
db.once("open", () => {
    console.log("connected to database");
});