const { host } = window.location

const socket = new WebSocket(`ws://${host}`)

socket.addEventListener('open', () => {
  console.log('⛓️ Connected to WebSocket server.')
})

socket.addEventListener('message', (message) => {
  console.log(`⛓️ Message received from server: '${message.data}'`)
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

const messages = document.querySelector('ul')
const messageForm = document.querySelector('form')

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const { value } = messageForm.querySelector('input')

  sendMessage(value)
})
