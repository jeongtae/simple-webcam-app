<script>
  import { transform } from '../actions/transform.svelte'

  let { camera = null, flip = false, rotate = false, cover = false } = $props()

  /** @type {HTMLVideoElement} */
  let video

  function setVideoSource(source) {
    video.srcObject = source
  }

  function unsetVideoSource() {
    video.srcObject?.getTracks().forEach((track) => track.stop())
    video.srcObject = null
  }

  $effect(() => {
    if (!camera) {
      unsetVideoSource()
      return
    }

    unsetVideoSource()
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          deviceId: camera.deviceId,
        },
      })
      .then(setVideoSource)

    return () => {
      unsetVideoSource()
    }
  })
</script>

<video bind:this={video} muted autoplay playsinline use:transform={() => ({ flip, rotate, cover })}
></video>

<style>
  video {
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    pointer-events: none;
  }
</style>
