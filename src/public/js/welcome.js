const welcomeDiv = document.getElementById('welcome')
const joinRoomForm = document.getElementById('join_room')

const startCall = async () => {
  welcomeDiv.hidden = true
  callDiv.hidden = false

  await getUserVideo()
  connectRTC()
}

joinRoomForm.addEventListener('submit', event => {
  event.preventDefault()
  const input = joinRoomForm.querySelector('input')

  socket.emit('join_room', input.value, startCall)

  roomName = input.value
  input.value = ''
})
