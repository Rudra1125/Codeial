const User = require('../models/user');

module.exports.profile =async function(req,res){
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
    
    
}
module.exports.update = function (req, res) {
    if (req.user.id.trim() == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        })
    } else {
        return res.status(401).send('unauthorized');
    }
}

module.exports.signup = function(req,res){
   
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
     return res.render('signup',{
        title: "codeial /SignUp"
    })
}
module.exports.signin = function(req,res){
    
    
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('signin',{
        title: "codeial /Signin"
    })
}
// get the sign up data
module.exports.create = function(req, res){
    // todo later 
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    } 
    User.findOne({email: req.body.email},function(err, user){
        if(err){
            console.log('error in finding user in signinig up');

        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user in signinig up');
                }
                return res.redirect('/users/signin');
            })
         
        }else{
            return res.redirect('back'); 
        }
    })
}
// sign and create a seession for the user
module.exports.createSession = function(req, res){
    // todo later
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout();
    return res.redirect('/')
}