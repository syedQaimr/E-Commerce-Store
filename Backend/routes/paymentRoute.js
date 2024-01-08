const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const paymentController = require('../controller/paymentController');


// Process payment
router.post('/payment/process' , auth , paymentController.processPayemnt);
// Get Stripe api key
router.get('/stripeapikey' , auth , paymentController.sendStripeApiKey);


module.exports = router;
