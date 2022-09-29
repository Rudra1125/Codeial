const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    
    try {
        let post=await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        
            
        return res.redirect('back');
        
    } catch (err) {
        console.log("error",error)
    }
    
}

module.exports.destroy = async function (req,res) {
    
    try {
        const id = req.params.id.trim()
        console.log(id)
        let post = await Post.findById(id)
        const idd=req.user.id.trim()
            // here we have to do == to compare the strings
            
        if (post.user == idd) {
                
            post.remove();
            
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err, "Error");
    }
    
}

