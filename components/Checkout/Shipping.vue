<template>
    <section>
        <LazyCheckoutDeliveryInfo
            :contents="deliveryInfo"
        />
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