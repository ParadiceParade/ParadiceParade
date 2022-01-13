<template>
    <section v-if="contents">
        <h2>   
            Delivery info
        </h2>

        <address>

            <div v-for="(info, i) in contents" :key="`${i}`">
                <span>
                    {{info.title}}
                </span>

                <span>
                    {{info.content}}
                </span>
            </div>
            
        </address>
    </section>
</template>

<script>
   export default {
       name: 'CheckoutDeliveryInfo',
       props:{
           contents:{
               type: Array,
               default: undefined
           }
       }
   }
</script>