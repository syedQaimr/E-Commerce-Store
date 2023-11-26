
const express = require('express');
const router = express.Router();
const frontendErrorController = require('../controller/frontendErrorController');





router.post('/error/frontend' , frontendErrorController.storeError);

module.exports = router;

