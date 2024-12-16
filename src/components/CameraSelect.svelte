<script>
  let { value = $bindable(null) } = $props()

  /** @type {MediaDeviceInfo[]} */
  let devices = $state([])

  navigator.mediaDevices.enumerateDevices().then((enumeratedDevices) => {
    devices = enumeratedDevices
  })

  let cameraDevices = $derived(devices.filter(({ kind }) => kind === 'videoinput'))
</script>

<select bind:value>
  <option value={null}>(Not Selected)</option>
  {#each cameraDevices as device}
    <option value={device}>
      {device.label || '(Unknown)'}
    </option>
  {/each}
</select>

<style>
  select {
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
