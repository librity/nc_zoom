const callDiv = document.getElementById('call')
const muteButton = document.getElementById('mute')
const cameraButton = document.getElementById('shut_camera')
const cameraSelector = document.getElementById('camera_selector')

callDiv.hidden = true

muteButton.addEventListener('click', () => {
  if (!myStream) return

  if (muted) {
    myStream.getAudioTracks().forEach(track => (track.enabled = true))

    muted = false
    muteButton.innerText = 'Mute'
    return
  }

  myStream.getAudioTracks().forEach(track => (track.enabled = false))

  muted = true
  muteButton.innerText = 'Unmute'
})

cameraButton.addEventListener('click', () => {
  if (!myStream) return

  if (cameraOn) {
    myStream.getVideoTracks().forEach(track => (track.enabled = false))

    cameraOn = false
    cameraButton.innerText = 'Turn Camera On'
    return
  }

  myStream.getVideoTracks().forEach(track => (track.enabled = true))
  cameraOn = true
  cameraButton.innerText = 'Turn Camera Off'
})

cameraSelector.addEventListener('input', async () => {
  const targetCameraId = cameraSelector.value
  await getUserVideo(targetCameraId)

  if (!myPeerConnection) return

  const newTrack = myStream.getVideoTracks()[0]
  if (!newTrack) return

  const videoSender = myPeerConnection
    .getSenders()
    .find(sender => (sender.track.kind = 'video'))
  videoSender.replaceTrack(newTrack)
})
