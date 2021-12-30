<template>
  <article>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto py-8 sm:py-10 lg:py-14 lg:max-w-none">
        <h2 class="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Browse Sections
        </h2>

        <div class="mt-6 space-y-6 lg:space-y-0 grid lg:grid-cols-3 lg:gap-6">
          <NuxtLink
            v-for="section in sections"
            :key="section.title"
            class="group relative"
            :to="section.to"
          >
            <div
              class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
            >
              <Img
                :src="section.src"
                :alt="section.imageAlt"
                class="w-full h-full object-center object-cover"
              />
            </div>
            <h3 class="mt-3 text-lg font-semibold opacity-90">
              {{ section.title }}
            </h3>

            <h4 v-if="section.description" class="text-sm opacity-70">
              {{ section.description }}
            </h4>
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
const sections = [
  {
    title: 'Campaigns',
    src: 'images/main.jpg',
    to: '?section=campaigns',
    description: 'Discover our selected campaigns'
  },
  {
    title: 'New arrivals',
    src: 'images/prod/front2.png',
    to: '?section=new-arrivals',
    description:
      'Items are frequently added to our store. View our latest products.'
  },
  {
    title: 'Categories',
    description: "Love orderly shopping? We've got you!",
    src: 'images/prod/front.png',
    to: '?section=categories'
  },

  {
    title: 'Items on sale',
    description: "We've found some discounted items. Up to 50% off! 😲",
    src: 'images/prod/front1.png',
    to: '?section=sale'
  },

  {
    title: 'Trending',
    description: 'Discover the items making the loudest buzz',
    src: 'images/prod/back.png',
    to: '?section=trending'
  }
]

export default {
  data: () => ({
    sections: [...sections]
  })
}
</script>
