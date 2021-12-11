socket.on('welcome', async () => {
  console.log('someone joined the room')

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

socket.on('answer', async answer => {
  console.log('received RTC answer')

  myPeerConnection.setRemoteDescription(answer)
})

socket.on('ice', async ICECandidate => {
  console.log('received ICE candidate')

  myPeerConnection.addIceCandidate(ICECandidate)
})
