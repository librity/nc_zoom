const connectRTC = () => {
  if (!userVideo) return

  myPeerConnection = new RTCPeerConnection()
  userVideo.getTracks().forEach(track => {
    myPeerConnection.addTrack(track, userVideo)
  })
}
