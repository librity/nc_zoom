import App from './App'

const port = 3000

const logListen = () =>
  console.log(`👂 Server listening on http://localhost:${port}`)

App.listen(port, logListen)
