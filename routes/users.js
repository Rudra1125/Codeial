const express = require('express');

const router = express.Router();

const usersController = require('../controller/users_controller');

router.get('/profile',usersController.profile);
router.get('/signin',usersController.signin );
router.get('/signup',usersController.signup);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.post('/signout',usersController.logout);
// {
//     res.clearCookie('user_id');
//     // req.createSession.destroy();
//     res.redirect('/users/signin');
// })
module.exports=  router;
