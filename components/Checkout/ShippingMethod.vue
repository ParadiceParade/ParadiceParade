<template>
    <section>
        <h2 class="text-xl mb-6">   
            Shipping method
        </h2>

        <div
            :aria-labelledby="titleId"
            role="radiogroup"
            class="grid outline-none grid-cols-1 max-w-2xl gap-y-4"
        >
            <RadioItem
                v-for="(method, i) in methods"
                :id="`input-${i}`"
                :key="i"
                :model-value="selected == i"
                :initial-focus="i == 1"
                :title="method.title"
                :subtitle="method.subtitle"
                @update:modelValue="(
                    selected = i, 
                    $emit('item-selected', selected)
                )"
            />         
        </div>
    </section>
</template>

<script>
    // import { mapState } from 'vuex';

   export default {
       name: 'CheckoutShippingMethod',
       data:()=>({
           selected:null,
           methods:[
               {
                   title: '$19.88',
                   subtitle: 'DHL eCommerce Standard - Duties and Taxes NOT included',
               },
               {
                   title: '$38.48',
                   subtitle: 'UPS Worldwide Expedited® - Duties and Taxes NOT included'
               }
           ]
       }),
       computed:{
           titleId(){
               return `shipping-method-${this._uid}`
           }
       },
   }
</script>