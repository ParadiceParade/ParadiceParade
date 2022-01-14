<template>
    <section v-if="contents" class="w-full max-w-[calc(100vw-2rem)] md:max-w-2xl">
        <h2 class="text-xl mb-4">   
            Delivery info
        </h2>

        <address
            class="border border-dashed border-gray-400 dark:border-gray-600 rounded-lg divide-y divide-dotted divide-gray-400 bg-primary-50 dark:bg-[#222222] dark:divide-gray-600"
        >

            <div 
                v-for="(info, i) in contents" 
                :key="`${i}`"
                class="flex w-full justify-between items-center p-4"
            >
                <span
                    class="text-sm opacity-70 mr-2 whitespace-nowrap"
                >
                    {{info.title}}:
                </span>

                <span class="w-full truncate text-right text-true-gray-800 dark:text-true-gray-200">
                    {{info.content}}
                </span>
            </div>
            
        </address>

        <Button
            link
            primary
            underline
            class="group mx-0 pl-1 mt-4"
        >
            <span
                class="transform-gpu transition-transform group-hover:-translate-x-1 mr-1"
            >
                &larr;
            </span>

            Edit delivery info
        </Button>
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