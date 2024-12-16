/** @type {import("svelte/action").Action<HTMLElement, () => { flip:  boolean, rotate:  boolean, cover:  boolean }>} */
export const transform = (element, param) => {
  $effect(() => {
    const { rotate, flip, cover } = param()

    element.style.transform = [`rotate(${rotate ? 180 : 0}deg)`, `scaleX(${flip ? -1 : 1})`].join(
      ' '
    )
    element.style.objectFit = cover ? 'cover' : 'contain'

    return () => {
      element.style.transform = ''
      element.style.objectFit = ''
    }
  })
}
