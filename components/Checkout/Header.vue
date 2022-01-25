<template>
  <header
    v-if='steps'
    class="h-[48px] xs:h-[56px] lg:h-[64px] xl:h-[72px] w-full border-b-[0.75px] border-gray-200 dark:border-gray-800 dark:bg-[#191919] bg-white sticky top-0 z-10 grid grid-flow-col grid-cols-[auto,1fr] items-center mb-8 md:mb-12 overflow-x-hidden"
  >
    <div
      class="pseudo w-7 -right-1 left-auto z-10 bg-gradient-to-r dark:from-[#19191900] from-[#fff0] to-white dark:to-[#191919] dark:via-[#191919] via-white"
    />

    <h2
      class="text-lg xs:text-xl sm:text-2xl ml-4 sm:ml-6 font-extrabold text-gray-800 dark:text-gray-200 relative fill-before before:h-[70%] before:top-[15%] before:border-r-[0.75px] before:border-gray-200 dark:before:border-gray-800 pr-3 md:pr-6 h-full flex items-center justify-end"
    >
      Checkout
    </h2>

    <nav
      class="h-full flex items-center ml-2 pl-1 sm:ml-6 max-w-full overflow-x-auto hide-scrollbar"
    >
      <ul class="grid grid-flow-col gap-x-4 items-center pr-8">
        <li
          v-for="(step, i) in steps"
          :key="`step-${i}`"
          class="grid items-center grid-flow-col gap-x-2 whitespace-nowrap"
        >
          <Button
            class="text-sm mx-0"
            :class="{
              'text-gray-900 dark:text-white': currentStep > i + 1,
              'text-gray-600 dark:text-gray-400': currentStep < i + 1,
              'text-primary-700 dark:text-primary-400 font-medium': currentStep == i + 1,
              'pointer-events-none': currentStep <= i + 1,
              'opacity-100': currentStep >= i + 1,
            }"
            :tag="'span'"
            :to="
              currentStep > i + 1
                ? {
                    query: {
                      ...$route.query,
                      step: i + 1,
                    },
                  }
                : undefined
            "
            link
            underline
            :disabled="currentStep <= i + 1"
            @click="updateStep(i + 1)"
          >
            {{ step.title }}
          </Button>

          <Component
            :is="currentStep > i + 1 ? 'MdiChevronDoubleRight' : 'MdiChevronRight'"
            v-if="i < steps.length - 1"
            class="text-gray-400 dark:text-gray-600"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
    props:{
        steps:{
            type:Array,
            default: undefined
        }
    },
  computed: {
    currentStep() {
      return parseInt(this.$route.query.step);
    },
    currentForm() {
      return this.$route.query.form;
    },
  },
};
</script>
