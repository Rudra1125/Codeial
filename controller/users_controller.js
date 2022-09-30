const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: user,
  });
  } catch (error) {
      console.log(err, "Error");
  }
};



module.exports.update = async function (req, res) {
  try {
    if (req.user.id.trim() == req.params.id) {
        let user = await User.findByIdAndUpdate(req.params.id, req.body)
        req.flash('success','Updated Successfully')  
        
      return res.redirect("back");
        
      } else {
        return res.status(401).send("unauthorized");
      }
  } catch (err) {
      console.log(err, "Error");
  }
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  
  return res.render("signup", {
    title: "codeial /SignUp",
  });
};
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signin", {
    title: "codeial /Signin",
  });
};
// get the sign up data
module.exports.create = function (req, res) {
  // todo later
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', "Password didn't match");
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash('error', err);
      console.log("error in finding user in signinig up");
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash('error', err);
          console.log("error in creating user in signinig up");
        }
        return res.redirect("/users/signin");
      });
    } else {
      req.flash('success', 'You have signed up, login to continue!');
            
      return res.redirect("back");
    }
  });
};
// sign and create a seession for the user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfully')
  // todo later
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have Logged Out!');
  return res.redirect("/");
};
