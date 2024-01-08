
const express = require('express');
const router = express.Router();
const frontendErrorController = require('../controller/frontendErrorController');




// Add FrontEnd Error Route
router.post('/error/frontend' , frontendErrorController.storeError);

module.exports = router;

