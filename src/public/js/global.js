const socket = io()

let userVideo
let muted = true
let cameraOn = false
let roomName = ''
let myPeerConnection
