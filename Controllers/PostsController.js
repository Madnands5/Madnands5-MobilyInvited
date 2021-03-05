const Post = require("../Models/Posts");
const Likes = require("../Models/Likes");
const Comments = require("../Models/Comments");
const Event = require("../Models/Events");
const { ca } = require("date-fns/locale");
exports.addPost = async (req, res) => {
  try {
    const Events = await Event.findOne({ _id: req.body.id });
    let id = Events._id;
    const Postdata = await new Post({
      by: req.body.by,
      fileurl: req.body.url,
      filetype: req.body.type,
      Eid: id,
      caption: req.body.caption,
    });
    await Postdata.save();
    res.json({ status: "success", Postdata });
  } catch (err) {
    res.json({ status: "success", err });
  }
};

exports.LikePost = async (req, res) => {
  try {
    const Postdata = await Post.findOne({ _id: req.body.id });
    if (Postdata !== null) {
      const isliked = await Likes.findOne({
        LikeBy: req.body.by,
        Eid: Postdata._id,
      });
      if (isliked === null) {
        console.log("not liked yet");
        const Likesdata = await new Likes({
          LikeBy: req.body.by,
          Eid: Postdata._id,
        });
        const finaldata = await Likesdata.save();
        console.log(" liked in like table ");
        UopdatePost = await Post.findByIdAndUpdate(
          Postdata._id,
          {
            $push: { LikeList: finaldata._id },
          },
          { new: true, useFindAndModify: false }
        )
          .then(() => console.log("updated success"))
          .catch((err) => {
            console.log(err);
          });
        if (UopdatePost !== null) {
          console.log(" Event Updated ");
        } else {
          console.log(" Event not Updated ");
        }
      } else {
        console.log(" liked already");
        Arraydata = await Postdata.LikeList.filter((like) => {
          like.LikeBy != req.body.by;
        });
        finaldata = await Likes.deleteOne({
          LikeBy: req.body.by,
          Eid: Postdata._id,
        });
        console.log(finaldata);
        console.log(" liked deleted");
        console.log(finaldata);
        UpdateEvents = await Event.findByIdAndUpdate(
          id,
          {
            LikeList: Arraydata,
          },
          { new: true, useFindAndModify: false }
        );
        if (UpdateEvents !== null) {
          console.log(" Event Updated ");
        } else {
          console.log(" Event not Updated ");
        }
      }
    } else {
      res.json({ status: "success", data: "post not found" });
    }
  } catch (err) {
    res.json({ status: "fail", err });
  }
};

exports.commentonPost = async (req, res) => {
  try {
    const Postdata = await Post.findOne({ _id: req.body.id });
    let id = Postdata._id;
    if (Postdata !== null) {
      const Commentsdata = await new Comments({
        CommentBy: req.body.by,
        Eid: id,
        Comment: req.body.comment,
      });
      const finaldata = await Commentsdata.save();

      UpdatePost = await Post.findByIdAndUpdate(
        id,
        {
          $push: { CommentList: finaldata._id },
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => console.log("updated success"))
        .catch((err) => {
          console.log(err);
        });
      res.json({ status: 1, finaldata });
    } else {
      res.json({ err: "invalid e_id" });
    }
  } catch (err) {
    res.json({ status: "fail", err });
  }
};
