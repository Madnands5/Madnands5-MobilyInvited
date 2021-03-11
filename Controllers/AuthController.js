const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const twilio = require("../Utility/Twilio");

exports.sendotp = async (req, res) => {
  twilio.initverify(req.body.Phone, res);
};

exports.verifyotp = async (req, res) => {
  twilio.verifytoken(req.body.Phone, req.body.code, res);
};

exports.login = async (req, res) => {
  try {
    console.log("called login");
    const user = await User.findOne({
      Phone: req.body.Phone,
    }).populate("Groups");

    if (user) {
      console.log("found login");
      const token = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.jwt_secret
      );
      res.json({
        token: token,
        status: "1",
        user: user,
      });
      //}
    } else {
      console.log("login not found");
      const user = await new User({
        Phone: req.body.Phone,
      });
      const userdata = await user.save();
      const token = await jwt.sign(
        {
          _id: user._id,
        },
        process.env.jwt_secret
      );
      res.json({
        token: token,
        status: "1",
        user: userdata,
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.getuserdetails = async (req, res) => {
  try {
    console.log("getuserdetails");
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    console.log(req.user);
    console.log(req.body);
    let nocountry = req.body.Phone.slice(req.body.Phone.length - 10);
    console.log(nocountry);
    const user = await User.findOne({
      $or: [{ Phone: req.body.Phone }, { Phone: nocountry }],
    });
    console.log("usre");
    console.log(user);
    if (!user) {
      res.json({ status: "fail", err: "invalid user", user });
    } else {
      res.json({ status: "success", user: { Name: user.Name, Pic: user.Pic } });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "fail", err: err });
  }
};

exports.userdetails = async (req, res) => {
  try {
    const token = req.header("auth");
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        Name: req.body.Name,
        Gender: req.body.Gender,
        DOB: req.body.DOB,
        Pic: req.body.Image,
      },
      { new: true, useFindAndModify: false }
    );

    res.json({ status: "success", user: user });
  } catch (err) {
    res.json({ status: "failed", err: err });
  }
};
exports.verify = async (req, res) => {
  const token = req.header("auth");
  if (token === undefined || token == "") {
    res.json({ status: "invalid" });
  } else {
    const verified = jwt.verify(token, process.env.jwt_secret);
    req.user = verified;
    if (!verified) {
      res.json({ status: "invalid" });
    } else {
      res.json({ status: "valid" });
    }
  }
};
