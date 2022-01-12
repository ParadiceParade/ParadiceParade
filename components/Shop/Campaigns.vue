<template>
  <section class="w-full">
    <h2 class="text-center text-[28px] font-extrabold mt-6">
      Discover Campaigns
    </h2>
    <!-- hero image -->
    <div
      class="max-w-[1200px] mx-auto rounded-lg overflow-hidden mt-6 h-[550px] flex items-start isolate relative"
    >
      <Transition v-for="i in 2" :key="i" name="fade-transition" mode="out-in">
        <div
          v-if="
            i == 1 ? active == 1 || active == 3 : active == 2 || active == 4
          "
          class="h-full w-full absolute"
          style="--fade-duration: 1500ms; --fade-ease: linear"
        >
          <Intersection @on-update="handleIntersection">
            <div class="pseudo opacity-0" />
          </Intersection>

          <Img
            :src="`${i == 1 ? '/images/main1.jpg' : '/images/main.jpg'}`"
            class="h-full object-cover w-full"
          />
          <div
            class="absolute w-full h-[80px] bottom-0 left-0 z-10 bg-gradient-to-b from-[transparent] to-black"
          />
        </div>
      </Transition>

      <div
        class="absolute w-[35%] z-10 text-white h-full pl-8 bg-gradient-to-r from-black"
      >
        <Transition name="slide-y" mode="out-in">
          <div
            :key="active"
            class="h-full grid content-center"
            style="--slide-y: 10px; --slide-y-duration: 750ms"
          >
            <div
              v-if="active == 1"
              class="rounded-full px-3 font-semibold text-sm h-[28px] flex items-center justify-center bg-yellow-500 text-black w-[fit-content] opacity-80"
            >
              New
            </div>
            <h3 class="text-2xl font-bold">Paradice is a state of mind</h3>
            <h4 class="opacity-80">August, 2020</h4>

            <Button class="mt-4" overlay text="Shop campaign" hide-plain-focus/>
          </div>
        </Transition>
      </div>
    </div>
    <!-- hero image ends -->

    <!-- controller -->
    <div class="relative mt-[-72px] h-[144px] w-full overflow-x-auto">
      <div
        class="max-w-[1200px] h-full w-[fit-content] mx-auto px-3 grid gap-x-6 grid-flow-col justify-start items-center controller-wrap pointer-events-none"
      >
        <button
          v-for="i in 4"
          :key="i"
          class="w-[224px] h-[128px] rounded-md relative controller pointer-events-auto"
          @click="active = i"
        >
          <div class="w-full h-full overflow-hidden rounded-md">
            <Img
              :src="`${i % 2 == 0 ? '/images/main.jpg' : '/images/main1.jpg'}`"
              class="h-full object-cover w-full scale-[1.1] transform-gpu hover:scale-[1.05] origin-top-left active:scale-100"
              style="transition: 200ms linear transform"
            />
          </div>

          <template v-if="active == i">
            <div
              class="ring-[5px] ring-primary-700 fade-appear absolute w-full h-full rounded-md top-0"
            ></div>

            <div
              class="absolute bottom-[0px] overflow-hidden rounded-md w-full h-full"
            >
              <div
                class="progress h-full w-full absolute left-0 bg-black bg-opacity-70 border-r border-white border-opacity-30"
                :style="{
                  'animation-play-state': stopAnimation ? 'paused' : undefined
                }"
                @animationend="triggerNext"
              />
            </div>
          </template>
        </button>
      </div>
    </div>
    <!-- controller ends -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    active: 1,
    intersecting: false
  }),

  computed: {
    ...mapState(['menu', 'dialog']),

    stopAnimation() {
      return !this.intersecting || !!this.menu.active || !!this.dialog.active
    }
  },

  methods: {
    triggerNext() {
      let next = this.active + 1

      next > 4 && (next = 1)

      this.active = next
    },

    handleIntersection(e) {
      this.intersecting = e.isIntersecting
    }
  }
}
</script>

<style scoped>
@keyframes ctrl-progress {
  from {
    transform: translate3d(-100%, 0, 0);
    opacity: 0.5;
  }
}

.progress {
  animation: ctrl-progress 7.5s cubic-bezier(0, 0, 0.2, 1);
}

.controller-wrap:hover .progress {
  animation-play-state: paused;
}
</style>
