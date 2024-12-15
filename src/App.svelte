<script>
  /** @type {HTMLVideoElement} */
  let video

  /** @type {MediaDeviceInfo[]} */
  let devices = $state([])
  navigator.mediaDevices.enumerateDevices().then((enumeratedDevices) => {
    devices = enumeratedDevices
  })

  let cameraDevices = $derived(devices.filter(({ kind }) => kind === 'videoinput'))

  /** @type {MediaDeviceInfo | null} */
  let selectedDevice = $state(null)

  function setVideoSource(source) {
    video.srcObject = source
  }

  function unsetVideoSource() {
    video.srcObject?.getTracks().forEach((track) => track.stop())
    video.srcObject = null
  }

  $effect(() => {
    if (!selectedDevice) {
      unsetVideoSource()
      return
    }

    unsetVideoSource()
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          deviceId: selectedDevice.deviceId,
        },
      })
      .then(setVideoSource)
  })
</script>

<main>
  <video bind:this={video} muted autoplay></video>
  <div>
    <select bind:value={selectedDevice}>
      <option value={null}>(Not Selected)</option>
      {#each cameraDevices as device}
        <option value={device}>
          {device.label}
        </option>
      {/each}
    </select>
  </div>
</main>

<style>
  video {
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    transform: rotate(180deg) scaleX(-1);
    pointer-events: none;
  }
</style>
