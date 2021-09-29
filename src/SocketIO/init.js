import SocketIO from 'socket.io'

const init = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.on('enterRoom', (message, done) => {
      console.log(message)

      setTimeout(done, 5000)
    })
  })
}

export default init
