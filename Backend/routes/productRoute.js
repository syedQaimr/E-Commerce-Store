
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const auth  = require('../middlewares/auth');
const {authorizedRoles} = require('../middlewares/authorizedRoles');



// Get all products
router.get('/products', productController.getAllProducts);

// Get all products without pagination
router.get('/products/all', productController.getAllProductsWithoutPagination);

// Add a new product
router.post('/products/add', auth, authorizedRoles("admin"), productController.addProduct);

// Update a product by ID
router.put('/products/:id', auth, authorizedRoles("admin"), productController.updateProduct);

// Delete a product by ID
router.delete('/products/:id', auth, authorizedRoles("admin"), productController.deleteProduct);

// Get a product by ID
router.get('/products/:id', productController.getProductById);

// Admin route: Get a product by ID (restricted to admin)
router.get('/admin/products/:id', auth, authorizedRoles("admin"), productController.getProductById);

module.exports = router;
