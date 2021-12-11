const callChat = document.getElementById('call_chat')

const addInfoMessage = message => {
  const messageP = document.createElement('p')
  messageP.className = 'info_message'
  messageP.innerText = message

  callChat.appendChild(messageP)
}

const addChatMessage = message => {
  const messageP = document.createElement('p')
  messageP.className = 'chat_message'
  messageP.innerText = message

  callChat.appendChild(messageP)
}
