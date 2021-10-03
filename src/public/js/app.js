const socket = io()

const setNicknameForm = document.querySelector('form#nickname')

var currentRoom

const roomSection = document.getElementById('room')
const roomTitle = roomSection.querySelector('h3#room_title')
const usersCount = roomSection.querySelector('h4#users_count')
const messages = roomSection.querySelector('ul#messages')
const sendMessageForm = roomSection.querySelector('form#new_message')
const leaveRoomButton = document.getElementById('leave_room')

roomSection.hidden = true

const welcome = document.getElementById('join_room')
const activeRooms = welcome.querySelector('ul#active_rooms')
const joinRoomForm = welcome.querySelector('form')

joinRoomForm.addEventListener('submit', event => {
  event.preventDefault()
  const input = joinRoomForm.querySelector('input')
  const { value: roomName } = input

  const showRoom = (msg, newUserCount) => {
    console.log('⛓️ Enter room message processed:', msg)

    welcome.hidden = true
    roomSection.hidden = false
    roomTitle.textContent = `Room ${roomName}`
    updateUserCount(newUserCount)

    currentRoom = roomName
  }

  socket.emit('enter_room', roomName, showRoom)
  console.log('⛓️ Enter room request sent.')
  input.value = ''
})

leaveRoomButton.addEventListener('click', () => {
  const hideRoom = msg => {
    console.log('⛓️ Leave room message processed:', msg)

    welcome.hidden = false
    roomSection.hidden = true
    roomTitle.textContent = ''

    currentRoom = null
  }

  socket.emit('leave_room', currentRoom, hideRoom)
  console.log('⛓️ Leave room request sent.')
})

setNicknameForm.addEventListener('submit', event => {
  event.preventDefault()
  const input = setNicknameForm.querySelector('input')
  const { value: nickname } = input

  socket.emit('set_nickname', nickname)
  console.log('⛓️ Set nickname request sent.')

  input.value = ''
})

sendMessageForm.addEventListener('submit', event => {
  event.preventDefault()
  const input = sendMessageForm.querySelector('input')
  const { value: message } = input

  socket.emit('send_room_message', message, currentRoom, () => {
    addMessage(`You: ${message}`)
  })
  console.log('⛓️ Send room message request sent.')

  input.value = ''
})

const updateUserCount = newUserCount => {
  usersCount.innerText = `Active users: ${newUserCount}`
}

const addMessage = message => {
  const messageElement = document.createElement('li')
  messageElement.innerText = message

  messages.appendChild(messageElement)
}

socket.on('user_joined_room', (nickname, newUserCount) => {
  console.log('⛓️ User joined room notification received.')

  addMessage(`${nickname} joined this room.`)
  updateUserCount(newUserCount)
})

socket.on('user_left_room', (nickname, newUserCount) => {
  console.log('⛓️ User left room notification received.')

  addMessage(`${nickname} left this room.`)
  updateUserCount(newUserCount)
})

socket.on('new_room_message', message => {
  console.log('⛓️ New room message received.')
  addMessage(message)
})

const addActiveRoom = room => {
  const roomElement = document.createElement('li')
  roomElement.innerText = room

  activeRooms.appendChild(roomElement)
}

socket.on('active_rooms_change', newRooms => {
  console.log('⛓️ Active rooms change message received:', newRooms)

  activeRooms.innerHTML = ''
  newRooms.forEach(room => addActiveRoom(room))
})
