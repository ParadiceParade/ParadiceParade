<template>
    <section class="w-full max-w-xl">
        <LazyCheckoutDeliveryInfo
            :contents="deliveryInfo"
        />

        <hr
            class="border-t-[0.75px] border-gray-300 dark:border-gray-700 my-12"
        />

        <LazyCheckoutShippingMethod/>

        <div
            class="px-4 sm:px-0 pt-16 pb-6"
        >
            <Button 
              size="lg" 
              primary 
              block
              class="group"
              @click="submitForm"
            >
                Continue to payment
                <span aria-hidden="true" 
                class="group-hover:translate-x-1 transform-gpu transition-transform"
              > &rarr;</span>
            </Button>
        </div>

    </section>
</template>

<script>
   export default {
       name:'CheckoutShipping',
       data:()=>({
           deliveryInfo:[
               {
                   title: 'Recipient',
                   content: 'ihejirikabenchidi@gmail.com'
               },
               {
                   title: 'Ship to',
                   content: 'Raji Apoyin, 16, 100001 Lagos EN, Nigeria'
               }
           ]
       }),

       methods:{
           submitForm(){
               this.$router.replace({
                   query:{
                       ...this.$route.query,
                       step: '4'
                   }
               })
           }
       }
   }
</script>