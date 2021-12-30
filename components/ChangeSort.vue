<template>
  <div class="grid" role="none" @keydown="onKeydown">
    <button
      v-for="(item, i) in options"
      :id="`menuitem-${item.value}`"
      :key="i"
      :ref="`item-${item.value}`"
      :title="item.title.toLowerCase()"
      role="menuitem"
      class="h-[36px] w-full grid grid-flow-col gap-x-1 content-center items-center grid-cols-[32px,1fr] justify-start justify-items-start bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10 focus:bg-opacity-10 dark:focus:bg-opacity-10 focus:outline-none menuitem text-sm"
      :class="{
        'opacity-70 hover:opacity-95': item.value != currentSort.value,
        'font-semibold': item.value == currentSort.value
      }"
      v-on="itemEvents(item)"
    >
      <span class="inline-flex items-center justify-center w-full h-full">
        <MdiCheck v-if="item.value == currentSort.value" />
      </span>

      {{ item.title }}
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ControlledFocus } from '~/utils/controlledFocus'
import { eventKey } from '~/utils/main'

export default {
  name: 'ChangeSort',
  data: () => ({
    options: [
      {
        title: 'Recommended',
        value: 'rec'
      },
      {
        title: 'Discount',
        value: 'dis'
      },
      {
        title: 'Price: High to Low',
        value: 'price-desc'
      },
      {
        title: 'Price: Low to High',
        value: 'price'
      },
      {
        title: 'Title: A - Z',
        value: 'title-desc'
      },
      {
        title: 'Title: Z - A',
        value: 'title'
      }
    ]
  }),

  computed: {
    ...mapState(['productsList']),

    sectionTitle() {
      return this.$route.query.section
    },

    currentSort() {
      const sectionSort = this.productsList.sortBy[this.sectionTitle]

      return (
        sectionSort || {
          value: 'rec'
        }
      )
    },

    getSortTitle() {
      return this.currentSort.title || 'Sort'
    }
  },

  mounted() {
    this.$refs[`item-${this.currentSort.value}`]?.[0]?.focus()
  },

  methods: {
    itemEvents(value) {
      return {
        click: () => this.changeSort(value),
        mouseenter: this.onMouseenter
      }
    },

    async changeSort(value) {
      this.$commit('UPDATE', {
        path: this.sectionTitle,
        innerPath: 'productsList.sortBy',
        value
      })

      await this.$nextTick()

      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'menu',
        value: false
      })
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
