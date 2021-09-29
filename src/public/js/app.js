const { host } = window.location

const messages = document.querySelector('ul')
const nicknameForm = document.querySelector('#nickname')
const messageForm = document.querySelector('#message')

const socket = new WebSocket(`ws://${host}`)

socket.addEventListener('open', () => {
  console.log('⛓️ Connected to WebSocket server.')
})

socket.addEventListener('message', (message) => {
  const { data } = message
  console.log(`⛓️ Message received from server: '${data}'`)

  const li = document.createElement('li')
  li.innerText = data
  messages.append(li)
})

socket.addEventListener('error', (error) => {
  console.error('⛓️ Web Socket Error:', error)
})

socket.addEventListener('close', () => {
  console.log('⛓️ Disconnected from WebSocket server.')
})

const sendMessage = (message) => {
  console.log(`⛓️ Sending message to server: '${message}'`)
  socket.send(message)
}

const buildMessage = (type, payload) => {
  const message = { type, payload }
  const messageJSON = JSON.stringify(message)

  return messageJSON
}

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const { value: nickname } = nicknameForm.querySelector('input')
  const message = buildMessage('nickname', nickname)

  sendMessage(message)
})

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const { value: content } = messageForm.querySelector('input')
  const message = buildMessage('userMessage', content)

  sendMessage(message)
})
