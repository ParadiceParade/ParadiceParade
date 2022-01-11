export function isTop(evt) {
  const { top, bottom } = evt.currentTarget.getBoundingClientRect()

  const html = document.documentElement

  const clientHeight = html.clientHeight

  return top > clientHeight - bottom
}
