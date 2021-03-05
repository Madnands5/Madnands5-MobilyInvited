const router = require("express").Router();
const Chatroomcontroller = require("../Controllers/ChatController");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/get-myrooms").get(verifytoken, Chatroomcontroller.GetGroup);
router.route("/createroom/").post(verifytoken, Chatroomcontroller.CreateGroup);
module.exports = router;
