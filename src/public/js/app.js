const socket = io()

const myFace = document.getElementById('my_face')
const muteButton = document.getElementById('mute')
const cameraOffButton = document.getElementById('shut_camera')

let muted = false
let cameraOn = true

const getUserVideo = async () => {
  let userVideoStream

  const constriants = {
    audio: false,
    video: true,
  }

  try {
    userVideoStream = await navigator.mediaDevices.getUserMedia(constriants)
  } catch (error) {
    console.log(error)
  }

  return userVideoStream
}

getUserVideo().then(userVideoStream => {
  myFace.srcObject = userVideoStream
})

muteButton.addEventListener('click', () => {
  if (muted) {
    muted = false
    muteButton.innerText = 'Mute'
    return
  }

  muted = true
  muteButton.innerText = 'Unmute'
})

cameraOffButton.addEventListener('click', () => {
  if (cameraOn) {
    cameraOn = false
    cameraOffButton.innerText = 'Turn Camera Off'
    return
  }

  cameraOn = true
  cameraOffButton.innerText = 'Turn Camera On'
})
