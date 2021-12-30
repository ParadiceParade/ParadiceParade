<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="w-screen max-w-md">
    <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
        <header
          class="flex items-center justify-between h-[56px] sm:h-[64px] px-3 sm:px-4 border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
        >
          <h2 class="font-semibold">Shopping cart</h2>

          <Button title="close filters" icon size="lg" @click="closeDialog">
            <MdiWindowClose class="text-2xl" />
          </Button>
        </header>

        <div class="mt-8">
          <div class="flow-root">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li
                v-for="product in products"
                :key="product.id"
                class="py-6 flex"
              >
                <div
                  class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
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
                      class="flex justify-between text-base font-medium text-gray-900"
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
                    <p class="mt-1 text-sm text-gray-500">
                      {{ product.color }}
                    </p>
                  </div>
                  <div class="flex-1 flex items-end justify-between text-sm">
                    <p class="text-gray-500">Qty {{ product.quantity }}</p>

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div class="mt-6">
          <a
            href="#"
            class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >Checkout</a
          >
        </div>
        <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
          <p>
            or
            <button
              type="button"
              class="text-indigo-600 font-medium hover:text-indigo-500"
              @click="closeDialog"
            >
              Continue Shopping<span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
  // More products...
]

export default {
  name: 'Cart',
  data: () => ({
    products
  }),

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
