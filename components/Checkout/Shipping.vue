<template>
    <section class="w-full">
        <LazyCheckoutDeliveryInfo
            :contents="deliveryInfo"
        />

        <hr
            class="border-t-[0.75px] border-gray-300 dark:border-gray-700 my-12"
        />

        <LazyCheckoutShippingMethod/>
    </section>
</template>

<script>
   export default {
       data:()=>({
           deliveryInfo:[
               {
                   title: 'Recipient',
                   content: 'ihejirikabenchidi@gmail.com'
               },
               {
                   title: 'Address',
                   content: 'Raji Apoyin, 16, 100001 Lagos EN, Nigeria'
               }
           ]
       })
   }
</script>