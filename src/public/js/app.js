const socket = io()

var currentRoom

const roomSection = document.getElementById('room')
const roomTitle = roomSection.querySelector('h3')
const messages = roomSection.querySelector('ul')

const setNicknameForm = roomSection.querySelector('form#nickname')
const sendMessageForm = roomSection.querySelector('form#message')
const leaveRoomButton = document.getElementById('leave_room')

roomSection.hidden = true

const welcome = document.getElementById('welcome')
const joinRoomForm = welcome.querySelector('form')

joinRoomForm.addEventListener('submit', event => {
  event.preventDefault()
  const input = joinRoomForm.querySelector('input')
  const { value: roomName } = input

  const showRoom = msg => {
    console.log('⛓️  Enter room message processed:', msg)

    welcome.hidden = true
    roomSection.hidden = false
    roomTitle.textContent = `Room ${roomName}`

    currentRoom = roomName
  }

  socket.emit('enter_room', roomName, showRoom)
  console.log('⛓️  Enter room request sent.')
  input.value = ''
})

leaveRoomButton.addEventListener('click', () => {
  const hideRoom = msg => {
    console.log('⛓️  Leave room message processed:', msg)

    welcome.hidden = false
    roomSection.hidden = true
    roomTitle.textContent = ''

    currentRoom = null
  }

  socket.emit('leave_room', currentRoom, hideRoom)
  console.log('⛓️  Leave room request sent.')
})

setNicknameForm.addEventListener('submit', event => {
  event.preventDefault()
  const { value: nickname } = setNicknameForm.querySelector('input')

  socket.emit('set_nickname', nickname)
  console.log('⛓️  Set nickname request sent.')
})

sendMessageForm.addEventListener('submit', event => {
  event.preventDefault()
  const input = sendMessageForm.querySelector('input')
  const { value: message } = input

  socket.emit('send_room_message', message, currentRoom, () => {
    addMessage(`You: ${message}`)
  })
  console.log('⛓️  Send room message request sent.')

  input.value = ''
})

const addMessage = message => {
  const messageElement = document.createElement('li')
  messageElement.innerText = message

  messages.appendChild(messageElement)
}

socket.on('user_joined_room', nickname => {
  console.log('⛓️  User joined room notification received.')
  addMessage(`${nickname} joined this room.`)
})

socket.on('user_left_room', nickname => {
  console.log('⛓️  User left room notification received.')
  addMessage(`${nickname} left this room.`)
})

socket.on('new_room_message', message => {
  console.log('⛓️  New room message received.')
  addMessage(message)
})
