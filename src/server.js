import http from 'http'

import ExpressApp from './Express'
import initSocketIO from './SocketIO/init'

const port = process.env.PORT || 3000

const server = http.createServer(ExpressApp)
initSocketIO(server)

const handleListen = () => {
  console.log(`👂 HTTP server listening on http://localhost:${port}`)
}
server.listen(port, handleListen)
