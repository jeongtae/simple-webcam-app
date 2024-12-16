<script>
  let { cover = $bindable(false), flip = $bindable(false), rotate = $bindable(false) } = $props()
</script>

<div>
  <label>
    <input type="checkbox" bind:checked={cover} />
    Cover
  </label>
</div>

<div>
  <label>
    <input type="checkbox" bind:checked={flip} />
    Flip
  </label>
</div>

<div>
  <label>
    <input type="checkbox" bind:checked={rotate} />
    Rotate
  </label>
</div>
