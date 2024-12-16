/** @type {import("svelte/action").Action<HTMLElement, { flip: () => boolean, rotation: () => number, zoomToCover: () => boolean }>} */
export const transform = (element, param) => {
  $effect(() => {
    element.style.transform = `rotate(${param.rotation()}deg) scaleX(${param.flip() ? -1 : 1})`
    element.style.objectFit = param.zoomToCover() ? 'cover' : 'contain'

    return () => {
      element.style.transform = ''
      element.style.objectFit = ''
    }
  })
}
