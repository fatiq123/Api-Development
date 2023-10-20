const express = require('express');
const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const productData = [];

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// post api
app.post('/api/add_product', (req, res) => {

    console.log('Result', req.body);

    const pdata = {
        "id": productData.length + 1,   // will be auto incremented when new data is added by one
        "pname": req.body.pname,
        "pprice": req.body.pprice,
        "pdescription": req.body.pdescription
    };

    productData.push(pdata);
    console.log('Final', pdata);

    res.status(200).send({
        "status_code": 200,
        "message": "Product added successfully",
        "product": pdata
    });
});