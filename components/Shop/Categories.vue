<template>
  <section
    class="z-10 bg-white dark:bg-black border-t-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 relative py-24"
  >
    <div class="max-w-[1280px] mx-auto">
      <div class="grid justify-start px-6 items-center">
        <h2 class="font-extrabold text-2xl">Shop by Categories</h2>
        <h3 class="font-normal text-[1.1rem] opacity-80 mt-1">
          We've grouped your our products for you to make an easy pick.
        </h3>
      </div>

      <div
        class="grid w-full grid-cols-[repeat(4,minmax(calc(33%-1.5rem),370px))] gap-x-6 px-6 mt-8 overflow-x-auto hide-scrollbar"
      >
        <div v-for="(product, i) in displayedProducts" :key="i" class="w-full">
          <div
            class="bg-primary-50 rounded-md border-[0.75px] dark:border-none border-black border-opacity-5 p-1"
          >
            <Img :src="product.src" />
          </div>

          <p class="my-1 font-semibold text-lg">{{ product.title }}</p>

          <p v-if="i % 2 == 0" class="text-sm opacity-80 mb-1">
            Some random description that's not required
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShopCategories',
  computed: {
    displayedProducts() {
      const getSrc = (name) => `images/prod/${name}.png`
      return [
        {
          title: 'Coffy Tee',
          price: `$20`,
          src: getSrc('front')
        },
        { title: 'Exotic Shirt', price: `$35`, src: getSrc('front1') },
        { title: 'In Paradicum Angeli', price: `$22`, src: getSrc('back') },
        { title: 'Silk Garden', price: `$40`, src: getSrc('front2') }
      ]
    }
  }
}
</script>

<style></style>
