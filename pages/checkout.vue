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
          class="rounded-2xl w-[56px] h-[56px] md:w-[64px] md:h-[64px] fixed bottom-[28px] right-[28px] md:bottom-[32px] md:right-[32px] z-10 font-bold text-2xl shadow-2xl bg-black text-white dark:bg-primary-50 dark:text-black"
          @click="showSummary"
        >
          <MdiPlus/>
        </Button>
      </Transition>
      <!-- fab ends -->

      <div 
        class="w-full relative fill-before lg:before:bg-white lg:before:bg-opacity-90 lg:dark:before:bg-[#181818] before:left-auto before:right-0 before:w-screen before:z-[-1] isolate pb-16"
      >
        <CheckoutHeader :steps='steps'/>
        <div
        >
          <div 
            v-if="view"
            class='grid justify-items-center max-w-2xl mx-auto px-3 sm:px-6 lg:px-0'>
            <Component 
              :is="view.is"
              v-bind="{
                ...(view.props||{}),
                ...(view.attrs||{})
              }"
              v-on="view.events"
            />
          </div>
        </div>
      </div>

      <div 
        v-if="!isMiniDevice"
        class="max-w-md w-screen max-h-screen lg:sticky lg:top-0 border-l-[0.75px] border-gray-200 dark:border-gray-800 hidden lg:block">
          <LazyCartList
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
      return parseInt(this.$route.query.step);
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
          title: 'Sign in',
          is: 'LazyOnboard',
          props: {
            contentClass: "w-full max-w-[550px] mx-auto",
            initialForm: this.currentForm
          },
          events:{
            'form-changed': this.onboardChanged
          }
        },
        {
          title: 'Address',
          is: 'LazyFormAddress'
        },
        {
          title: 'Shipping',
          is: 'LazyCheckoutShipping'
        },
        {
          title: 'Payment',
          is: 'LazyCheckoutPayment'
        }
      ]
    },

    view(){
      return this.steps[`${this.currentStep - 1}`]
    }
  },

  beforeCreate(){
    if(!/^(1|2|3|4)$/.test(this.$route.query.step)){
      const signIn = {
        step: '1',
        form: 'sign-in'
      }

      this.$router.replace({
        query: signIn
      })
    }
  },

  methods:{
    updateStep(step){
      if(this.currentStep == step) return;

      this.$router.replace({
        query:{
          ...this.$route.query,
          step,
        }
      })
    },
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
    onboardChanged(e) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          form: e,
        },
      });
    },    
  }
}
</script>

<style>

</style>