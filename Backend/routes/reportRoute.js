

const express = require('express');
const router = express.Router();
const auth  = require('../middlewares/auth');
const {authorizedRoles} = require('../middlewares/authorizedRoles');

const reportController = require('../controller/reports');





// Get Monthly Sales Report
router.get('/report/sales' , auth , authorizedRoles("admin"), reportController.salesReport)
// Get Overall order fulfillment report
router.get('/report/orderFullfilment' , auth , authorizedRoles("admin"), reportController.generateOrderFulfillmentReport)
// Get all inventory report
router.get('/report/inventory' , auth , authorizedRoles("admin"), reportController.generateInventoryReport)


module.exports = router;
