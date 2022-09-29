const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/signin',usersController.signin );
router.get('/signup', usersController.signup);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.post('/create', usersController.create);
// use passport as a middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),usersController.createSession)

router.get('/signout',usersController.destroySession);
module.exports=  router;
