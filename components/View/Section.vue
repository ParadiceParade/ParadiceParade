<template>
  <article
    v-if="loading"
    class="full-screen grid justify-center items-center content-center"
  >
    <Loader />
  </article>

  <article
    v-else-if="error || !items.length"
    class="text-center px-3 full-screen pt-12 pb-6"
  >
    <h2 class="font-extrabold text-3xl">
      {{ errorTitle }}
    </h2>

    <h3 class="opacity-70 mt-2 mb-14">
      <p v-for="(p, i) in errorSubtitle" :key="i" class="mb-1">
        {{ p }}
      </p>
    </h3>

    <div class="grid gap-y-6 justify-center justify-items-center">
      <Button
        v-for="(action, i) in errorActions"
        :key="i"
        class="group"
        :class="action.class"
        v-bind="action.attrs"
      >
        {{ action.title }}

        <Component
          :is="action.icon"
          v-if="action.icon"
          class="group-hover:translate-x-1 group-focus:translate-x-1 transform-gpu transition-transform"
        />
      </Button>
    </div>
  </article>

  <ViewProducts v-else />
</template>

<script>
export default {
  name: 'ViewSection',

  data: () => ({
    items: [1],
    loading: false,
    error: false,

    errorActions: [
      {
        title: 'Browse sections',
        icon: 'MdiArrowRightThin',
        attrs: {
          to: '/view',
          primary: true
        }
      },
      {
        title: 'Go to Shop',
        attrs: {
          to: '/',
          link: true
        },
        class:
          'text-primary-700 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-500 w-[fit-content] text-base'
      }
    ]
  }),

  computed: {
    errorTitle() {
      if (!this.items.length) {
        return 'Nothing to show'
      } else return 'An error occured'
    },
    errorSubtitle() {
      if (!this.items.length) {
        return [
          "This is strange, there's nothing to browse through.",
          "Let's get you out of here."
        ]
      } else return ['You might have entered a broken or expired link!']
    }
  }
}
</script>

<style scoped>
.full-screen {
  @apply min-h-[calc(100vh-96px)] min-w-[100vw];
}
</style>
