import WebSockets from 'ws'

const sockets = []

const setNickname = (socket, nickname) => {}

const broadcastMessage = (message) => {
  sockets.forEach((sock) => sock.send(message))
}

const init = (server) => {
  const wsServer = new WebSockets.Server({ server })

  wsServer.on('connection', (socket) => {
    console.log('⛓️  New client connection')
    sockets.push(socket)

    socket.on('message', (message) => {
      const messageString = message.toString()
      const { type, payload } = JSON.parse(messageString)
      console.log(
        `⛓️  Message received from server: type: '${type}', payload: '${payload}'`,
      )

      switch (type) {
        case 'nickname':
          setNickname(socket, payload)
          break

        case 'userMessage':
          broadcastMessage(payload)
          break

        default:
          break
      }
    })

    socket.on('close', () => console.log('⛓️  Disconnected from client'))
  })
}

export default init
