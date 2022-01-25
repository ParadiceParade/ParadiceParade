<template>
  <section>

    <Form name='sign-in' action="." submit-text='Sign in' class="py-6 px-4 bg-white dark:bg-[#202020] rounded-lg border-[0.75px] border-gray-200 dark:border-gray-700 dark:border-opacity-60 shadow-lg">
        <h2 class="font-medium text-xl mb-4 px-2">
            {{title}}
        </h2>

        <div v-if="error" class="grid grid-flow-col grid-cols-[auto,1fr] gap-x-2 py-2 px-3 border border-amber-500 dark:border-amber-300 border-opacity-30 dark:border-opacity-30 bg-amber-400 bg-opacity-60 dark:bg-opacity-60 text-black text-opacity-80 dark:text-opacity-100 w-full mb-6 rounded-md">
            <MdiAlert/>
            {{'Invalid username or password'}}
        </div>

        <Input
            v-for="(input, i) in inputs"
            :key="i"
            :class="input.class"
            v-bind="input.attrs"
            v-on="input.events"
        />

        <Button link underline class="text-primary-700 dark:text-primary-400 mb-6 ml-1"
            :to="forgotPasswordLink"
         @click="$emit('change-form', 'ResetPassword')" 
        >
            Forgot password?
        </Button>
    </Form>

    <h3 class="font-normal text-sm sm:text-base mt-6 pr-2">
        Need an account? 
        <Button 
            link 
            :to="signUpLink"
            underline 
            class="text-primary-700 dark:text-primary-400 mx-0 text-base" 
            @click="$emit('change-form', 'SignUp')">
            Sign up
        </Button>
    </h3>

  </section>
</template>

<script lang='ts'>
    import Vue from 'vue'

    export default Vue.extend({
        name:'FormSignIn',
        props:{
            title: {
                type: String,
                default: 'Sign in'
            },
            forgotPasswordLink:{
                type:String,
                default: undefined
            },
            signUpLink:{
                type:String,
                default: undefined
            }
        },

        data:()=>({
            username: '',
            password: '',
            error: null
        }),

        computed:{
            inputs(){

                return [
                    {
                        attrs: {
                            label: `Email or username${!this.username ? '*':''}`,
                            modelValue: this.username,
                        },
                        class:['mb-6'],
                        events: {
                            'update:modelValue': (e) => {
                                this.username = e;
                            }
                        }
                    },

                    {
                        attrs: {
                            label: `Password${!this.password ? '*':''}`,
                            type:'password',
                            modelValue: this.password,
                        },
                        class:['mb-1'],
                        events: {
                            'update:modelValue': (e) => {
                                this.password = e;
                            }
                        }
                    }
                ]
            }
        }
    })
</script>

<style>

</style>