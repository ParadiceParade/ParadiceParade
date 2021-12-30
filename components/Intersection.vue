<script>
import { nextAnimFrame } from '~/utils/main'
const defaultConfig = {
  threshold: '0',
  rootMargin: '0px 0px 0px 0px',
  root: null
}

export default {
  name: 'Intersection',
  props: {
    once: Boolean,
    config: {
      type: Object,
      default: () => defaultConfig
    },
    useAnimationFrame: {
      type: Boolean,
      default: true
    },
    disableIntersection: Boolean,
    singleAnimationFrame: Boolean,
    sleep: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      isIntersecting: false,
      entries: {
        inactive: true
      },

      Observer: {
        class: null,
        callback: (entry) => {
          entry.forEach(async (entries) => {
            const setPayload = () => {
              this.entries = entries
              this.isIntersecting = entries.isIntersecting
            }
            const callback = () => {
              if (this.once) {
                if (!this.Observer.class) {
                  return
                }

                setPayload()

                if (this.isIntersecting) {
                  this.$emit('once-intersected', entries)
                  this.Observer.class?.unobserve(this.$el)
                  this.Observer.class?.disconnect?.()
                  this.Observer.class = null
                }

                return
              }

              setPayload()
            }

            await nextAnimFrame()
            callback()
            console.log(2)
            this.$emit('on-update', this.payload)
          })
        }
      },

      isMounted: false
    }
  },
  computed: {
    payload() {
      return {
        isIntersecting: this.isIntersecting,
        // target: this.target,
        entries: {
          boundingClientRect: this.entries.boundingClientRect,
          intersectionRatio: this.entries.intersectionRatio,
          intersectionRect: this.entries.intersectionRect,
          isIntersecting: this.entries.isIntersecting,
          isVisible: this.entries.isVisible,
          rootBounds: this.entries.rootBounds,
          // target: this.entries.target,
          time: this.entries.time
        }
        // entries: this.entries,
      }
    }
  },

  watch: {
    '$store.state.breakpoints.is'() {
      this.refresh()
    },
    disableIntersection(n) {
      this.refresh()
    }
  },

  beforeMount() {
    this.observe()
    this.isMounted = true
  },

  activated() {
    this.observe()
    this.isMounted = true
  },
  beforeDestroy() {
    this.disconnect()
    this.isMounted = false
  },
  deactivated() {
    this.disconnect()
    this.isMounted = false
  },
  methods: {
    connect() {
      if (this.Observer.class || this.disableIntersection || !this.isMounted) {
        return
      }

      let initialOptions = {
        ...defaultConfig,
        ...this.config
      }

      let options = {
        ...initialOptions,
        threshold: /string|number/i.test(typeof initialOptions.threshold)
          ? parseFloat(initialOptions.threshold)
          : initialOptions.threshold
      }

      initialOptions = 0

      requestAnimationFrame(() => {
        if (!this.disableIntersection) {
          this.$nextTick(() => {
            this.Observer.class = new IntersectionObserver(
              this.Observer.callback,
              options
            )

            this.$nextTick(() => {
              this.Observer.class.observe(this.$el)
              options = 0
            })
          })
        }
      })
    },
    observe() {
      this.entries = {}
      this.$nextTick(async () => {
        await this.$sleep(this.sleep, true)
        this.connect()
      })
    },
    disconnect() {
      this.Observer.class?.unobserve(this.$el)
      this.Observer.class?.disconnect()

      this.$nextTick(() => {
        this.Observer.class = null
        this.target = null

        this.entries = { inactive: true }
      })
    },
    refresh() {
      this.disconnect()
      this.$nextTick(this.connect)
    }
  },
  render() {
    const el = this.$scopedSlots?.default?.(this.payload)
    return el
  }
}
</script>
