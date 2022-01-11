<template>
    <Transition :name="'slide-y'" mode="out-in">
        <Component 
            :is="lazyComponent" 
            :title="title" 
            style="--slide-y:.35rem"
            :class="contentClass"
            @change-form="changeForm" 
        />
    </Transition>
</template>

<script lang='ts'>
import Vue from 'vue'
import { kebabCase, camelCase, capitalize } from '~/utils/main';

const validForms = /SignIn|SignUp|Reset/;

export default Vue.extend({
    name: 'Onboard',

    props:{
        contentClass:{
            type: [String, Object, Array],
            default: undefined
        },
        title: {
            type:String,
            default: undefined
        },
        updateRouteQuery: Boolean,
        queryName:{
            type:String,
            default: 'onboard'
        },
        initialForm:{
            type:String,
            default:'SignIn'
        }
    },

    data:()=>({
        component: 'FormSignIn'
    }),

    computed: {
        lazyComponent(){
            return `Lazy${this.component}`
        }
    },

    created(){
        const parseInitialForm = capitalize(camelCase(this.initialForm));
        
        if(validForms.test(parseInitialForm)){
            this.component = `Form${parseInitialForm}`
        }
    },

    mounted(){
        this.setRouteQuery();
    },

    methods:{
        async changeForm(form){
            this.component = `Form${form}`

            await this.$nextTick();

            this.$emit('form-changed', this.queryString())

            await this.$nextTick();

            this.setRouteQuery()
        },
        queryString(){
            return kebabCase(
                this.component.replace(/form/i,'')
            ).toLowerCase();
        },
        setRouteQuery(){
            if(!this.updateRouteQuery) return;

            const queryString = this.queryString()

            const query = this.queryName;

            if(this.$route.query[query] == queryString) return;
            
            this.$router.replace({
                query:{
                    ...this.$route.query,
                    [query]: kebabCase(
                        this.component.replace(/form/i,'')
                    ).toLowerCase()
                }
            })
        }
    }
})
</script>

<style>

</style>