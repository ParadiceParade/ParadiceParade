<template>
  <div>
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          class="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li v-for="breadcrumb in product.breadcrumbs" :key="breadcrumb.id">
            <div class="flex items-center">
              <a
                :href="breadcrumb.href"
                class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                {{ breadcrumb.name }}
              </a>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="w-4 h-5 text-gray-300 dark:text-gray-600"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <a
              :href="product.href"
              aria-current="page"
              class="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
            >
              {{ product.name }}
            </a>
          </li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div
        class="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8"
      >
        <div
          class="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block bg-gray-100"
        >
          <img
            :src="product.images[0].src"
            :alt="product.images[0].alt"
            class="w-full h-full object-center object-cover"
          />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img
              :src="product.images[1].src"
              :alt="product.images[1].alt"
              class="w-full h-full object-center object-cover"
            />
          </div>
          <div class="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
            <img
              :src="product.images[2].src"
              :alt="product.images[2].alt"
              class="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div
          class="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4"
        >
          <img
            :src="product.images[3].src"
            :alt="product.images[3].alt"
            class="w-full h-full object-center object-cover"
          />
        </div>
      </div>

      <!-- Product info -->
      <div
        class="max-w-2xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-16 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
      >
        <div
          class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:dark:border-gray-600 lg:pr-8"
        >
          <h2
            class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl"
          >
            {{ product.name }}
          </h2>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:mt-0 lg:row-span-3">
          <h3 class="sr-only">Product information</h3>
          <p class="text-3xl text-gray-900 dark:text-gray-100">
            {{ product.price }}
          </p>

          <!-- Reviews -->
          <div class="mt-6">
            <h4 class="sr-only">Reviews</h4>
            <div class="flex items-center">
              <div class="flex items-center">
                <MdiStar
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    reviews.average > rating
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-200 dark:text-gray-700',
                    'h-5 w-5 flex-shrink-0'
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
              <span
                class="ml-3 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 cursor-default"
                >{{ reviews.totalCount }} reviews</span
              >
            </div>
          </div>

          <form class="mt-10">
            <!-- Colors -->
            <div>
              <h3 class="text-sm text-gray-900 dark:text-gray-100 font-medium">
                Color
              </h3>

              <ColorRadio
                :vmodel="selectedColor"
                :items="product.colors"
                @onvmodel="changeColor"
              />
            </div>

            <!-- Sizes -->
            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3
                  class="text-sm text-gray-900 dark:text-gray-100 font-medium"
                >
                  Size
                </h3>
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >Size guide</a
                >
              </div>

              <SizeRadio
                :vmodel="selectedSize"
                :items="product.sizes"
                @onvmodel="changeSize"
              />
            </div>

            <div class="w-full flex mt-10 justify-between items-center">
              <Button type="submit" class="flex-grow" primary>
                Add to bag
              </Button>

              <Button
                :key="saveIcon"
                icon
                role="checkbox"
                :aria-checked="saved"
                :title="saved ? 'saved' : 'click to save'"
                class="fade-appear w-[32px] h-[32px] ml-8 mr-6"
                :class="{ 'opacity-75': !saved, 'opacity-90': saved }"
                @click.stop.prevent="saved = !saved"
              >
                <Component :is="saveIcon" class="text-xl" />
              </Button>
            </div>
          </form>
        </div>

        <div
          class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:dark:border-gray-600 lg:pr-8"
        >
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p
                class="text-base text-gray-900 dark:text-gray-100 leading-relaxed"
              >
                {{ product.description }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">
              Highlights
            </h3>

            <div class="mt-4">
              <ul role="list" class="pl-4 list-disc text-sm space-y-2">
                <li
                  v-for="highlight in product.highlights"
                  :key="highlight"
                  class="text-gray-400 dark:text-gray-200"
                >
                  <span class="text-gray-600 dark:text-gray-300">{{
                    highlight
                  }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900 dark:text-gray-100">
              Fabric & care
            </h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ product.care }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h2
              class="text-sm font-medium flex items-center text-gray-900 dark:text-gray-100"
            >
              Product code

              <CopyIcon :text="product.code" class="ml-2" />
            </h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ product.code }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900 dark:text-gray-100">
              Share
            </h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ product.care }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2
      class="border-t border-black dark:border-white border-opacity-10 dark:border-opacity-10 pt-6 text-xl font-bold px-6"
    >
      Similar products
    </h2>
    <div
      class="mt-3 mb-12 grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 xl:gap-x-8 px-6 max-w-[1500px] mx-auto"
    >
      <ProductListCard v-for="i in 4" :key="i" />
    </div>
  </div>
</template>

<script>
const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' }
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.'
    }
  ],
  colors: [
    { title: 'White', code: '#fff' },
    { title: 'Gray', code: '#808080' },
    { title: 'Black', code: '#000' }
  ],
  sizes: [
    { title: 'XXS', disabled: false },
    { title: 'XS', disabled: true },
    { title: 'S', disabled: true },
    { title: 'M', disabled: true },
    { title: 'L', disabled: true },
    { title: 'XL', disabled: true },
    { title: '2XL', disabled: true },
    { title: '3XL', disabled: true }
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton'
  ],
  care: 'Check hang tag for details',
  code: 'prd-skaks',
  sizeAndFit: {
    height: '185cm',
    waering: 'Size - Medium'
  }
}
const reviews = { href: '#', average: 4, totalCount: 117 }

export default {
  data: () => ({
    reviews,
    product,
    selectedColor: product.colors[0],
    selectedSize: product.sizes[2],
    saved: false
  }),

  computed: {
    saveIcon() {
      return `Mdi${this.saved ? 'Heart' : 'HeartOutline'}`
    }
  },

  methods: {
    changeColor(item) {
      this.selectedColor = item
    },

    changeSize(item) {
      this.selectedSize = item
      console.log(item)
    }
  }
}
</script>
