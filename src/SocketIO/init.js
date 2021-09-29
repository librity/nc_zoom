import SocketIO from 'socket.io'

const init = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.onAny((event, ...args) =>
      console.log(`🔌 Socket ${socket.id} event: '${event}'`),
    )

    socket.on('enterRoom', (roomName, done) => {
      socket.join(roomName)

      done(`Successfully joined room '${roomName}'`)
    })
  })
}

export default init
