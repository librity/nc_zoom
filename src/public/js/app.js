const { host } = window.location

const socket = new WebSocket(`ws://${host}`)
