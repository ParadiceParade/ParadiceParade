<template>
  <article class="pt-8 lg:pt-12">
    <div class="px-4 lg:px-6 text-center">
      <h2 class="font-extrabold text-3xl text-gray-900 dark:text-gray-100">
        New Arrivals
      </h2>

      <!-- <h3 class="opacity-80 text-[0.9em] lg:text-base mt-1">
        Discover the latest items added to our store
      </h3> -->
    </div>

    <!-- controls -->
    <div
      class="mt-8 lg:mt-10 px-4 lg:px-6 flex justify-between items-center pb-2 lg:pb-3 border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
    >
      <Button link class="ml-0" @click="changeSort">
        {{ getSortTitle }}

        <MdiSortVariant />
      </Button>

      <div>
        <Button link @click="openFilter">
          Filter
          <MdiFilter />
        </Button>

        <!-- <Button
          title="search"
          class="hover:opacity-100 fade-appear"
          :class="{ 'opacity-70': !gridView, 'opacity-[.95]': gridView }"
          icon
          size="sm"
        >
          <MdiMagnify class="text-lg" />
        </Button> -->
      </div>
    </div>
    <!-- controls end -->

    <!-- filters -->
    <div
      v-if="filters.length"
      class="h-[48px] lg:h-[56px] bg-gray-900 dark:bg-primary-100 dark:bg-opacity-5 bg-opacity-5 w-full border-black dark:border-white border-opacity-10 dark:border-opacity-10 flex items-center justify-start"
    >
      <div class="uppercase pl-4 lg:pl-6 opacity-75 text-sm font-semibold">
        Filters
      </div>

      <span class="h-[60%] w-[1px] bg-black dark:bg-white mx-3 opacity-20" />

      <TransitionGroup
        class="flex-grow flex items-center justify-start overflow-x-auto hide-scrollbar pr-3"
        move-class="transition-transform"
        name="fade-transition"
      >
        <div
          v-for="(item, i) in filters"
          :key="i"
          class="rounded-full border border-black dark:border-white border-opacity-20 dark:border-opacity-20 px-2 lg:px-3 h-[32px] lg:h-[34px] grid gap-x-1 grid-flow-col bg-gray-900 dark:bg-primary-100 bg-opacity-10 dark:bg-opacity-20 items-center text-sm mr-2 lg:mr-3 cursor-default select-none"
        >
          {{ item }}

          <MdiClose
            :title="`remove ${item} filter`"
            class="cursor-pointer"
            @click="removeFilter(item)"
          />
        </div>
      </TransitionGroup>
    </div>
    <!-- filters end -->

    <!-- items count -->
    <div
      class="flex items-center justify-between opacity-75 text-[0.85rem] px-4 lg:px-6 py-2"
    >
      <p>16 Products found</p>

      <p>Page 1 of 2</p>
    </div>
    <!-- items count end -->

    <!-- product list -->
    <div
      class="mt-6 mb-12 grid grid-cols-1 gap-y-10 gap-x-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-6 max-w-[1500px] mx-auto"
    >
      <ProductListCard v-for="i in 16" :key="i" />
    </div>
    <!-- product list ends -->

    <!-- pagination -->
    <!-- <Pagination v-model="pageIndex" /> -->
    <!-- pagination ends -->
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { nextAnimFrame } from '~/utils/main'
export default {
  name: 'ViewProducts',

  computed: {
    ...mapState(['productsList']),

    filters() {
      return Object.keys(this.productsList.filters[this.sectionTitle] || {})
    },

    sectionTitle() {
      return this.$route.query.section
    },

    gridView() {
      return this.productsList.gridView
    },

    getSortTitle() {
      const sectionSort = this.productsList.sortBy[this.sectionTitle]

      return ((sectionSort || {}).title || 'Sort').replace(
        /Recommended/,
        'Sort'
      )
    }
  },

  methods: {
    toggleView() {
      this.$commit('UPDATE', {
        path: 'gridView',
        innerPath: 'productsList',
        value: !this.gridView
      })
    },

    removeFilter(filter) {
      const savedFilters = {
        ...(this.productsList.filters[this.sectionTitle] || {})
      }

      delete savedFilters[filter]

      this.$commit('UPDATE', {
        path: this.sectionTitle,
        innerPath: 'productsList.filters',
        value: savedFilters
      })
    },

    async changeSort(e) {
      const { bottom, left } = e.currentTarget.getBoundingClientRect()

      await nextAnimFrame()

      const menuPosition = {
        top: bottom - 2,
        left: left - 2
      }

      const menuSize = {
        width: 172,
        height: 224
      }

      this.$commit('UPDATE', {
        path: 'menu',
        value: {
          style: {
            ...menuPosition,
            ...menuSize,
            origin: 'top left'
          },
          component: 'ChangeSort'
        }
      })

      await this.$nextTick()

      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'menu',
        value: true
      })
    },

    async openFilter() {
      this.$commit('UPDATE', {
        path: 'dialog',
        value: {
          component: 'ProductListFilter',
          transition: 'slide-x',
          contentClass:
            'w-screen sm:w-[360px] xl:w-[500px] h-full right-0 bottom-0 sm:rounded-none'
        }
      })

      await this.$nextTick()

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
