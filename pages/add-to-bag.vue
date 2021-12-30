<template>
  <article
    v-if="loading"
    class="full-screen grid justify-center product-center content-center"
  >
    <Loader />
  </article>

  <article
    v-else-if="error || !product"
    class="text-center px-3 full-screen pt-12 pb-6"
  >
    <h2 class="font-extrabold text-3xl">
      {{ errorTitle }}
    </h2>

    <h3 class="opacity-70 mt-2 mb-14">
      {{ errorSubtitle }}
    </h3>

    <div class="grid gap-y-6 justify-center justify-product-center">
      <Button
        v-for="(action, i) in errorActions"
        :key="i"
        class="group"
        :class="action.class"
        v-bind="action.attrs"
      >
        {{ action.title }}
      </Button>
    </div>
  </article>

  <AddToBagProduct v-else />
</template>

<script>
export default {
  name: 'AddToBagPage',

  data: () => ({
    product: {},
    loading: false,
    error: false,

    errorActions: [
      {
        title: 'Go to Shop',
        attrs: {
          to: '/',
          primary: true
        }
      }
    ]
  }),

  computed: {
    errorTitle() {
      return 'An error occured'
    },
    errorSubtitle() {
      return 'You might have entered a broken or expired link!'
    }
  }
}
</script>

<style scoped>
.full-screen {
  @apply min-h-[calc(100vh-96px)] min-w-[100vw];
}
</style>
