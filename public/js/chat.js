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
    }
  })
}
// End CLIENT_SEND_MESSAGE

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
  body.appendChild(div);

  body.scrollTop = body.scrollHeight - 500;
});
// End SERVER_RETURN_MESSAGE

// Scroll Chat To Bottom
const bodyChat = document.querySelector("[body-chat]");
if(bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight - 500;
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
  Popper.createPopper(btnIcon, tooltip);

  btnIcon.addEventListener("click", () => {
    console.log("Hi")
    tooltip.classList.toggle('shown');
  });
}
// End Show Popup Icon