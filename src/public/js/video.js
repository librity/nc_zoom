const buildConstraints = deviceId => {
  const constriants = {
    // audio: true,
    audio: false,
    video: { facingMode: 'user' },
  }
  if (!deviceId) return constriants

  constriants.video = { deviceId: { exact: deviceId } }
  return constriants
}

const getCameraSelection = async () => {
  cameraSelector.innerHTML = ''

  try {
    const allDevices = await navigator.mediaDevices.enumerateDevices()
    const cameras = allDevices.filter(device => device.kind === 'videoinput')
    const currentCameraLabel = myStream.getVideoTracks()[0].label

    cameras.forEach(camera => {
      const option = document.createElement('option')
      option.value = camera.deviceId
      option.innerText = camera.label

      if (camera.label === currentCameraLabel) {
        option.selected = true
      }
      cameraSelector.appendChild(option)
    })
  } catch (error) {
    console.log(error)
  }
}

const getUserVideo = async deviceId => {
  try {
    const constriants = buildConstraints(deviceId)

    myStream = await navigator.mediaDevices.getUserMedia(constriants)
    userVideoElement.srcObject = myStream
    muted = false
    cameraOn = true

    if (!deviceId) await getCameraSelection()
  } catch (error) {
    console.log(error)
  }
}

const removeUserVideo = () => {
  userVideoElement.srcObject = undefined

  myStream = undefined
  muted = true
  cameraOn = false

  cameraSelector.innerHTML = ''
}
