const callDiv = document.getElementById('call')
const userVideoElement = document.getElementById('user_video')
const muteButton = document.getElementById('mute')
const cameraButton = document.getElementById('shut_camera')
const cameraSelector = document.getElementById('camera_selector')

callDiv.hidden = true

muteButton.addEventListener('click', () => {
  if (!userVideo) return

  if (muted) {
    userVideo.getAudioTracks().forEach(track => (track.enabled = true))

    muted = false
    muteButton.innerText = 'Mute'
    return
  }

  userVideo.getAudioTracks().forEach(track => (track.enabled = false))

  muted = true
  muteButton.innerText = 'Unmute'
})

cameraButton.addEventListener('click', () => {
  if (!userVideo) return

  if (cameraOn) {
    userVideo.getVideoTracks().forEach(track => (track.enabled = false))

    cameraOn = false
    cameraButton.innerText = 'Turn Camera On'
    return
  }

  userVideo.getVideoTracks().forEach(track => (track.enabled = true))
  cameraOn = true
  cameraButton.innerText = 'Turn Camera Off'
})

cameraSelector.addEventListener('input', async () => {
  const targetCameraId = cameraSelector.value

  await getUserVideo(targetCameraId)
})
