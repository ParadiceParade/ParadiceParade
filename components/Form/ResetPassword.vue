<template>
    <section class='max-w-[550px]'>

        <Transition name='slide-y' mode="out-in">
            <div :key="rootKey" style="--slide-y:-.35rem">
                <template v-if="showSent">
                    <div class='text-center' :class="rootClass">
                        <IconSent class="text-[64px] text-green-700 dark:text-green-400"/>

                        <h3 class="text-xl font-semibold mb-3">
                            Check your email
                        </h3>

                        <p class="text-[0.9rem] leading-loose px-2 text-gray-800 dark:text-gray-200">
                            We just sent you an email with instructions for resetting your password. 
                            <br/>
                            If you didn't receive an email, 
                            <Button 
                                link 
                                underline 
                                primary 
                                class='mx-0 text-base'
                                @click="tryAgain"
                            >
                                try again
                            </Button> 
                            or 
                            <Button link underline primary class='mx-0 text-base'>
                                contact us
                            </Button>.
                        </p>
                    </div>

                    <div class="font-normal text-gray-700 dark:text-gray-300 text-base mt-3 pr-2 pl-5">
                        <Button link underline primary class="mx-0" @click="$emit('change-form','SignIn')">
                            Log in
                        </Button>
                        or
                        <Button link underline primary class="mx-0" @click="$emit('change-form','SignUp')">
                            Create an account
                        </Button>
                    </div>
                </template>

                <template v-else>
                    <Form name='sign-in' action="." submit-text='Reset password' :class="rootClass">
                        <div class="px-2 mb-6">
                            <h2 class="font-medium text-xl mb-2">
                                Reset your password
                            </h2>

                            
                            <h3 class="font-normal text-sm text-gray-700 dark:text-gray-300">
                                Enter a valid email or username to receive instructions on how to reset your password.
                            </h3>

                        </div>

                        <Input
                            v-for="(input, i) in inputs"
                            :key="i"
                            :class="input.class"
                            v-bind="input.attrs"
                            v-on="input.events"
                        />

                        <div v-if="error" class="grid grid-flow-col grid-cols-[auto,1fr] gap-x-2 py-2 px-3 border border-amber-500 dark:border-amber-300 border-opacity-30 dark:border-opacity-30 bg-amber-400 bg-opacity-60 dark:bg-opacity-60 text-black text-opacity-80 dark:text-opacity-100 w-full mb-6 rounded-md">
                            <MdiAlert/>
                            {{'Invalid username or password'}}
                        </div>

                    </Form>

                    <h4 class="font-normal text-base mt-3 pr-2 pl-5">
                        Or 
                        <Button link underline primary class="mx-0" @click="$emit('change-form','SignIn')">
                            Log in
                        </Button>
                    </h4>
                </template>
            </div>
        </Transition>

    </section>
</template>

<script lang='ts'>
    import Vue from 'vue'

    export default Vue.extend({
        name:'FormForgotPassword',
        props:{
        },

        data:()=>({
            username: '',
            password: '',
            error: null,
            showSent: false,
            rootClass: "py-6 px-4 bg-white dark:bg-[#222222] rounded-lg border-[0.75px] border-gray-200 dark:border-gray-700 dark:border-opacity-60 shadow-lg",
            rootKey: 0
        }),

        computed:{
            inputs(){

                return [
                    {
                        attrs: {
                            label: 'Email or username',
                            modelValue: this.username,
                        },
                        class:['mb-6'],
                        events: {
                            'update:modelValue': (e) => {
                                this.username = e;
                            }
                        }
                    }
                ]
            }
        },
        
        methods:{
            async tryAgain(){
                this.rootKey++

                await this.$nextTick()

                this.showSent = false
            }
        }
    })
</script>

<style>

</style>