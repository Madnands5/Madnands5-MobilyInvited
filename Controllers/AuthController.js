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
    });

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
exports.userdetails = async (req, res) => {
  const token = req.header("auth");
  const verified = jwt.verify(token, process.env.jwt_secret);
  req.user = verified;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { Name: req.body.name, Gender: req.body.gender },
    { new: true, useFindAndModify: false }
  );
};
