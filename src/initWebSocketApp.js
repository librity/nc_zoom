import WebSockets from 'ws'

const initWebSocketApp = (server) => {
  const wsServer = new WebSockets.Server({ server })

  wsServer.on('connection', (socket) => {
    console.log('⛓️  New client connection')

    socket.on('message', (message) => {
      const messageString = message.toString()
      console.log(`⛓️  Message received from server: '${messageString}'`)

      socket.send(messageString)
    })

    socket.on('close', () => console.log('⛓️  Disconnected from client'))

    socket.send('Hello!')
  })
}

export default initWebSocketApp
