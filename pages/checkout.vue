<template>
  <article
    class="grid lg:grid-flow-col lg:grid-cols-[1fr,auto] w-[min(100vw,80em)] mx-auto"
  >   
      <!-- fab -->
      <Transition
        name="scale-transition"
        mode="out-in"
      >
        <Button 
          v-if="showFab"
          titlle="open order sumary"
          class="rounded-2xl w-[56px] h-[56px] md:w-[64px] md:h-[64px] fixed bottom-[28px] right-[28px] md:bottom-[32px] md:right-[32px] z-10 font-bold text-2xl shadow-xl"
          primary
          @click="showSummary"
        >
          <MdiPlus/>
        </Button>
      </Transition>
      <!-- fab ends -->

      <div 
        class="w-full relative fill-before lg:before:bg-white lg:before:bg-opacity-90 lg:dark:before:bg-[#181818] before:left-auto before:right-0 before:w-screen before:z-[-1] isolate"
      >
        <header
          class="h-[48px] xs:h-[56px] lg:h-[64px] xl:h-[72px] w-full border-b-[0.75px] border-gray-200 dark:border-gray-800 dark:bg-[#191919] bg-white sticky top-0 z-10 grid grid-flow-col grid-cols-[auto,1fr] items-center mb-8 overflow-x-hidden"
        >
          <div
            class="pseudo w-7 -right-1 left-auto z-10 bg-gradient-to-r  dark:from-[#19191900] from-[#fff0] to-white dark:to-[#191919] dark:via-[#191919] via-white"
          />

          <h2 class="text-xl xs:text-2xl ml-4 sm:ml-6 font-extrabold text-gray-800 dark:text-gray-200 relative fill-before before:h-[70%] before:top-[15%] before:border-r-[0.75px] before:border-gray-200 dark:before:border-gray-800 pr-3 md:pr-6 h-full flex items-center justify-end">
            Checkout
          </h2>

          <nav class="h-full flex items-center ml-3 sm:ml-6 max-w-full overflow-x-auto hide-scrollbar">
            <ul class="grid grid-flow-col gap-x-4 items-center pr-8">
              <li
                v-for="(step, i) in steps"
                :key="`step-${i}`"
                class="grid items-center grid-flow-col gap-x-2 whitespace-nowrap"
              >
                <span
                  class="text-sm"
                >
                  {{step.title}}
                </span>

                <MdiChevronRight
                  v-if="i < steps.length - 1"
                  class="text-gray-600 dark:text-gray-400"
                />
              </li>
            </ul>
          </nav>
          
        </header>

        <div
        >
          <div 
            class='grid max-w-2xl mx-auto px-3 sm:px-6 lg:px-0'>
            <Onboard 
              class="w-full max-w-[550px] mx-auto"
              @form-changed="onboardChanged"
            />
          </div>
        </div>
      </div>

      <div 
        v-if="!isMiniDevice"
        class="max-w-md w-screen max-h-screen lg:sticky lg:top-0 border-l-[0.75px] border-gray-200 dark:border-gray-800 hidden lg:block">
          <CartList
            is-checkout
            class="w-full"
          />
      </div>
  </article>
</template>

<script>
import {mapState} from 'vuex';

const miniDeviceRegExp = /xxs|xs|sm|md/

export default {
  name: 'CheckoutPage',

  data:()=>({
    stepSet: false,
  }),

  head(){
    return {
      title: 'Checkout'
    }
  },

  computed:{
    ...mapState(['breakpoints']),

    currentStep(){
      return this.$router.query.step;
    },

    isMiniDevice(){
      return miniDeviceRegExp.test(this.breakpoints.is);
    },

    showFab(){
      return this.isMiniDevice
    },

    steps(){
      return [
        {
          title: 'Sign in'
        },
        {
          title: 'Address'
        },
        {
          title: 'Shipping'
        },
        {
          title: 'Payment'
        }
      ]
    }
  },

  beforeCreate(){
    if(!/^(1|2|3|4)$/.test(this.$route.query.step)){
      this.$router.replace({
        query: {
          step: '1'
        }
      })
    }
  },

  methods:{
    showSummary(){
      this.$openCart({
        contentProps:{
          title: "Order summary",
          isCheckout: true,
        },
        renderIf: ()=> 
          miniDeviceRegExp.test(this.$store.state.breakpoints.is)
      })
    },

    onboardChanged(e){
      this.$router.replace({
        query:{
          ...this.$route.query,
          form: e
        }
      })
    }
  }
}
</script>

<style>

</style>