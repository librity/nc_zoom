const connectRTC = () => {
  if (!myStream) return

  myPeerConnection = new RTCPeerConnection()
  myPeerConnection.addEventListener('icecandidate', handleICECandidate)
  myPeerConnection.addEventListener('addstream', handleAddStream)

  myStream.getTracks().forEach(track => {
    myPeerConnection.addTrack(track, myStream)
  })
}

const handleICECandidate = ICECandidate => {
  console.log('found ICE candidate')

  socket.emit('ice', ICECandidate, roomName)
}

const handleAddStream = data => {
  console.log('got a stream from peer')

  peerVideoElement.srcObject = data.stream
}
