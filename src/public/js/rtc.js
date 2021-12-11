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

  peerVideoElement.srcObject = data.stream
}
