const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err, user){
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }
            return res.redirect('/users/signin');
        })
    }else{
        return res.redirect('/users/signin');
    }
    
    // return res.render('user_profile',{
    //     title:"users"
    // })
}

module.exports.signup = function(req,res){
    return res.render('signup',{
        title: "codeial /SignUp"
    })
}
module.exports.signin = function(req,res){
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
    // steps to authenticate
    // find the user

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return;}

        // handle user found
        if(user){
            // handle mismatchig password which don't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
            
        }else{
            // handle user not found
            return res.redirect('back');
        }
    })

    
    

    
}
module.exports.logout= function(req,res){
    res.clearCookie('user_id');
    res.redirect('/users/signin');
}
