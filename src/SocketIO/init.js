import SocketIO from 'socket.io'

const init = server => {
  const io = SocketIO(server)

  io.on('connection', socket => {
    socket['nickname'] = 'Anon'

    socket.onAny((event, ...args) =>
      console.log(`🔌 Socket ${socket.id} event: '${event}'`),
    )

    socket.on('enter_room', (room, done) => {
      socket.join(room)
      done(`Successfully joined room '${room}'`)

      socket.to(room).emit('user_joined_room', socket.nickname)
    })

    socket.on('leave_room', (room, done) => {
      socket.leave(room)
      socket.to(room).emit('user_left_room', socket.nickname)

      done()
    })

    socket.on('disconnecting', () => {
      socket.rooms.forEach(room => {
        socket.to(room).emit('user_left_room', socket.nickname)
      })
    })

    socket.on('set_nickname', nickname => {
      socket['nickname'] = nickname
    })

    socket.on('send_room_message', (message, room, done) => {
      socket.to(room).emit('new_room_message', `${socket.nickname}: ${message}`)
      done()
    })
  })
}

export default init
