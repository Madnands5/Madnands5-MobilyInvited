let users = [];
const Message = require("../Models/Chats");
const getmsgs = async (room) => {
  return await Message.find({
    room: room,
  }).select("_id room sender content");
};
const socketmesage = async (socket, io) => {
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
    socket.emit("init", "connected");
  }
  socket.emit("yourID", socket.id);
  sockets.emit("allUsers", users);
  socket.on("disconnect", () => {
    delete users[socket.id];
  });

  socket.on("room", async (room) => {
    io.in(room.r_name).clients(async (error, clients) => {
      if (error) throw error;
      console.log("clients :" + clients.length);
      if (room.name) {
        socket.nickname = room.name;
        socket.join(room.r_name);

        //get room data
        const messages = await getmsgs(room.r_name);
        console.log("messages");
        console.log(messages);
        console.log("clients :" + clients.length);
        socket.emit("joined_room", messages);
      } else {
        console.log("cant joim private room");
      }
    });
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
};
exports.socketmesage = socketmesage;
