const express = require('express');
const productController = require('../controller/productController');
const userController = require('../controller/userController');
const orderController = require('../controller/orderController');

const auth  = require('../middlewares/auth');
const {authorizedRoles} = require('../middlewares/authorizedRoles');
const user = require('../models/user');


const router = express.Router();


router.get('/products', auth , productController.getAllProducts);

router.post('/products/add', auth  , authorizedRoles("admin") , productController.addProduct);

router.put('/products/:id', auth ,  authorizedRoles("admin") , productController.updateProduct);

router.delete('/products/:id', auth ,  authorizedRoles("admin") , productController.deleteProduct);

router.get('/products/:id', auth , productController.getProductById);

router.get('admin/products/:id', auth ,authorizedRoles("admin"), productController.getProductById);


router.post('/register' , userController.userRegister);

router.post('/login' , userController.loginUser);

router.get('/logout' , auth , userController.logOutUser);

router.post('/password/forgot' , auth , userController.forgotPassword);


router.put('/password/reset/:token' , auth , userController.resetPassword);

router.get('/me', auth , userController.getUserDeatisl);

router.put('/password/update', auth , userController.updatePassword);

router.put('/me/update', auth , userController.updateProfile);

router.get('/admin/users' , auth , authorizedRoles("admin"), userController.getAllUser)

router.get('/admin/user/:id' , auth , authorizedRoles("admin"), userController.getUser)

router.put('/admin/user/:id' , auth , authorizedRoles("admin"), userController.updateUser)

router.delete('/admin/user/:id' , auth , authorizedRoles("admin"), userController.deleteUser)

router.delete('/review' , auth , productController.deleteReview)

router.get('/reviews' , auth , productController.getproductReviews)

router.put('/review' , auth , productController.createProductReview)

router.post('/order/new' , auth , orderController.newOrder)

router.get('/order/:id' , auth ,  orderController.getSingleOrder)

router.get('/orders/me' , auth , orderController.myOrder)

router.get('/admin/orders' , auth , authorizedRoles("admin"), orderController.getAllOrder)


router.put('/admin/order/:id' , auth , authorizedRoles("admin"), orderController.updateOrder)

router.delete('/admin/order/:id' , auth , authorizedRoles("admin"), orderController.deleteOrder)




















module.exports = router