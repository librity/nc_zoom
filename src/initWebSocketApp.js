import WebSockets from 'ws'

const handleConnection = (server, socket, request) => {
//   console.log(server)
//   console.log(socket)
//   console.log(request)
  console.log("new connection!")
}

const initWebSocketApp = (server) => {
  const wsServer = new WebSockets.Server({ server })

  wsServer.on('connection', handleConnection)
}

export default initWebSocketApp
