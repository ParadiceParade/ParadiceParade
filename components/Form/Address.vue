<template>
    <section>
        <LazyFormSavedAddress title="Choose an address"/>

        <Divider class="my-8 lg:my-12 text-gray-700 dark:text-gray-300">
            OR
        </Divider>

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
    }
</script>