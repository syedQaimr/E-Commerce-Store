
const express = require('express');
const router = express.Router();
const auth  = require('../middlewares/auth');
const {authorizedRoles} = require('../middlewares/authorizedRoles');
const userController = require('../controller/userController');




// User Routes

// User registration
router.post('/user/register', userController.userRegister);

// User login
router.post('/user/login', userController.loginUser);

// User logout (authentication required)
router.get('/user/logout', auth, userController.logOutUser);

// Forgot password
router.post('/user/password/forgot', userController.forgotPassword);

// Reset password
router.put('/user/password/reset', userController.resetPassword);

// Get user details (authentication required)
router.get('/user/me', auth, userController.getUserDeatisl);

// Update user password (authentication required)
router.put('/user/password/update', auth, userController.updatePassword);

// Update user profile (authentication required)
router.put('/user/me/update', auth, userController.updateProfile);

// Admin Routes

// Get all users (admin access required)
router.get('/admin/users', auth, authorizedRoles("admin"), userController.getAllUser);

// Get a specific user by ID (admin access required)
router.get('/admin/user/:id', auth, authorizedRoles("admin"), userController.getUser);

// Update a specific user by ID (admin access required)
router.put('/admin/user/:id', auth, authorizedRoles("admin"), userController.updateUser);

// Delete a specific user by ID (admin access required)
router.delete('/admin/user/:id', auth, authorizedRoles("admin"), userController.deleteUser);

module.exports = router;
