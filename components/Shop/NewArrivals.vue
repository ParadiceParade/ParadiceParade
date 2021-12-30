<template>
  <section
    class="mt-[200px] bg-white dark:bg-black border-t-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
  >
    <div class="grid grid-flow-col h-[516px] mx-auto max-w-[1280px]">
      <!-- write up for large devices -->
      <div class="grid content-center pl-12 max-h-[516px]">
        <h2 class="font-extrabold text-5xl">Shop new arrivals</h2>
        <h3 class="mt-2 opacity-80 text-lg">
          Check out the latest products added to out store.
        </h3>

        <Button primary to="/view?section=new-arrivals" class="group mt-8">
          Shop products
          <MdiArrowRightThin
            class="group-hover:translate-x-1 group-focus:translate-x-1 transform-gpu transition-transform"
          />
        </Button>
      </div>
      <!-- write up for large devices ends -->

      <div
        class="grid grid-flow-col w-[fit-content] gap-x-8 justify-self-end pr-8 pt-8"
      >
        <div
          v-for="(row, i) in displayedProducts"
          :key="i + 'row'"
          class="grid gap-y-8"
        >
          <div
            v-for="(col, id) in row"
            :key="id + 'col'"
            class="h-[264px] w-[248px] rounded-lg bg-primary-50 border-[0.75px] dark:border-none border-black border-opacity-10 p-3 relative isolate group"
            :class="{
              'mt-[-116px]': i == 1,
              'cursor-pointer': !(i == 0 && id == 1)
            }"
          >
            <Img :src="col.src" class="h-full" />

            <div
              v-if="!(i == 0 && id == 1)"
              class="absolute w-full h-full z-10 top-0 left-0 bg-black bg-opacity-70 grid justify-center justify-items-center p-4 content-between transition-opacity opacity-0 group-hover:opacity-100 rounded-lg text-white"
            >
              <div
                class="text-center transform-gpu translate-y-[-4px] group-hover:translate-y-0 transition-transform"
              >
                <p class="font-semibold mb-1 truncate">
                  {{ col.title }}
                </p>

                <p class="text-sm opacity-80">
                  {{ col.price }}
                </p>
              </div>

              <Button
                overlay
                size="sm"
                class="transform-gpu translate-y-[4px] group-hover:translate-y-0 transition-transform"
                @click="openDialog"
              >
                Add to bag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShopNewArrivals',

  computed: {
    displayedProducts() {
      const getSrc = (name) => `images/prod/${name}.png`
      return [
        [
          {
            title: 'Coffy Tee',
            price: `$20`,
            src: getSrc('front')
          },
          { title: 'Exotic Shirt', price: `$35`, src: getSrc('front1') }
        ],
        [
          { title: 'In Paradicum Angeli', price: `$22`, src: getSrc('back') },
          { title: 'Silk Garden', price: `$40`, src: getSrc('front2') }
        ]
      ]
    }
  },

  methods: {
    openDialog() {
      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'dialog',
        value: true
      })
    }
  }
}
</script>

<style></style>
