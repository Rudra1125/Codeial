const passport = require('passport');

const LocalStratergy =  require('passport-local').Strategy;

const User = require('../models/user');
// we need to tell the passport that to use local startergy
// Authentication using passport 
passport.use(new LocalStratergy({
    usernameField: 'email',
    passReqToCallback:true
    },
    function(req,email,password, done){
        // find a user and establish identity
        User.findOne({email: email}, function(err , user){
            if(err){
                req.flash('error', err);
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            if(!user || user.password!= password){
                req.flash('error', 'Invalid Username/Password');
                console.log('Invalid username/password');
                return done(null,false);
            }
            return done(null,user);
            // done is callback function which is reporting to the passport
        });
    }

));

// serializing the user to decide which key is to be kept in th cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    })
})


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in then pass  on the request to the next function(controller,s action)
    if(req.isAuthenticated()){
        return next();
    }
    //  if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;