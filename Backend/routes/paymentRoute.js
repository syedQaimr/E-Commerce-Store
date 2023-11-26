const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const paymentController = require('../controller/paymentController');



router.post('/payment/process' , auth , paymentController.processPayemnt);

router.get('/stripeapikey' , auth , paymentController.sendStripeApiKey);


module.exports = router;
