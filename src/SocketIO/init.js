import SocketIO from 'socket.io'

const init = server => {
  const io = SocketIO(server)

  io.on('connection', socket => {
    socket['nickname'] = 'Anon'
    socket.emit('active_rooms_change', getActiveRooms())

    socket.onAny((event, ...args) => {
      console.log(`🔌 Socket ${socket.id} event: '${event}'`)
    })

    socket.on('disconnecting', () => {
      socket.rooms.forEach(room => {
        socket
          .to(room)
          .emit('user_left_room', socket.nickname, countRoomUsers(room))
      })
    })

    socket.on('disconnect', () => {
      notifyActiveRoomsChange()
    })

    socket.on('enter_room', (room, done) => {
      socket.join(room)
      const usersCount = countRoomUsers(room)
      done(`Successfully joined room '${room}'`, usersCount)

      socket.to(room).emit('user_joined_room', socket.nickname, usersCount)
      notifyActiveRoomsChange()
    })

    socket.on('leave_room', (room, done) => {
      socket.leave(room)
      socket
        .to(room)
        .emit('user_left_room', socket.nickname, countRoomUsers(room))
      done()

      notifyActiveRoomsChange()
    })

    socket.on('set_nickname', nickname => {
      socket['nickname'] = nickname
    })

    socket.on('send_room_message', (message, room, done) => {
      socket.to(room).emit('new_room_message', `${socket.nickname}: ${message}`)
      done()
    })
  })

  const notifyActiveRoomsChange = () => {
    io.sockets.emit('active_rooms_change', getActiveRooms())
  }

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

  const countRoomUsers = roomName => {
    const room = io.sockets.adapter.rooms.get(roomName)
    if (room === undefined) return 0

    return room.size
  }
}

export default init
