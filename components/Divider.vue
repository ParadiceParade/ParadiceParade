<template>
    <div
        class="root"
    >
        <slot/>
    </div>
</template>

<style scoped>
    .root{
        @apply grid items-center grid-flow-col grid-cols-[1fr,auto,1fr] gap-x-2 before:w-full before:block after:block after:w-full before:h-[0.75px] after:h-[0.75px] before:bg-gray-300 dark:before:bg-gray-700 after:bg-gray-300 dark:after:bg-gray-700;
    }
</style>