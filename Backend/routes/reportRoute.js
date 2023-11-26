

const express = require('express');
const router = express.Router();
const auth  = require('../middlewares/auth');
const {authorizedRoles} = require('../middlewares/authorizedRoles');

const reportController = require('../controller/reports');






router.get('/report/sales' , auth , authorizedRoles("admin"), reportController.salesReport)
router.get('/report/orderFullfilment' , auth , authorizedRoles("admin"), reportController.generateOrderFulfillmentReport)
router.get('/report/inventory' , auth , authorizedRoles("admin"), reportController.generateInventoryReport)


module.exports = router;
