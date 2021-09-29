import WebSockets from 'ws'

const sockets = []

const setNickname = (socket, nickname) => {
  socket['nickname'] = nickname
}

const broadcastMessage = (socket, message) => {
  const prettyMessage = `${socket.nickname}: ${message}`

  sockets.forEach((sock) => sock.send(prettyMessage))
}

const init = (server) => {
  const wsServer = new WebSockets.Server({ server })

  wsServer.on('connection', (socket) => {
    console.log('⛓️  New client connection')
    socket['nickname'] = 'ANON'
    sockets.push(socket)

    socket.on('message', (message) => {
      const messageString = message.toString()
      const { type, payload } = JSON.parse(messageString)
      console.log(
        `⛓️  Message received from server: type: '${type}', payload: '${payload}'`,
      )

      if (type === 'nickname') return setNickname(socket, payload)
      if (type === 'userMessage') return broadcastMessage(socket, payload)
    })

    socket.on('close', () => console.log('⛓️  Disconnected from client'))
  })
}

export default init
