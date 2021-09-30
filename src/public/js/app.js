const socket = io()

const room = document.getElementById('room')
const roomTitle = room.querySelector('h2')
const messages = room.querySelector('ul')
const sendMessageForm = room.querySelector('form')
const leaveRoomButton = document.getElementById('leave_room')

room.hidden = true

const welcome = document.getElementById('welcome')
const joinRoomForm = welcome.querySelector('form')

joinRoomForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = joinRoomForm.querySelector('input')
  const { value: roomName } = input

  const showRoom = (msg) => {
    console.log('⛓️  Enter room message processed:', msg)

    welcome.hidden = true
    room.hidden = false

    roomTitle.textContent = `Room ${roomName}`
  }

  socket.emit('enterRoom', roomName, showRoom)
  console.log('⛓️  Enter room message sent.')
  input.value = ''
})

leaveRoomButton.addEventListener('click', () =>
  console.log('TODO: Leave room on click.'),
)

const addMessage = (message) => {
  const messageElement = document.createElement('li')
  messageElement.innerText = message

  messages.appendChild(messageElement)
}

socket.on('welcome', () => {
  addMessage('Someone joined this room.')
})

sendMessageForm.addEventListener('submit', (event) => {})
