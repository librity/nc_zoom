const joinRoomDiv = document.getElementById('join_room')
const joinRoomForm = document.getElementById('join_room_form')

const startCall = async () => {
  joinRoomDiv.hidden = true
  callDiv.hidden = false

  await getUserVideo()
  addInfoMessage('Audio and Video ready.')
  connectRTC()
}

joinRoomForm.addEventListener('submit', async event => {
  event.preventDefault()
  await startCall()

  const input = joinRoomForm.querySelector('input')
  socket.emit('join_room', input.value)
  console.log('🔌 Join room request sent.')

  roomName = input.value
  input.value = ''
})
