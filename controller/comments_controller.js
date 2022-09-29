const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  //console.log(typeof req.body.post);
    //*
  const postt=req.body.post.trim()
  Post.findById(postt, function (err, post) {
    // console.log(post, "ggtfhyjh");
    if (err) {
      console.log(err, "error in fetching a post");
    }

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: postt,
          user: req.user._id,
        },
        function (err, comment) {
          // handle error
          if (err) {
            console.log(err,"error in creating a comment");
            return;
          }

          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};
// delete
module.exports.destroy = function (req, res) {
  const id=req.params.id.trim()
  Comment.findById(id, function (err, comment) {
    if(err){
      console.log(err, "Unable to fetch the comment");
      return;  
    }
    const idd=req.user.id.trim()
    if (comment.user == idd) {
      let postId = comment.post;
      comment.remove();
      Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
        if (err) {
          console.log(err, "Unable to find and update");
          return;
        }
        return res.redirect('back');
      })
    } else {
      return res.redirect('back');
    }
  })
}