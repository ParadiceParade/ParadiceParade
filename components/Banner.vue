<template>
  <div
    v-if="!onboardPage"
    class="h-[32px] text-white bg-black flex justify-between items-center px-4"
  >
    <Button
      link
      title="change currency"
      class="uppercase"
      @click="changeCurrency"
    >
      {{ currency.code }}
      <MdiChevronDown />
    </Button>

    <div class="grid gap-x-1 items-center grid-flow-col h-full">
      <Button to="/sign-up" link text="Create account" />

      <span class="h-[80%] w-[1px] border-l-[0.75px] border-opacity-30" />

      <Button to="/sign-in" link text="Sign in" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { nextAnimFrame,onboardPage } from '~/utils/main'

export default {
  name: 'Banner',

  computed: {
    ...mapState(['currency']),
    onboardPage
  },

  methods: {
    async changeCurrency(e) {
      const currentTarget = e.currentTarget;

      currentTarget.scrollIntoView();

      await nextAnimFrame()

      const { bottom, left } = currentTarget.getBoundingClientRect()

      await nextAnimFrame()

      const menuPosition = {
        top: bottom - 2,
        left: left - 8
      }

      const menuSize = {
        width: 124,
        height: 188
      }

      this.$commit('UPDATE', {
        path: 'menu',
        value: {
          style: {
            ...menuPosition,
            ...menuSize,
            origin: 'top left'
          },
          component: 'ChangeCurrency',
          contentClass: 'rounded-sm'
        }
      })

      await this.$nextTick()

      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'menu',
        value: true
      })
    }
  }
}
</script>

<style></style>
