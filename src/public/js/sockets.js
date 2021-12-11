socket.on('someone_joined', async () => {
  console.log('🔌 Peer joined room.')
  addInfoMessage('Someone joined the room.')

  const offer = await myPeerConnection.createOffer()
  myPeerConnection.setLocalDescription(offer)

  socket.emit('offer', offer, roomName)
  console.log('🔌 Broadcasting RTC offer.')
})

socket.on('offer', async offer => {
  console.log('🔌 Received RTC offer.')

  myPeerConnection.setRemoteDescription(offer)

  const answer = await myPeerConnection.createAnswer()
  myPeerConnection.setLocalDescription(answer)

  socket.emit('answer', answer, roomName)
  console.log('🔌 Broadcasting RTC answer.')
})

socket.on('answer', answer => {
  console.log('🔌 Received RTC answer.')

  myPeerConnection.setRemoteDescription(answer)
})

socket.on('ice', ICECandidate => {
  console.log('🔌 Received ICE candidate.')

  myPeerConnection.addIceCandidate(ICECandidate)
})

socket.on('peer_left_room', () => {
  console.log('🔌 Peer has left the room.')
  addInfoMessage('Peer has left room.')

  removePeerVideo()
  connectRTC()
})
