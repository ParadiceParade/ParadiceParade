<template>
  <div
    role="radiogroup"
    class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 mt-4"
  >
    <label
      v-for="(item, i) in items"
      :key="i"
      :for="`size-radio-${item.title}`.toLowerCase()"
      class="group relative border border-black dark:border-white dark:border-opacity-10 border-opacity-10 rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none sm:flex-1 sm:py-6 bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100 cursor-pointer undefined"
      :class="{
        'ring-primary-700 dark:ring-primary-500 ring ring-offset-1':
          item.title == activeItem.title,
        'opacity-30 pointer-events-none': item.disabled
      }"
      @click="onUpdate(item)"
    >
      <input
        :id="`size-radio-${item.title}`.toLowerCase()"
        type="radio"
        :value="item.title"
        :checked="item.title == activeItem.title"
        :disabled="item.disabled"
        class="sr-only"
        @input="onUpdate(item)"
      />

      <span class="uppercase">
        {{ item.title }}
      </span>

      <div
        class="absolute -inset-px rounded-md pointer-events-none border-2 dark:border-opacity-10 border-opacity-10"
        :class="{
          'border-black dark:border-white': item.title != activeItem.title,
          'border-primary-700 dark:border-primary-500':
            item.title == activeItem.title
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
  name: 'SizeRadio',

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
