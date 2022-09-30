const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  //console.log(typeof req.body.post);
  //*
  try {
    const postt = req.body.post.trim();
    let post = await Post.findById(postt);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: postt,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      req.flash('success','Commented')
      res.redirect("/");
    }
  } catch (err) {
    req.flash('error', 'err');
    console.log(err, "Error");
  }
};
// delete
module.exports.destroy = async function (req, res) {
  try {
    const id = req.params.id.trim();
    let comment = await Comment.findById(id);

    const idd = req.user.id.trim();
    if (comment.user == idd) {
      let postId = comment.post;
      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      req.flash('success', 'comment deleted');
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error', 'err');
    console.log(err, "Error");
  }
};
