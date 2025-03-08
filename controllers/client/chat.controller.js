const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const RoomChat = require("../../models/room-chat.model")

const chatSocket = require("../../sockets/client/chat.socket");

const moment = require("moment")

// GET /chat
module.exports.index = async (req, res) => {
  if (res.locals.user) {
    const userId = res.locals.user.id;

    let roomChatId = ""
    let chatter = ""
    let chats = []

    if (req.params.chatterId) {
      const chatterId = req.params.chatterId

      chatter = await User.findById(chatterId).select("avatar fullName online")
    
      const roomChatExist = await RoomChat.findOne({
        $and: [
            { users: { $all: [userId, chatterId] } }, // Đảm bảo chứa cả 2 user
            { users: { $size: 2 } } // Đảm bảo đúng 2 phần tử
        ]
      });

      if(!roomChatExist) {
        const roomChatData = {
          title: chatter.fullName,
          avatar: chatter.avatar,
          users: [userId, chatterId]
        }; 

        const roomChat = new RoomChat(roomChatData)
	      await roomChat.save(); 
        roomChatId = roomChat._id

      } else {
        roomChatId = roomChatExist.id

        chats = await Chat.find({
          roomChatId: roomChatExist.id
        });

        for (const chat of chats) {
          const infoUser = await User.findOne({
            _id: chat.userId
          });

          chat.fullName = infoUser.fullName;
          chat.avatar = infoUser.avatar
          chat.createdFormatAt = moment(chat.createdAt).format("DD/MM/YYYY HH:mm:ss")
        }

      }
    }

    // lấy ra tẩt cả roomChat mà trong mảng users có chứa userId
    const roomsChat = await RoomChat.find({
      $and: [
          { users: { $all: [userId] } }, // Đảm bảo chứa cả 2 user
          { users: { $size: 2 } } // Đảm bảo đúng 2 phần tử
      ]
    }).select("users");

    let arrayChatter = []
    for (const roomChat of roomsChat) {
      const array = roomChat.users;
      const chatter = array.filter(element => element != userId)[0]
      arrayChatter.push(chatter)
    }

    const chatters = await User.find({
      _id: { $in: arrayChatter }, 
    })

    // SocketIO
    chatSocket(req, res, roomChatId);
    // End SocketIO


    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
      chats: chats,
      chatters : chatters,
      chatter: chatter
    })
  } else {
    res.redirect("/user/login")
  }
}