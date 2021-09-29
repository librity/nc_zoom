const socket = io()

const welcome = document.getElementById('welcome')
const roomForm = welcome.querySelector('form')

roomForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = roomForm.querySelector('input')

  const doneCallback = () => console.log('⛓️  Enter room message processed.')
  socket.emit('enterRoom', { payload: input.value }, doneCallback)

  console.log('⛓️  Enter room message sent.')
  input.value = ''
})
