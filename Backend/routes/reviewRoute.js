
const express = require('express');
const router = express.Router();
const auth  = require('../middlewares/auth');
const productController = require('../controller/productController');


// Delete Reviews

router.delete('/review' , auth , productController.deleteReview)

// Get Reviews

router.get('/reviews' , auth , productController.getproductReviews)

// Update Reviews

router.put('/review' , auth , productController.createProductReview)

module.exports = router;
