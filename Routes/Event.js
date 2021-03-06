const router = require("express").Router();
const eventcontroller = require("../Controllers/EventController.js");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/create").post(verifytoken, eventcontroller.create);
router.route("/getmyInvitaion").get(verifytoken, eventcontroller.GetInvitation);
router.route("/getmyEvents").get(verifytoken, eventcontroller.GetMyEvents);
router.route("/update").post(verifytoken, eventcontroller.create);
router.route("/like").post(verifytoken, eventcontroller.Like);
router.route("/comment").post(verifytoken, eventcontroller.Comment);
router.route("/rsvp").post(verifytoken, eventcontroller.RSVP);
module.exports = router;
