const router = require("express").Router();
const eventcontroller = require("../Controllers/EventController.js");
router.route("/create").post(eventcontroller.create);
module.exports = router;
