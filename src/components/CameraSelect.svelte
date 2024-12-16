<script>
  let { value = $bindable(null), cameras = [] } = $props()
</script>

<select bind:value>
  <option value={null}>(Not Selected)</option>
  {#each cameras as camera}
    <option value={camera}>
      {camera.label || '(Unknown)'}
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
