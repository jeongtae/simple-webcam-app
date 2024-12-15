<script>
  /** @type {HTMLVideoElement} */
  let video

  $effect(() => {
    video
    ;(async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const device = devices.find(
        ({ label }) => label.includes('iPhone') && label.includes('카메라')
      )

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: device?.deviceId,
        },
      })

      video.srcObject = stream
    })()
  })
</script>

<main>
  <video bind:this={video} class="video" muted autoplay></video>
</main>

<style>
  .video {
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100dvh;
    transform: rotate(180deg) scaleX(-1);
  }
</style>
