<script>
  import { transform } from './actions/transform.svelte'
  import CameraSelect from './components/CameraSelect.svelte'
  import TransformControls from './components/TransformControls.svelte'

  /** @type {HTMLVideoElement} */
  let video

  /** @type {MediaDeviceInfo[]} */
  let devices = $state([])
  navigator.mediaDevices.enumerateDevices().then((enumeratedDevices) => {
    devices = enumeratedDevices
  })

  let cameraDevices = $derived(devices.filter(({ kind }) => kind === 'videoinput'))

  /** @type {MediaDeviceInfo | null} */
  let selectedCamera = $state(null)

  function setVideoSource(source) {
    video.srcObject = source
  }

  function unsetVideoSource() {
    video.srcObject?.getTracks().forEach((track) => track.stop())
    video.srcObject = null
  }

  $effect(() => {
    if (!selectedCamera) {
      unsetVideoSource()
      return
    }

    unsetVideoSource()
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          deviceId: selectedCamera.deviceId,
        },
      })
      .then(setVideoSource)

    return () => {
      unsetVideoSource()
    }
  })

  let cover = $state(false)
  let flip = $state(false)
  let rotate = $state(false)
</script>

<main>
  <video
    bind:this={video}
    muted
    autoplay
    playsinline
    use:transform={{
      flip: () => flip,
      rotate: () => rotate,
      zoomToCover: () => cover,
    }}
  ></video>

  <div class="controls">
    <CameraSelect bind:value={selectedCamera} cameras={cameraDevices} />
    <TransformControls bind:cover bind:flip bind:rotate />
  </div>
</main>

<style>
  video {
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
  }

  .controls {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    width: fit-content;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    align-items: baseline;
  }
</style>
