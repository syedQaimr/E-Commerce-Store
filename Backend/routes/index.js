const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();


router.get('/products', productController.getAllProducts);

router.post('/products/add', productController.addProduct);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

router.get('/products/:id', productController.getProductById);






module.exports = router