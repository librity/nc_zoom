socket.on('welcome', async () => {
  console.log('someone joined the room')

  const offer = await myPeerConnection.createOffer()
  myPeerConnection.setLocalDescription(offer)

  socket.emit('offer', offer, roomName)
})

socket.on('offer', offer => {
  console.log('received RTC offer')
})
