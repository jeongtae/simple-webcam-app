<script>
  import { transform } from './actions/transform.svelte'

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

  let isZoomToCover = $state(false)
  let isFlipped = $state(false)
  let isRotated = $state(false)
</script>

<main>
  <video
    bind:this={video}
    muted
    autoplay
    playsinline
    use:transform={{
      flip: () => isFlipped,
      rotate: () => isRotated,
      zoomToCover: () => isZoomToCover,
    }}
  ></video>

  <div class="controls">
    <select bind:value={selectedDevice}>
      <option value={null}>(Not Selected)</option>
      {#each cameraDevices as device}
        <option value={device}>
          {device.label || '(Unknown)'}
        </option>
      {/each}
    </select>

    <div>
      <label>
        <input type="checkbox" bind:checked={isZoomToCover} />
        Zoom to cover
      </label>
    </div>

    <div>
      <label>
        <input type="checkbox" bind:checked={isFlipped} />
        Flip
      </label>
    </div>

    <div>
      <label>
        <input type="checkbox" bind:checked={isRotated} />
        Rotate
      </label>
    </div>
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

    select {
      width: 150px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
