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
