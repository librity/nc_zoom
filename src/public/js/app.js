const socket = io()

const userVideoElement = document.getElementById('user_video')
const muteButton = document.getElementById('mute')
const cameraOffButton = document.getElementById('shut_camera')

let userVideo
let muted = false
let cameraOn = false

const getUserVideo = async () => {
  const constriants = {
    audio: true,
    video: true,
  }

  try {
    userVideo = await navigator.mediaDevices.getUserMedia(constriants)
    userVideoElement.srcObject = userVideo

    cameraOn = true
  } catch (error) {
    console.log(error)
  }
}

getUserVideo()

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

cameraOffButton.addEventListener('click', () => {
  if (!userVideo) return

  if (cameraOn) {
    userVideo.getVideoTracks().forEach(track => (track.enabled = true))

    cameraOn = false
    cameraOffButton.innerText = 'Turn Camera Off'
    return
  }

  userVideo.getVideoTracks().forEach(track => (track.enabled = false))
  cameraOn = true
  cameraOffButton.innerText = 'Turn Camera On'
})
