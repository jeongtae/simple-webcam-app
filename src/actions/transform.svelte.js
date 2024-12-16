/** @type {import("svelte/action").Action<HTMLElement, { flip: () => boolean, rotate: () => boolean, cover: () => boolean }>} */
export const transform = (element, param) => {
  $effect(() => {
    element.style.transform = [
      `rotate(${param.rotate() ? 180 : 0}deg)`,
      `scaleX(${param.flip() ? -1 : 1})`,
    ].join(' ')
    element.style.objectFit = param.cover() ? 'cover' : 'contain'

    return () => {
      element.style.transform = ''
      element.style.objectFit = ''
    }
  })
}
