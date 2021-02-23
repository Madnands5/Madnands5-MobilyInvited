const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const socketmesage = require("./Utility/Socket");
var bodyParser = require("body-parser");
var cors = require("cors");
const express = require("express");
const app = require("express")();
const server = require("http").createServer(app);
const authRoute = require("./Routes/Auth.js");
const eventRoute = require("./Routes/Event.js");

const options = {
  /* ... */
};
const io = require("socket.io")(server, options);
io.on("connection", function (socket) {
  socketmesage.socketmesage(socket, io);
});
dotenv.config();

mongoose.set("useFindAndModify", false);
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);
mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection has occured " + err + " error");
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection is disconnected");
});

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/auth", authRoute);
app.use("/event", eventRoute);
let PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}
server.listen(PORT, () =>
  console.log("server:http://localhost:" + process.env.PORT + "/")
);
