<template>
  <NuxtLink class="group relative" to="/add-to-bag?id=33e">
    <div
      class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none relative isolate"
    >
      <Img
        :src="product.img.src"
        :alt="product.img.alt"
        class="w-full h-full object-center object-contain lg:w-full lg:h-full"
      />

      <Button
        :key="saveIcon"
        icon
        role="checkbox"
        :aria-checked="saved"
        :title="saved ? 'saved' : 'click to save'"
        class="fade-appear w-[32px] h-[32px] absolute bottom-0 right-0 m-3 sm:m-2 z-10 text-black"
        :class="{ 'opacity-75': !saved, 'opacity-90': saved }"
        @click.stop.prevent="saved = !saved"
      >
        <Component :is="saveIcon" />
      </Button>
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700 dark:text-gray-100">
          {{ product.title }}
        </h3>
        <div class="mt-1 h-[20px] grid grid-flow-col items-center gap-x-2">
          <div
            v-for="(color, i) in product.colors"
            :key="i"
            :title="color.title"
            class="border border-black dark:border-white border-opacity-40 dark:border-opacity-40 w-[16px] h-[16px] rounded-full opacity-90"
            :style="{
              backgroundColor: color.code
            }"
          />
        </div>
      </div>
      <p class="text-sm font-medium text-gray-900 dark:text-gray-50">
        {{ product.price }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductListCard',

  data: () => ({
    saved: false
  }),

  computed: {
    ...mapState(['currency']),
    product() {
      return {
        img: {
          src: 'images/prod/front.png',
          alt: ''
        },
        title: 'Coffee Tee',
        price: `${this.currency.sign}40.00`,
        colors: [
          {
            title: 'blue',
            code: '#007bff'
          },
          { title: 'black', code: '#000' },
          { title: 'white', code: '#fff' }
        ]
      }
    },

    saveIcon() {
      return `Mdi${this.saved ? 'Heart' : 'HeartOutline'}`
    }
  }
}
</script>

<style></style>
