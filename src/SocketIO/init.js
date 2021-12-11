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

    socket.on('join_room', roomName => {
      socket.join(roomName)

      socket.to(roomName).emit('welcome')
    })

    socket.on('offer', (offer, roomName) => {
      socket.to(roomName).emit('offer', offer)
    })

    socket.on('answer', (answer, roomName) => {
      socket.to(roomName).emit('answer', answer)
    })

    socket.on('ice', (ICECandidate, roomName) => {
      socket.to(roomName).emit('ice', ICECandidate)
    })
  })
}

export default init
