import http from 'http'
import WebSockets from 'ws'

import App from './App'

const port = 3000

const server = http.createServer(App)
const wsServer = new WebSockets.Server({ server })

const handleListen = () => {
  console.log(`👂 HTTP server listening on http://localhost:${port}`)
  console.log(`⛓️  WebSockets server listening on ws://localhost:${port}`)
}
server.listen(port, handleListen)
