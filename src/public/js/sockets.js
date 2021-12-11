socket.on('someone_joined', async () => {
  addInfoMessage('Someone joined the room.')

  const offer = await myPeerConnection.createOffer()
  myPeerConnection.setLocalDescription(offer)

  socket.emit('offer', offer, roomName)
  console.log('broadcast RTC offer')
})

socket.on('offer', async offer => {
  console.log('received RTC offer')

  myPeerConnection.setRemoteDescription(offer)

  const answer = await myPeerConnection.createAnswer()
  myPeerConnection.setLocalDescription(answer)

  socket.emit('answer', answer, roomName)
  console.log('broadcast RTC answer')
})

socket.on('answer', answer => {
  console.log('received RTC answer')

  myPeerConnection.setRemoteDescription(answer)
})

socket.on('ice', ICECandidate => {
  console.log('received ICE candidate')

  myPeerConnection.addIceCandidate(ICECandidate)
})
