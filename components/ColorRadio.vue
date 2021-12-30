<template>
  <div role="radiogroup" class="grid grid-flow-col gap-x-4 py-4 justify-start">
    <label
      v-for="(item, i) in items"
      :key="i"
      :for="`color-radio-${item.title}`"
      class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none w-[fit-content]"
      :class="{
        'ring-gray-400 dark:ring-gray-700 ring ring-offset-1':
          item.title == activeItem.title
      }"
    >
      <input
        :id="`color-radio-${item.title}`"
        type="radio"
        :value="item.title"
        :checked="item.title == activeItem.title"
        :disabled="item.disabled"
        class="sr-only"
        @input="onUpdate(item)"
      />

      <div
        class="h-8 w-8 rounded-full border border-black dark:border-white border-opacity-10 dark:border-opacity-20"
        :style="{
          background: item.code
        }"
      >
        <svg
          v-if="item.disabled"
          class="absolute inset-0 w-full h-full text-gray-200 dark:text-gray-600 stroke-2"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          stroke="currentColor"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            vector-effect="non-scaling-stroke"
          ></line>
        </svg>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ColorRadio',

  model: {
    props: 'vmodel',
    event: 'onvmodel'
  },

  props: {
    vmodel: {
      type: Object,
      default: undefined
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    activeItem() {
      return this.vmodel || this.items[0]
    }
  },

  methods: {
    onUpdate(item) {
      !item.disabled && this.$emit('onvmodel', item)
    }
  }
}
</script>

<style></style>
