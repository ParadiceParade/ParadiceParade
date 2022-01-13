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
    beforeEnter: () => {
      this.$emit('update:transitionState', 'beforeenter')

      transitioning()
      this.pseudoFocus = this.options.indexOf(this.selected)
    },
    enter: () => {
      requestAnimationFrame(() => {
        this.$refs.selected.focus()
      })
    },
    enterCancelled: cancelled,
    afterEnter: () => {
      transitioned()
      this.$emit('update:transitionState', 'afterenter')
    },
    beforeLeave: () => {
      transitioned()

      this.$emit('update:transitionState', 'beforeleave')
      this.$emit('update:modelValue', this.pseudoFocus)
    },
    leaveCancelled: cancelled,
    afterLeave: transitioned,
  }
}
