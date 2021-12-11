const callChat = document.getElementById('messages')

const chatMessageForm = document.getElementById('chat_message_form')
const chatMessageInput = chatMessageForm.querySelector('input')

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

chatMessageForm.addEventListener('submit', event => {
  event.preventDefault()
  if (!chatChannel) return

  const message = chatMessageInput.value
  chatChannel.send(message)

  const prettyMessage = `You: ${message}`
  addChatMessage(prettyMessage)

  chatMessageInput.value = ''
})
