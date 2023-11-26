
const express = require('express');
const router = express.Router();
const auth  = require('../middlewares/auth');
const productController = require('../controller/productController');



router.delete('/review' , auth , productController.deleteReview)

router.get('/reviews' , auth , productController.getproductReviews)

router.put('/review' , auth , productController.createProductReview)

module.exports = router;
