let users = [];
const Message = require("../Models/Chats");

const getmsgs = async (room) => {
  return await Message.find({
    room: room,
  }).select("_id room sender content");
};
const socketmesage = async (socket, io) => {
  try {
    if (!users[socket.id]) {
      users[socket.id] = socket.id;
      socket.emit("init", "connected");
    }
    socket.emit("yourID", socket.id);
    socket.emit("allUsers", users);
    socket.on("disconnect", () => {
      delete users[socket.id];
    });

    socket.on("room", async (room) => {
      if (room.name) {
        socket.nickname = room.name;
        socket.join(room.r_name);

        const messages = await getmsgs(room.r_name);

        socket.emit("joined_room", messages);
      }
    });

    socket.on("message", async (msg) => {
      console.log("Mesage in server ");
      console.log(msg);

      const message = await new Message({
        room: msg.room,
        sender: msg.sender,
        content: msg.content,
      });
      const userdata = await message.save();

      socket.to(msg.room).emit("message_push", userdata);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.socketmesage = socketmesage;
