<template>
  <section>

    <Form name='sign-in' action="." submit-text='Sign up' class="py-6 px-4 bg-white dark:bg-[#202020] rounded-lg border-[0.75px] border-gray-200 dark:border-gray-700 dark:border-opacity-60 shadow-lg">
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
            :class="input.class || 'mb-6'"
            v-bind="input.attrs"
            v-on="input.events"
        />

        <div aria-label="password checklist" class="ml-2 mb-6">
            <div
                v-for="(field, i) in passwordCheckList"
                :key="i"
                class="grid w-[fit-content] grid-flow-col items-center gap-x-[6px] text-sm"
                :class="{
                    'text-gray-600 dark:text-gray-400': !field.checked,
                    'text-green-600 dark:text-green-500 dark:text-opacity-80': field.checked
                }"
            >
            
                <Component :is="field.checked ? 'MdiCheck' : 'MdiRadioBoxBlank'"/>
                
                {{field.title}}
            </div>
        </div>

        <Input
            v-for="(input, i) in confirmPasswordInput"
            :key="`${i}-confirm-password`"
            :class="input.class || 'mb-6'"
            v-bind="input.attrs"
            v-on="input.events"
        />
    </Form>

    <h3 class="font-normal text-sm sm:text-base mt-8 pr-2 pb-2 border-b border-gray-200 dark:border-gray-700 w-full">
        Have an account? 
        <Button 
            link 
            underline 
            :to="signInLink"
            class="text-primary-700 dark:text-primary-400 mx-0 text-base"
            @click="$emit('change-form', 'SignIn')">
            Sign in
        </Button>
    </h3>

    <h4 class="font-normal mt-2 pr-2 text-sm text-gray-700 dark:text-gray-300">
        By creating an account, you agree to our
        <Button link underline class="mx-0 text-primary-700 dark:text-primary-400 text-[0.9rem]">
            Terms of Service
        </Button>
        and 
        <Button link underline class="mx-0 text-primary-700 dark:text-primary-400 text-[0.9rem]">
            Privacy policy
        </Button>
    </h4>

  </section>
</template>

<script lang='ts'>
    import Vue from 'vue'

    // interface InputField  { 
    //     class?: string; 
    //     attrs: { 
    //         label: string; 
    //         type?: string; 
    //         modelValue: any; 
    //     }; 
    //     events: { 
    //         'update:modelValue': (e: string) => void; 
    //     }; 
    // }

    export default Vue.extend({
        name:'FormSignUp',
        props:{
            title: {
                type: String,
                default: 'Create your account'
            },
            signInLink:{
                type:String,
                default: undefined
            }
        },

        data:()=>({
            email:'',
            username: '',
            password: '',
            confirmPassword:'',
            error: null,
        }),

        computed:{
            inputs(){

                return [
                    {
                        attrs: {
                            label: `Email${!this.email ? '*':''}`,
                            type:'email',
                            modelValue: this.email,
                        },
                        events: {
                            'update:modelValue': (e) => {
                                this.email = e;
                            }
                        }
                    },

                    {
                        attrs: {
                            label: `Username${!this.username ? '*':''}`,
                            modelValue: this.username,
                        },
                        events: {
                            'update:modelValue': (e) => {
                                this.username = e;
                            }
                        }
                    },

                    {
                        class:'mb-1',
                        attrs: {
                            label: `Password${!this.password ? '*':''}`,
                            type:'password',
                            modelValue: this.password,
                        },
                        events: {
                            'update:modelValue': (e) => {
                                this.password = e;
                            }
                        }
                    },
                ]
            },

            confirmPasswordInput(){
                return [{
                    class:'mb-8',
                    attrs: {
                        label: `Confirm password${!this.confirmPassword ? '*':''}`,
                        type:'password',
                        modelValue: this.confirmPassword,
                    },
                    events: {
                        'update:modelValue': (e) => {
                            this.confirmPassword = e;
                        }
                    }
                }]
            },

            validPasswordLength(){
                const length = this.password.length;

                return length > 5 && length < 33; 
            },

            passwordCheckList(){
                const password = this.password;

                return [
                    {
                        title: 'Lowercase',
                        checked: /[a-z]/.test(password)
                    },
                    {
                        title: 'Uppercase',
                        checked: /[A-Z]/.test(password)
                    },
                    {
                        title: 'Number',
                        checked: /[0-9]/.test(password)
                    },
                    {
                        title: 'Special character',
                        checked: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
                            .test(password)
                    }
                ]
            },

            validPassword(){
                return this.validPasswordLength &&
                    !Object.values(this.passwordCheckList)
                        .includes(false);
            }
        }
    })
</script>