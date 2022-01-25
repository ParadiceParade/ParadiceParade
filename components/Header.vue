<template>
  <div
    class="bg-white dark:bg-gray-900 top-0 flex justify-between items-center px-4 z-10 border-b-[0.75px] border-gray-200 dark:border-gray-800"
    :class="{
      'h-[64px]': !onboardPage,
      'h-[56px]':onboardPage
    }"
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

    <div 
      class="grid gap-x-2 grid-flow-col items-center">
      
      <template
        v-if="!onboardPage"
      >
        <Button link> Search </Button>
        <Button link> Saved </Button>
        <Button link> Profile </Button>
        <Button link title="cart" class="text-lg" @click="$openCart">
          <MdiCart />

          <span class="text-[0.775rem] text-white -ml-2 rounded-full h-[18px] min-w-[18px] truncate flex items-center justify-center bg-primary-700 dark:bg-primary-500"
          :class="{'px-1':false}"
          >4</span>
        </Button>
      </template>

      <Button v-else primary link :to="onboardAction.to">
        {{onboardAction.text}}
      </Button>

      <span
        class="h-[80%] w-[1px] border-l dark:border-l-[0.75px] dark:border-opacity-30"
      />

      <Button   icon @click="toggleTheme">
        <Component :is="themeIcon" :key="theme.is"
          class="fade-appear" 
        />
      </Button>
    </div>

  </div>
</template>

<script>
import {onboardPage } from '~/utils/main'

export default {
  name: 'Header',

  computed: {
    onboardPage,
    onboardAction(){
      const isSignIn = /^\/sign-in/.test(this.$route.path);

      return {
        text: isSignIn ? 'Register' : 'Sign in',
        to: isSignIn ? '/sign-up': '/sign-in'
      }
    },
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
