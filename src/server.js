import http from 'http'

import ExpressApp from './ExpressApp'
import initWebSocketApp from './initWebSocketApp'

const port = 3000

const server = http.createServer(ExpressApp)
initWebSocketApp(server)

const handleListen = () => {
  console.log(`👂 HTTP server listening on http://localhost:${port}`)
  console.log(`⛓️  WebSockets server listening on ws://localhost:${port}`)
}
server.listen(port, handleListen)
