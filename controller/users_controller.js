module.exports.profile = function(req,res){
    return res.render('users',{
        title:"users"
    })
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
}
// sign and create a seession for the user
module.exports.createSession = function(req, res){
    // todo later
}
