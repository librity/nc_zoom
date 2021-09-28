const { host } = window.location

const socket = new WebSocket(`ws://${host}`)

socket.addEventListener('open', () => {
  console.log('⛓️ Connected to WebSocket server.')
})

socket.addEventListener('message', (message) => {
  console.log(`⛓️ Message received from server: '${message.data}'`)
})

socket.addEventListener('error', (error) => {
  console.error('Web Socket Error:', error)
})

socket.addEventListener('close', () => {
  console.log('⛓️ Disconnected from WebSocket server.')
})

setTimeout(() => {
  message = 'Hello from the browser'
  socket.send(message)
  console.log(`⛓️ Message sent to server: '${message}'`)
}, 5000)
