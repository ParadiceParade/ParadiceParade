<template>
  <div
    class="w-screen max-w-md h-full overflow-y-auto isolate grid grid-rows-[auto 1fr] sm:border-l-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 content-start can-hover:hidden"
  >
    <header
      class="flex items-center justify-between h-[56px] sm:h-[64px] px-3 sm:px-4 border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
    >
      <h2 class="font-semibold">Shopping cart</h2>

      <Button title="close filters" icon size="lg" @click="closeDialog">
        <MdiWindowClose class="text-2xl" />
      </Button>
    </header>

    <div v-if="!cart.length">
      <div class="mt-12 mb-4 flex justify-center">
        <MdiEmpty class="text-6xl opacity-70" />
      </div>
      <h3 class="font-bold text-xl px-3 text-center">Your cart is empty</h3>
    </div>

    <div v-else class="h-full grid grid-rows-[1fr,auto] overflow-y-scroll">
      <div class="flex-1 pb-6 overflow-y-auto px-4 sm:px-6">
        <div class="mt-8">
          <div class="flow-root">
            <ul
              role="list"
              class="-my-6 divide-y divide-gray-200 dark:divide-gray-700"
            >
              <li
                v-for="product in products"
                :key="product.id"
                class="py-6 flex"
              >
                <div
                  class="flex-shrink-0 w-24 h-24 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
                >
                  <img
                    :src="product.imageSrc"
                    :alt="product.imageAlt"
                    class="w-full h-full object-center object-cover"
                  />
                </div>

                <div class="ml-4 flex-1 flex flex-col">
                  <div>
                    <div
                      class="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100"
                    >
                      <h3>
                        <a :href="product.href">
                          {{ product.name }}
                        </a>
                      </h3>
                      <p class="ml-4">
                        {{ product.price }}
                      </p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-200">
                      {{ product.color }}
                    </p>
                  </div>
                  <div class="flex-1 flex items-end justify-between text-sm">
                    <p class="text-gray-500 dark:text-gray-200">
                      Qty {{ product.quantity }}
                    </p>

                    <div class="flex">
                      <Button
                        type="button"
                        class="font-medium text-primary-700 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-500"
                        link
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="border-t border-gray-200 dark:border-gray-700 py-6 px-4 sm:px-6"
      >
        <div
          class="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100"
        >
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          Shipping and taxes calculated at checkout.
        </p>
        <div class="mt-6">
          <Button primary class="w-full">Checkout</Button>
        </div>
        <div
          class="mt-6 flex justify-center text-sm text-center text-gray-500 dark:text-gray-300"
        >
          <p>
            or
            <Button
              type="button"
              link
              class="text-base text-gray-800 dark:text-gray-100"
              @click="closeDialog"
            >
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </Button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
  },
  {
    id: 21,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
  },
  {
    id: 231,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
  }
  // More products...
]

export default {
  name: 'Cart',
  data: () => ({
    products
  }),

  computed: {
    ...mapState(['cart'])
  },

  methods: {
    closeDialog() {
      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'dialog',
        value: false
      })
    }
  }
}
</script>
