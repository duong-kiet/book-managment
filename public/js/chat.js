import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
var socket = io();

// CLIENT_SEND_MESSAGE
const formChat = document.querySelector("[form-chat]")
if(formChat) {
  formChat.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = event.target.message.value
    if(message) {
      socket.emit("CLIENT_SEND_MESSAGE", {
        message: message
      });
      event.target.message.value = "";
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  })
}
// End CLIENT_SEND_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector("[body-chat]");
if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight
}
// End Scroll Chat To Bottom

// Add Icon to Chat
const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  const inputChat = document.querySelector("input[name='message']");

  emojiPicker.addEventListener('emoji-click', (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End Add Icon to Chat

// Show Popup Icon
const btnIcon = document.querySelector("[btn-icon]");
if(btnIcon) {
  const tooltip = document.querySelector('.tooltip');
  // Popper.createPopper(btnIcon, tooltip);

  btnIcon.addEventListener("click", () => {
    console.log("Hi")
    tooltip.classList.toggle('shown');
  });
}
// End Show Popup Icon

// Typing
const inputChat = document.querySelector('input[name="message"]');
var typingTimeOut;
if(inputChat) {
  inputChat.addEventListener("keyup", () => {
    // console.log("Okay")
    socket.emit("CLIENT_SEND_TYPING", "show");

    clearTimeout(typingTimeOut);

    typingTimeOut = setTimeout(() => {
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
  })
}
// End Typing

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".list-typing");
socket.on("SERVER_RETURN_TYPING", (data) => {
  if(data.type == "show") {
    const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(!existTyping) {
      const boxTyping = document.createElement("div");
      boxTyping.classList.add("d-flex", "flex-row", "justify-content-start", "align-items-center", "box-typing")
      boxTyping.setAttribute("user-id", data.userId);
      boxTyping.innerHTML = `
        <img src=${data.avatar} alt='avatar 1' style='width: 45px; height: 100%; border-radius: 50%'>
        <div> 
          <p class="small ms-3 mb-2 fw-bold">${data.fullName}</p>
          <div class="inner-dots ms-3"><span></span><span></span><span></span></div>
        </div>
      `;

      elementListTyping.appendChild(boxTyping);
      bodyChat.scrollTop = bodyChat.scrollHeight
    }
  } else {
    const boxTypingDelete = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(boxTypingDelete) {
      elementListTyping.removeChild(boxTypingDelete);
    }
  }
})
// End SERVER_RETURN_TYPING

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[body-chat]").getAttribute("body-chat");

  const div = document.createElement("div");
  let htmlFullName = "";

  if(data.userId == myId) {
    div.classList.add("d-flex", "flex-row", "justify-content-end")
    div.innerHTML = `
      <div> 
        <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${data.message}</p>
      </div>
    `;
  } else {
    div.classList.add("d-flex", "flex-row", "justify-content-start", "align-items-center")
    div.innerHTML = `
      <img src=${data.avatar} alt='avatar 1' style='width: 45px; height: 100%; border-radius: 50%'>
      <div> 
        <p class="small ms-3 mb-2 fw-bold">${data.fullName}</p>
        <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary" style="border: 0.5px solid #efefef;">${data.message}</p>
      </div>
    `;
  }

  const body = document.querySelector("[body-chat]");
  body.insertBefore(div, elementListTyping);
  body.scrollTop = body.scrollHeight;
});
// End SERVER_RETURN_MESSAGE

// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (data) => {
  const onlineStatus = document.querySelector(`p[userId="${data.userId}"]`);
  if(onlineStatus) {
    console.log(data.status)
    onlineStatus.setAttribute("online-status", data.status);
    onlineStatus.innerText = data.status
  }
})
// End SERVER_RETURN_USER_ONLINE

const onlineStatusUsers = document.querySelectorAll("p[online-status]")
if (onlineStatusUsers) {
  onlineStatusUsers.forEach(element => {
    if(element.getAttribute("online-status") == "Online") {
      element.innerText = "Online"
    }
    else {
      element.innerText = "Offline"
    }
  })
}