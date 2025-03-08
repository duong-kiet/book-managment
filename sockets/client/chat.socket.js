const Chat = require("../../models/chat.model");
 
module.exports = (req, res, roomChatId) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName
  const avatar = res.locals.user.avatar

  // SocketIO
  _io.once("connection", (socket) => {
    // CLIENT_SEND_MESSAGE
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const chatData = {
        userId: userId,
        message: data.message,
        roomChatId: roomChatId,
        last: true
      };
  
      // Lưu data vào database
      const chat = new Chat(chatData);
      await chat.save();

      await Chat.updateMany(
        { _id: { $ne: chat.id }, 
          last: true ,
          roomChatId: roomChatId
        }, // Điều kiện: _id ≠ 1 và last = true
        { $set: { last: false } } // Cập nhật last thành false
      );

      // Trả tin nhắn realtime về cho mọi người
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        message: data.message,
        avatar: avatar
      });
    })

    // CLIENT_SEND_TYPING
    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        avatar: avatar,
        type: type
      });
    })
  });
  // End SocketIO
}