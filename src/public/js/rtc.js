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

  setUpChat()

  myStream.getTracks().forEach(track => {
    myPeerConnection.addTrack(track, myStream)
  })
}

const handleICECandidate = data => {
  console.log('found ICE candidate')

  socket.emit('ice', data.candidate, roomName)
}

const handleAddStream = data => {
  console.log('got a stream from peer')
  addInfoMessage("Receiving peer's audio and video stream.")

  peerVideoElement.srcObject = data.stream
}

const setUpChat = () => {
  const chatChannelOptions = {
    negotiated: true,
    id: 0,
  }

  chatChannel = myPeerConnection.createDataChannel('chat', chatChannelOptions)
  chatChannel.onmessage = event => {
    const prettyMessage = `New message: ${event.data}`

    addChatMessage(prettyMessage)
  }
}
