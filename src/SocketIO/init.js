import SocketIO from 'socket.io'

const init = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    console.log(socket)
  })
}

export default init
