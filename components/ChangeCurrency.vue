<template>
  <div class="grid" role="none" @keydown="onKeydown">
    <button
      v-for="(item, i) in options"
      :id="`menuitem-${item.code}`"
      :key="i"
      :ref="`item-${item.code}`"
      :title="item.title"
      role="menuitem"
      class="h-[36px] w-full grid grid-flow-col gap-x-1 content-center items-center grid-cols-[32px,1fr,32px] justify-start justify-items-start uppercase bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10 focus:bg-opacity-10 dark:focus:bg-opacity-10 focus:outline-none menuitem text-sm"
      :class="{
        'opacity-70 hover:opacity-95': item.code != currency.code,
        'font-semibold': item.code == currency.code
      }"
      v-on="itemEvents(item)"
    >
      <span class="inline-flex items-center justify-center w-full h-full">
        <MdiCheck v-if="item.code == currency.code" />
      </span>

      {{ item.code }}

      <span
        class="text-sm opacity-70 w-full h-full inline-flex items-center justify-center"
      >
        {{ item.sign }}
      </span>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ControlledFocus } from '~/utils/controlledFocus'
import { eventKey, nextAnimFrame } from '~/utils/main'

export default {
  name: 'ChangeCurrency',
  data: () => ({
    options: [
      {
        code: 'usd',
        sign: '$',
        title: 'US Dollar'
      },
      {
        code: 'cad',
        sign: '$',
        title: 'Canadian Dollar'
      },
      {
        code: 'eur',
        sign: '€',
        title: 'Euros'
      },
      {
        code: 'gbp',
        sign: '£',
        title: 'Pounds'
      },
      {
        code: 'ngn',
        sign: '₦',
        title: 'Naira'
      }
    ]
  }),

  computed: {
    ...mapState(['currency'])
  },

  mounted() {
    this.$refs[`item-${this.currency.code}`]?.[0]?.focus()
  },

  methods: {
    itemEvents(value) {
      return {
        click: () =>
          this.changeCurrency({
            code: value.code,
            sign: value.sign
          }),
        mouseenter: this.onMouseenter
      }
    },

    async changeCurrency(value) {
      this.$commit('UPDATE', {
        path: 'currency',
        value
      })

      await this.$nextTick()

      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'menu',
        value: false
      })

      await nextAnimFrame()

      localStorage.setItem('currency', JSON.stringify(this.currency))
    },

    onKeydown(e) {
      const key = eventKey(e)

      if (/arrow_down|arrow_up/.test(key)) {
        e.preventDefault()

        const controlledFocus = new ControlledFocus({
          root: e.currentTarget,
          children: '.menuitem',
          loop: false,
          uid: this._uid
        })

        if (key == 'arrow_down') {
          controlledFocus.forward()
        } else {
          controlledFocus.backward()
        }
      }
    },

    onMouseenter(e) {
      e.currentTarget.focus()
    }
  }
}
</script>

<style></style>
