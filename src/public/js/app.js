const socket = io()

const welcome = document.getElementById('welcome')
const roomForm = welcome.querySelector('form')

roomForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = roomForm.querySelector('input')
  socket.emit('enterRoom', { payload: input.value }, () => {
    console.log('⛓️  Enter room message processed.')
  })

  console.log('⛓️  Enter room message sent.')
  input.value = ''
})
