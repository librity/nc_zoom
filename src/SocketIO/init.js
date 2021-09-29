import SocketIO from 'socket.io'

const init = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.on('enterRoom', (...message) => {
      console.log(message)
      const done = message[message.length - 1]

      setTimeout(done, 5000)
    })
  })
}

export default init
