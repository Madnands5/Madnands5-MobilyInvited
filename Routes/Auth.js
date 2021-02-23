const router = require("express").Router();
const authcontroller = require("../Controllers/AuthController.js");
router.route("/login").post(authcontroller.login);
router.route("/send-otp").post(authcontroller.sendotp);
router.route("/verify-otp").post(authcontroller.verifyotp);
module.exports = router;
