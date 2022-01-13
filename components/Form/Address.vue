<template>
    <section class="w-full">
        <template v-if="savedAddress">
            <LazyFormSavedAddress 
                title="Choose an address"
                @item-selected="updateSavedAddress"
            />

            <div
                v-if="selectedSavedAddress"
                class="px-4 pt-4"
            >
                <Button primary block>
                    Use address
                </Button>
            </div>

            <Divider class="my-8 lg:my-12 text-gray-700 dark:text-gray-300">
                OR
            </Divider>
        </template>

        <h2
            class="text-xl mb-4"
        >
            Create an address
        </h2>

        <FormCreateAddress/>
    </section>
</template>

<script>
    export default{
        name: 'FormAddress',    
        data:()=>({
            savedAddress: true,
            selectedSavedAddress: null
        }),

        methods:{
            updateSavedAddress(e){
                this.selectedSavedAddress = `${e}`;
            }
        }
    }
</script>