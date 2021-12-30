<template>
  <div
    v-if="canRender"
    class="fixed z-50 pointer-events-none h-full w-full left-0 top-0 isolate overflow-hidden"
  >
    <Dialog />
    <Menu />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Overlays',

  computed: {
    ...mapState(['dialog', 'menu']),

    canRender() {
      return !!(this.menu.component || this.dialog.component)
    }
  }
}
</script>
