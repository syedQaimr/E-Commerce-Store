
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const orderController = require('../controller/orderController');


// Create a new order
router.post('/order/new', auth, orderController.newOrder);

// Get details of a single order by ID
router.get('/order/:id', auth, orderController.getSingleOrder);

// Get orders for the authenticated user
router.get('/orders/me', auth, orderController.myOrder);

// Admin route: Get all orders
router.get('/admin/orders', auth, authorizedRoles("admin"), orderController.getAllOrder);

// Admin route: Update the status of an order by ID
router.put('/admin/order/:id', auth, authorizedRoles("admin"), orderController.updateOrder);

router.get('/admin/dashboard' , orderController.adminDashBoard)


module.exports = router;



