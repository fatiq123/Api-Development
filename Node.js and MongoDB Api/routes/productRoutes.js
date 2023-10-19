const express = require('express');
const router = express.Router();
const productController = require('../controllers/productConroller');

// for posting data to database
router.post('/products', productController.createProduct);


// Retrieve all products
router.get('/products', productController.getAllProducts);
// Retrieve product by ID
router.get('/products/id/:id', productController.getAllProducts);
// Retrieve product by name
router.get('/products/:name', productController.getAllProducts);

// // for getting data from database
// router.get('/products/get', productController.getProductByName);

// // for deleting data from database
// router.get('/products/delete', productController.deleteProductByName);

// // for updating data from database
// router.get('/products/update', productController.updateProductByName);


module.exports = router;