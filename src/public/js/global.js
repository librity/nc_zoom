const socket = io()

let myStream
let muted = true
let cameraOn = false

let roomName = ''

let myPeerConnection
let chatChannel

const userVideoElement = document.getElementById('user_video')
const peerVideoElement = document.getElementById('peer_video')
