<template>
  <Component
    :is="`Mdi${icon}`"
    v-if="text"
    :key="icon"
    :title="title"
    class="text-xl opacity-70 hover:opacity-80 active:opacity-90 cursor-pointer"
    style="--slide-y: 4px"
    :class="{
      'text-green-800 dark:text-green-400': title == 'copied',
      'text-amber-900 dark:text-amber-600': title == 'copy error',
      'pointer-events-none': sleep,
      'fade-slide-y-appear': title == 'copied'
    }"
    @click="copy"
  />
</template>

<script>
import { Copy } from '~/utils/main'

export default {
  name: 'CopyIcon',

  props: {
    text: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    title: 'copy',
    icon: 'Copy',
    sleep: false
  }),

  methods: {
    reset() {
      this.sleep = false
      this.icon = 'Copy'
      this.title = 'copy'
    },
    async copy() {
      if (this.sleep) return

      await Copy({
        text: this.text,
        done: async () => {
          this.sleep = true

          await this.$sleep(3000)

          this.reset()
        },
        onSuccess: () => {
          this.title = 'copied'
          this.icon = 'Copied'
        },
        onError: () => {
          this.title = 'copy error'
          this.icon = 'CopyError'
        }
      })
    }
  }
}
</script>

<style></style>
