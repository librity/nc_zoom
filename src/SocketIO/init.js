import SocketIO from 'socket.io'

const init = server => {
  const io = SocketIO(server)

  const getActiveRooms = () => {
    const socketIds = io.sockets.adapter.sids
    const rooms = io.sockets.adapter.rooms
    const publicRooms = []

    rooms.forEach((_, roomId) => {
      const isPublic = socketIds.get(roomId) === undefined
      if (!isPublic) return

      publicRooms.push(roomId)
    })

    return publicRooms
  }

  io.on('connection', socket => {
    socket['nickname'] = 'Anon'
    socket.emit('active_rooms_change', getActiveRooms())

    socket.onAny((event, ...args) => {
      console.log(`🔌 Socket ${socket.id} event: '${event}'`)
    })

    socket.on('disconnecting', () => {
      socket.rooms.forEach(room => {
        socket.to(room).emit('user_left_room', socket.nickname)
      })
    })

    socket.on('enter_room', (room, done) => {
      socket.join(room)
      done(`Successfully joined room '${room}'`)

      socket.to(room).emit('user_joined_room', socket.nickname)
      io.sockets.emit('active_rooms_change', getActiveRooms())
    })

    socket.on('leave_room', (room, done) => {
      socket.leave(room)
      socket.to(room).emit('user_left_room', socket.nickname)

      done()
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
