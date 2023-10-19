const product = require('../models/product');

async function createProduct(req, res) {
    try {
        const products = await product.create(req.body);
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//----------------------------------------------------------------------------------------
async function getAllProducts(req, res) {
    try {
        const products = await product.find(); // Retrieve all products from the database
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProductById(req, res) {
    const { productId } = req.params;

    try {
        const products = await product.findById(productId);

        if (!products) {
            res.status(404).json({ error: 'product not found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProductByName(req, res) {
    const { name } = req.params;

    try {
        const products = await product.findOne({ name }); // Retrieve a product by name
        if (!products) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}








async function updateProductById(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProduct = await product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProductById(req, res) {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.status(204).send(); // Respond with a "No Content" status
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// async function deleteProductByName(req, res) {
//     const { productName } = req.params;

//     try {
//         const deletedProduct = await product.findOneAndDelete({ productName });

//         if (!deletedProduct) {
//             res.status(404).json({ error: 'Card not found' });
//         } else {
//             res.status(204).send();
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// async function updateProductByName(req, res) {
//     const { productName } = req.params;
//     const updatedData = req.body;

//     try {
//         const updatedProduct = await product.findOneAndUpdate({ productName }, updatedData, { new: true });

//         if (!updatedProduct) {
//             res.status(404).json({ error: 'Card not found' });
//         } else {
//             res.status(200).json(updatedProduct);
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }




module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,

    updateProductById,
    deleteProductById
    // getProductByName,
    // deleteProductByName,
    // updateProductByName
}