<script>
  let { cover = $bindable(false), flip = $bindable(false), rotate = $bindable(false) } = $props()

  function handleKeydown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
      return
    }
    if (e.key === 'c') {
      cover = !cover
    }
    if (e.key === 'f') {
      flip = !flip
    }
    if (e.key === 'r') {
      rotate = !rotate
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div>
  <label aria-label="Cover">
    <input type="checkbox" bind:checked={cover} />
    [C]over
  </label>
</div>

<div>
  <label aria-label="Flip">
    <input type="checkbox" bind:checked={flip} />
    [F]lip
  </label>
</div>

<div>
  <label aria-label="Rotate">
    <input type="checkbox" bind:checked={rotate} />
    [R]otate
  </label>
</div>
