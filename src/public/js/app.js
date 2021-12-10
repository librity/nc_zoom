const socket = io()

const userVideoElement = document.getElementById('user_video')
const muteButton = document.getElementById('mute')
const cameraButton = document.getElementById('shut_camera')
const cameraSelector = document.getElementById('camera_selector')

let userVideo
let muted = true
let cameraOn = false

const getCameras = async () => {
  try {
    const allDevices = await navigator.mediaDevices.enumerateDevices()
    const cameras = allDevices.filter(device => device.kind === 'videoinput')

    cameras.forEach(camera => {
      const option = document.createElement('option')
      option.value = camera.deviceId
      option.innerText = camera.label

      cameraSelector.appendChild(option)
    })
  } catch (error) {
    console.log(error)
  }
}

const getUserVideo = async () => {
  const constriants = {
    audio: true,
    video: true,
  }

  try {
    userVideo = await navigator.mediaDevices.getUserMedia(constriants)
    userVideoElement.srcObject = userVideo
    muted = false
    cameraOn = true

    await getCameras()
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
