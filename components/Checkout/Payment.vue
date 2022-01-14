<template>
    <section class="w-full max-w-xl">
        <LazyCheckoutDeliveryInfo
            :contents="deliveryInfo"
        />

        <hr
            class="border-t-[0.75px] border-gray-300 dark:border-gray-700 my-12"
        />

        <h2 class="text-xl mb-4">   
            Payment details
        </h2>

        <LazyFormPayment/>
    </section>
</template>

<script>
   export default {
       name:'CheckoutPayment',
       data:()=>({
           deliveryInfo:[
               {
                   title: 'Recipient',
                   content: 'ihejirikabenchidi@gmail.com'
               },
               {
                   title: 'Ship to',
                   content: 'Raji Apoyin, 16, 100001 Lagos EN, Nigeria'
               },{
                   title: 'Method',
                   content: 'UPS Worldwide Expedited® - Duties and Taxes NOT included' 
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