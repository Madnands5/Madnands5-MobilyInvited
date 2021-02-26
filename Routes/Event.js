const router = require("express").Router();
const eventcontroller = require("../Controllers/EventController.js");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/create").post(verifytoken, eventcontroller.create);
// router.route("/getall").post(verifytoken, eventcontroller.viewall);
// router.route("/update/").post(verifytoken, eventcontroller.create);
module.exports = router;
