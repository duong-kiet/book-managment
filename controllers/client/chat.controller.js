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

        // tìm ra tất cả chat có trong room này 
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
    }).select("title avatar users");

    // lấy ra tất cả user bên side bar (có cùng roomChatId với user)
    for (const roomChat of roomsChat) {
      const array = roomChat.users;
      const chatterId = array.filter(element => element != userId)[0]
      
      const chatter = await User.findById(chatterId).select("_id avatar fullName online")

      // lấy ra được chatterId cho mỗi roomChat
      roomChat.chatterInfo = chatter
    }

    let lastMessages = await Chat.find({
      last: true,
    }).sort({ 
      createdAt: -1 
    }).select("message roomChatId createdAt userId")


    for (const lastMessage of lastMessages) {
      for (const roomChat of roomsChat) {
        if (lastMessage.roomChatId == roomChat.id) {
          roomChat.lastMessage = lastMessage.message,
          roomChat.lastTime = lastMessage.createdAt,
          roomChat.userId = lastMessage.userId
        }
      }
    }
    // Sắp xếp từ mới nhất đến cũ nhất
    roomsChat.sort((a, b) => b.lastTime - a.lastTime);

    function getName(name) {
      const array = name.split(" ");
      return array[array.length-1]
    }

    // SocketIO
    chatSocket(req, res, roomChatId);
    // End SocketIO

    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
      chats: chats,
      chatter: chatter,
      roomsChat: roomsChat,
      getName
    })
  } else {
    res.redirect("/user/login")
  }
}