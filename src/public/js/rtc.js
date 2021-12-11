const googleTestingSTUNServers = [
  {
    urls: [
      'stun:stun.l.google.com:19302',
      'stun:stun1.l.google.com:19302',
      'stun:stun2.l.google.com:19302',
      'stun:stun3.l.google.com:19302',
      'stun:stun4.l.google.com:19302',
    ],
  },
]

const connectRTC = () => {
  if (!myStream) return

  myPeerConnection = new RTCPeerConnection({
    iceServers: googleTestingSTUNServers,
  })

  myPeerConnection.addEventListener('icecandidate', handleICECandidate)
  myPeerConnection.addEventListener('addstream', handleAddStream)

  initChatChannel()

  myStream.getTracks().forEach(track => {
    myPeerConnection.addTrack(track, myStream)
  })
}

const handleICECandidate = data => {
  console.log('🤝 Found ICE candidate.')

  socket.emit('ice', data.candidate, roomName)
  console.log('🔌 Broadcasting ICE candidate to peer.')
}

const handleAddStream = data => {
  console.log('🤝 Got AV stream from peer.')
  addInfoMessage("Receiving peer's audio and video stream.")

  peerVideoElement.srcObject = data.stream
}

const initChatChannel = () => {
  const chatChannelOptions = {
    negotiated: true,
    id: 0,
  }

  chatChannel = myPeerConnection.createDataChannel('chat', chatChannelOptions)
  chatChannel.onmessage = event => {
    console.log('🤝 Recieved chat message from peer.')
    const prettyMessage = `New message: ${event.data}`

    addChatMessage(prettyMessage)
  }
}

const removePeerConnection = () => {
  myPeerConnection = undefined
  chatChannel = undefined
}

const removePeerVideo = () => {
  peerVideoElement.srcObject = undefined
}
