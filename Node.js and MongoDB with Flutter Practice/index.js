const express = require('express');
const app = express();
const PORT = process.env.PORT | 3000;
const mongoose = require('mongoose');


app.use(express.json());
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

// app.use(express.urlencoded({ extended: true }));

const productData = [];




// // delete api
// app.post('/api/delete_product/:id', (req, res) => {

//     let id = req.params.id * 1;     // 1 is added to convert string to int and also remember const {id} = parseInt(req.params.id)
//     let productToUpdate = productData.find((product) => product.id === id);
//     let index = productData.indexOf(productToUpdate);

//     productData.slice(index, 1);    // 1 means i want one record to delete

//     res.status(204).send({
//         "status_code": "success",
//         "message": "product deleted",
//     })
// });

const Product = require("./product");



mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/flutter_practice", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (err) => {
    console.log("connection error", err);
});
db.once("open", () => {


    // post api
    app.post('/api/add_product', async (req, res) => {

        console.log('Result', req.body);


        let data = Product(req.body);

        try {
            let dataToStore = await data.save();
            res.status(200).json(dataToStore);

        } catch (error) {
            res.status(500).json({
                'status': error.message
            });
        }

        // const pdata = {
        //     "id": productData.length + 1,   // will be auto incremented when new data is added by one
        //     "pname": req.body.pname,
        //     "pprice": req.body.pprice,
        //     "pdescription": req.body.pdescription
        // };

        // productData.push(pdata);
        // console.log('Final', pdata);

        // res.status(200).send({
        //     "status_code": 200,
        //     "message": "Product added successfully",
        //     "product": pdata
        // });
    });


    // get api
    app.get('/api/get_product', async (req, res) => {

        try {
            let data = await Product.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({
                'status': error.message
            });
        }


        // // if there is already data in list then simply return
        // if (productData.length > 0) {
        //     res.status(200).send({
        //         "status_code": 200,
        //         "products": productData
        //     });
        // } else {
        //     res.status(200).send({
        //         "status_code": 200,
        //         "products": [] // in case if there is no data in list 
        //     });
        // }
    });

    ///------------------------------------------------update
    // // put api
    // app.post('/api/update_product/:id', async (req, res) => {


    //     let id = req.params.id;
    //     let updatedData = req.body;

    //     try {
    //         const data = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    //         res.status(200).json(data);
    //     } catch (error) {
    //         res.status(400).json(error.message);
    //     }

    //     // let id = req.params.id * 1;     // 1 is added to convert string to int and also remember const {id} = parseInt(req.params.id)
    //     // let productToUpdate = productData.find((product) => product.id === id);
    //     // let index = productData.indexOf(productToUpdate);

    //     // productData[index] = req.body;

    //     // res.status(200).send({
    //     //     "status_code": 200,
    //     //     "message": "product updated",
    //     // });

    // });

    // Updated put API for updating a product
    app.put('/api/update_product/:id', async (req, res) => {
        const id = req.params.id;
        const updatedData = {
            pname: req.body.pname,
            pprice: req.body.pprice,
            pdescription: req.body.pdescription,
        };

        console.log('Received request to update product with ID:', id);
        console.log('Received data:', updatedData);

        try {
            const data = await Product.findByIdAndUpdate(id, updatedData, { new: true });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });




    //----------------------------------------------------------delete

    // // delete api
    // app.delete('/api/delete_product/:id', async (req, res) => {

    //     let id = req.params.id;

    //     try {
    //         let data = await Product.findByIdAndDelete(id);
    //         res.status(200).json({
    //             'status': `deleted the product ${data.pname} from database`
    //         });
    //     } catch (error) {
    //         res.status(400).json(error.message);
    //     }


    app.delete('/api/delete_product/:id', async (req, res) => {
        const id = req.params.id;
      
        try {
          const data = await Product.findByIdAndDelete(id);
          if (!data) {
            res.status(404).json({ message: `Product with ID ${id} not found` });
          } else {
            res.status(200).json({ message: `Deleted the product ${data.pname} from the database` });
          }
        } catch (error) {
          res.status(400).json({ message: error.message });
        }

      















    // const id = parseInt(req.params.id);
        // const productToUpdate = productData.find((product) => product.id === id);
        // const index = productData.indexOf(productToUpdate);

        // if (index !== -1) {
        //     productData.splice(index, 1); // Use 'splice' to remove an item

        //     res.status(204).send({
        //         status_code: 'success',
        //         message: 'Product deleted',
        //     });
        // } else {
        //     res.status(404).send({
        //         status_code: 'error',
        //         message: 'Product not found',
        //     });
        // }
    });


    console.log("connected to database");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

