export function isTop(evt) {
  const { top, bottom } = evt.currentTarget.getBoundingClientRect()

  const html = document.documentElement

  const clientHeight = html.clientHeight

  return top > clientHeight - bottom
}

export function transitionEvents() {
  const transitioned = () => (this.transitioning = false)
  const transitioning = () => (this.transitioning = true)

  const cancelled = () => {
    this.closeListBox()
    transitioned()
  }

  return {
    beforeEnter: transitioning,
    enterCancelled: cancelled,
    afterEnter: transitioned,
    beforeLeave: transitioned,
    leaveCancelled: cancelled,
    afterLeave: transitioned,
  }
}
