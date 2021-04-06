const router = require("express").Router();
const eventcontroller = require("../Controllers/NotificatonController");
const verifytoken = require("../Middleware/IsAuthenticated.js");
router.route("/get").post(verifytoken, eventcontroller.GetNotifications);
module.exports = router;
