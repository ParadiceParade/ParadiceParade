<template>
    <section>
        <h2
            :id="titleId"
            class="text-xl mb-4"
        >
            {{title}}
        </h2>

        <div
            :aria-labelledby="titleId"
            role="radiogroup"
            class="grid mx-auto outline-none"
            :class="{
                'grid-cols-2 gap-4': !isMiniDevice,
                'grid-cols-1 max-w-sm gap-y-4': isMiniDevice
            }"
        >
            <RadioItem
                v-for="i in 4"
                :id="`input-${i}`"
                :key="i"
                :model-value="selected == i"
                :initial-focus="i == 1"
                @update:modelValue="selected = i"
            />         
        </div>

        <Button
            v-if="selected"
            link
            primary
            class="mt-6 -mb-2 lg:mx-0"
        >
            Edit address
            <MdiEdit/>
        </Button>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default{
        name: 'SavedAddress',
        
        props:{
            title:{
                type:String,
                default: 'Saved address'
            }
        },

        data:()=>({
            selected: null
        }),
        
        computed:{
            ...mapState(['breakpoints']),
            isMiniDevice(){
                return /sm|xs|xxs/.test(this.breakpoints.is)
            },
            titleId(){
                return `saved-address-${this._uid}`
            }
        }
    }
</script>