const Post = require('../models/post');
const Comment=require('../models/comment')
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('something','hello');
    // Post.find({},function(err, posts){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts: posts
    //     });
    // });
    // populate the user of each post
    Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path:'user'
        }
    }).exec(function(err,posts){
        return res.render('home',{
            title:"Codeial | Home",
            posts: posts
        });
    })
    // POpulating multiple models

    // Post.find({}).populate('user').populate({
    //     path: 'comments',
    //     populate: {
    //         path:'user'
    //     }
    // })


    // Comment.find({}).populate('user').populate('post').exec(function (err, comments) {
    //     if (err) { console.log(err, "unable to populate"); return; }
    //     return res.render('home', {
    //         title:"Codeial | Home",
    //         comments: comments
    //     })
    // })
}

// module.exports.actionName = function(req,res){
//     return res.end('<button>Submit it</button>')
// } 