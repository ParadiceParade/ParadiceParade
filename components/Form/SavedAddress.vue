<template>
    <section>
        <h2
            :id="titleId"
        >
            Saved address
        </h2>

        <div
            :aria-labelledby="titleId"
            role="radiogroup"
            class="grid grid-cols-1 max-w-sm mx-auto"
        >
            <button
                role="radio"
                class="grid grid-flow-col grid-cols-[1fr,auto] gap-x-3 items-center px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-md relative fill-before ring ring-offset-2 ring-offset-white dark:ring-offset-black ring-primary-700 dark:ring-primary-500"
            >
                <div class="text-left">
                    <p class="truncate font-medium text-gray-900 dark:text-gray-50">
                        Address name
                    </p>

                    <p class="truncate text-sm opacity-80">
                        16 Raji Apoyin, Lagos, Nigeria
                    </p>
                </div>

                <Component
                    :is="'MdiRadioBoxMarked'"
                    class="text-2xl"
                    :class="{
                        'opacity-60': false,
                        'opacity-90 text-primary-700 dark:text-primary-500':true
                    }"
                />
            </button>            
        </div>
    </section>
</template>

<script>
    export default{
        name: 'SavedAddress',   
        
        computed:{
            titleId(){
                return `saved-address-${this._uid}`
            }
        }
    }
</script>