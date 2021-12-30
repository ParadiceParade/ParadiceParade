<template>
  <div
    class="h-[64px] bg-white dark:bg-gray-900 top-0 flex justify-between items-center px-4 z-10"
  >
    <NuxtLink :title="logoTitle" to="/" class="w-[48px] h-[32px]">
      <Img
        src="transparent-logo.png"
        alt="app logo"
        height="32px"
        width="48px"
        class="object-fit"
      />
    </NuxtLink>

    <div class="grid gap-x-2 grid-flow-col items-center">
      <Button link> Search </Button>
      <Button link> Saved </Button>
      <Button link> Profile </Button>
      <Button link title="cart" class="text-lg">
        <MdiCart />

        <span class="text-sm">0</span>
      </Button>

      <span
        class="h-[80%] w-[1px] border-l dark:border-l-[0.75px] dark:border-opacity-30"
      />

      <Button :key="theme.is" class="fade-appear" icon @click="toggleTheme">
        <Component :is="themeIcon" />
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  computed: {
    theme() {
      return this.$theme
    },
    themeIcon() {
      if (this.theme.light) {
        return 'MdiSun'
      }
      return 'MdiMoon'
    },
    logoTitle() {
      if (this.$route.path == '/') {
        return 'shop'
      }
      return 'go to shop'
    }
  },

  methods: {
    toggleTheme() {
      this.theme.light = !this.theme.light
    }
  }
}
</script>

<style></style>
