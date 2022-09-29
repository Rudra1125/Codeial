const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err, post){
        if(err){console.log('error in creating a post');return;}

        return res.redirect('back');
    })
}

module.exports.destroy = function (req,res) {
    const id = req.params.id.trim()
    console.log(id)
    Post.findById(id, function (err, post) {
        if (err) { console.log(err, "Error in fething the post"); return; }
        // .id means converting the object id into string
        const idd=req.user.id.trim()
        // here we have to do == to compare the strings
        
        if (post.user == idd) {
            
            post.remove();
            Comment.deleteMany({ post: id }, function (err) {
                return res.redirect('back');
            }) 
        } else {
            return res.redirect('back');
        }
    });
}

