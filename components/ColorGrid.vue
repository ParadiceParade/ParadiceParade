<template>
  <div class="grid grid-flow-col gap-x-4 py-4 justify-start">
    <label
      v-for="(item, i) in items"
      :key="i"
      :for="`color-radio-${item.title}`"
      class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none w-[fit-content]"
      :class="{
        'ring-gray-400 dark:ring-gray-700 ring ring-offset-1':
          item.title == activeItem
      }"
    >
      <input
        :id="`color-radio-${item.title}`"
        type="radio"
        :value="item.title"
        class="sr-only"
      />

      <span
        class="h-8 w-8 rounded-full border border-black dark:border-white border-opacity-10"
        :style="{
          background: item.code
        }"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'ColorGrid',

  model: {
    props: 'vmodel',
    event: 'onvmodel'
  },

  props: {
    vmodel: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    activeItem() {
      return this.vmodel || this.items[0].title
    }
  }
}
</script>

<style></style>
