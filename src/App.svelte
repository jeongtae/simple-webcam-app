<script>
  import CameraPreview from './components/CameraPreview.svelte'
  import CameraSelect from './components/CameraSelect.svelte'
  import TransformControls from './components/TransformControls.svelte'

  /** @type {MediaDeviceInfo | null} */
  let camera = $state(null)

  let cover = $state(false)
  let flip = $state(false)
  let rotate = $state(false)
</script>

<main>
  <CameraPreview {camera} {cover} {flip} {rotate} />
  <div class="controls">
    <CameraSelect bind:value={camera} />
    <TransformControls bind:cover bind:flip bind:rotate />
  </div>
</main>

<style>
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
