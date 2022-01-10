<template>
  <div
    class="w-screen max-w-lg lg:max-w-md xl:max-w-xl h-full overflow-y-auto isolate grid grid-rows-[auto,1fr] sm:border-l-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 content-start"
  >
    <header
      class="flex items-center justify-between h-[56px] sm:h-[64px] px-3 sm:px-4 border-b-[0.75px] border-black dark:border-white border-opacity-10 dark:border-opacity-10"
    >
      <h2 class="font-semibold">
        {{title}}
      </h2>

      <Button title="close filters" icon size="lg" @click="closeDialog">
        <MdiWindowClose class="text-2xl" />
      </Button>
    </header>

    <CartList
      :is-checkout="isCheckout"
      @on-continue-shoping="closeDialog"
      @on-checkout="checkout"
    />    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CartDialog',

  props:{
    title: {
      type:String,
      default: "Shopping cart"
    },
    isCheckout:Boolean
  },

  computed: {
    ...mapState(['dialog'])
  },

  methods: {
    async closeDialog(checkout) {
      if(checkout && this.$route.path !== '/checkout'){
        this.$commit('UPDATE',{
          path: 'dialog',
          value:{
            ...this.dialog,
            onAfterLeave:()=>{
              this.$router.push('/checkout')
            }
          }
        })

        await this.$nextTick();
      }

      this.$commit('UPDATE', {
        path: 'active',
        innerPath: 'dialog',
        value: false
      })
    },

    async checkout(){
      await this.closeDialog(true);
    }
  }
}
</script>
