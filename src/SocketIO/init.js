import { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'

const serverConfig = {
  cors: { origin: ['https://admin.socket.io'], credentials: true },
}

const init = httpServer => {
  const io = new Server(httpServer, serverConfig)
  instrument(io, { auth: false })

  io.on('connection', socket => {
    socket.onAny((event, ...args) => {
      console.log(`🔌 Socket ${socket.id} event: '${event}'`)
    })

    socket.on('join_room', (roomName, done) => {
      socket.join(roomName)
      done()
      socket.to(roomName).emit('welcome')
    })
  })
}

export default init
