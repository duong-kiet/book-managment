const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const moment = require("moment")

// GET /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName
  const avatar = res.locals.user.avatar

  // SocketIO
  _io.once("connection", (socket) => {
    // CLIENT_SEND_MESSAGE
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      const chatData = {
        userId: userId,
        message: data.message
      };
  
      // Lưu data vào database
      const chat = new Chat(chatData);
      await chat.save();

      // Trả tin nhắn realtime về cho mọi người
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        message: data.message,
        avatar: avatar
      });
    })
  });
  // End SocketIO

  const chats = await Chat.find({});

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.userId
    });

    chat.fullName = infoUser.fullName;
    chat.avatar = infoUser.avatar
    chat.createdFormatAt = moment(chat.createdAt).format("DD/MM/YYYY HH:mm:ss")
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats
  })
}