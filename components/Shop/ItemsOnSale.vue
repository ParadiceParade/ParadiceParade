<template>
  <section
    class="z-10 bg-white dark:bg-black border-t-[0.75px] border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 relative py-24"
  >
    <div class="max-w-[1280px] mx-auto">
      <div class="grid grid-flow-col justify-between px-6 items-center">
        <h2 class="font-extrabold text-2xl">Items on Sale</h2>

        <Button
          link
          to="/new-arrivals"
          class="group ml-0 text-base mr-4 pr-1 text-primary-700 dark:text-primary-300"
        >
          Shop products
          <MdiArrowRightThin
            class="group-hover:translate-x-1 group-focus:translate-x-1 transform-gpu transition-transform"
          />
        </Button>
      </div>

      <div
        class="grid w-full grid-cols-[repeat(auto-fit,minmax(calc(25%-1.5rem),270px))] gap-x-6 px-6 mt-6"
      >
        <div v-for="(product, i) in displayedProducts" :key="i" class="w-full">
          <div
            class="bg-primary-50 rounded-md border-[0.75px] dark:border-none border-black border-opacity-5 p-1"
          >
            <Img :src="product.src" />
          </div>

          <p class="my-1 font-semibold">{{ product.title }}</p>

          <p class="text-sm opacity-80 mb-1">10% off</p>

          <div class="flex items-center">
            <span class="line-through opacity-70 text-sm mr-2"> $45 </span>

            <span class="font-semibold">$41.5</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShopItemsOnSale',
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
