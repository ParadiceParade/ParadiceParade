<template>
    <div v-if="!cart.length">
      <div class="mt-12 mb-4 flex justify-center">
        <MdiEmpty class="text-6xl opacity-70" />
      </div>
      <h3 class="font-bold text-xl px-3 text-center">Your cart is empty</h3>
    </div>

    <div 
      v-else 
      class="h-full grid grid-rows-[1fr,auto]"
      :class="{
        'max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-64px)]': 
          !getIsCheckout
      }"
    >
      <div 
        class="flex-1 pb-6 overflow-y-auto px-4"
        :class="{
          'show-scrollbar-on-hover sm:px-8': getIsCheckout,
          'sm:px-6': !getIsCheckout
        }"
      >
        <div class="mt-8">
          <div class="flow-root">
            <ul
              role="list"
              class="-my-6 divide-dotted divide-y divide-gray-300 dark:divide-gray-700"
            >
              <CartItem 
                v-for="product in products"
                :key="product.id"
                :product="product"
                :img="{
                  src: product.imageSrc,
                }"
                @edit-item="$emit('edit-item', product)"
              />
            </ul>
          </div>
        </div>
      </div>

      <div
        class="border-t border-dashed border-gray-300 dark:border-gray-700 py-6 px-4"
        :class="{
          'sm:px-8': getIsCheckout,
          'sm:px-6': !getIsCheckout
        }"
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
          <Button primary class="w-full gap-x-2" @click="checkout">
          <MdiLock class="opacity-80"/>
          Checkout</Button>
        </div>
        <div
          class="mt-6 flex justify-center text-sm text-center text-gray-500 dark:text-gray-300"
        >
          <p>
            or
            <Button
              type="button"
              link
              class="text-base text-gray-800 dark:text-gray-100 group pr-1"
              @click="continuseShoping"
            >
              Continue Shopping<span aria-hidden="true" 
                class="group-hover:translate-x-1 transform-gpu transition-transform"
              > &rarr;</span>
            </Button>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

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
        name: 'CartList',
        props:{
          isCheckout:Boolean
        },
        data:()=>({
            products
        }),
        computed:{
            ...mapState(['cart','breakpoints']),
            isMiniDevice(){
              return /md|sm|xs|xxs/.test(this.breakpoints.is)
            },
            getIsCheckout(){
              return this.isCheckout && !this.isMiniDevice
            }
        },
        methods:{
            checkout(){
                this.$emit('on-checkout')
            },
            continuseShoping(){
                this.$emit('on-continue-shoping')
            }
        }
    }  
</script>