let users = [];
const socketmesage = async (socket, io) => {
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  socket.emit("yourID", socket.id);
};
exports.socketmesage = socketmesage;
