const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const moment = require("moment")

// GET /chat
module.exports.index = async (req, res) => {
  if (res.locals.user) {
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

    const chats = await Chat.find({});

    for (const chat of chats) {
      const infoUser = await User.findOne({
        _id: chat.userId
      });

      chat.fullName = infoUser.fullName;
      chat.avatar = infoUser.avatar
      chat.createdFormatAt = moment(chat.createdAt).format("DD/MM/YYYY HH:mm:ss")
    }

    const users = await User.find({
      _id: { $ne: userId }
    })

    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
      chats: chats,
      users: users
    })
  } else {
    res.redirect("/user/login")
  }
}