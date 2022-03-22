const express = require('express');

const router = express.Router();

const usersController = require('../controller/users_controller');

router.get('/profile',usersController.profile);
router.get('/login',usersController.signin );
router.get('/register-user',usersController.signup);

 
module.exports=  router;
