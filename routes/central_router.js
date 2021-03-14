var express = require('express');
var router = express.Router();

var userController = require('./../controllers/user_controller.js');
var postsController = require('./../controllers/posts_controller.js')

router.get('/register', userController.renderRegister);

router.post('/register', userController.createUser);

router.get('/login', userController.renderLogin);

router.post('/login', userController.login)

router.get('/dashboard', postsController.renderDashboard)

router.get('/logout', userController.logout);


module.exports = router;