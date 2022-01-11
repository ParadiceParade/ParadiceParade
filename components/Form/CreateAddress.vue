<template>
  <section>

    <Form name='sign-in' action="." submit-text='Sign up' class="py-6 px-4 bg-white dark:bg-[#222222] rounded-lg border-[0.75px] border-gray-200 dark:border-gray-700 dark:border-opacity-60 shadow-lg">

        <div v-if="error" class="grid grid-flow-col grid-cols-[auto,1fr] gap-x-2 py-2 px-3 border border-amber-500 dark:border-amber-300 border-opacity-30 dark:border-opacity-30 bg-amber-400 bg-opacity-60 dark:bg-opacity-60 text-black text-opacity-80 dark:text-opacity-100 w-full mb-6 rounded-md">
            <MdiAlert/>
            {{'Invalid username or password'}}
        </div>

        <Component
            :is="input.is || 'Input'"
            v-for="(input, i) in inputs"
            :key="i"
            :class="input.class || 'mb-4'"
            v-bind="input.attrs"
            v-on="input.events"
        />

        <div aria-label="password checklist" class="ml-2 mb-4">
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

        <h2 class="font-medium text-base my-4 pt-4 border-t-[0.75px] border-gray-200 dark:border-gray-600 border-dotted">
            Contact information
        </h2>

        <Input
            v-for="(input, i) in confirmPasswordInput"
            :key="`${i}-confirm-password`"
            :class="input.class || 'mb-4'"
            v-bind="input.attrs"
            v-on="input.events"
        />
    </Form>

    <h3 class="font-normal text-sm sm:text-base mt-3 pr-2 pl-5 pb-2 border-b border-gray-200 dark:border-gray-700 w-full">
        Have an account? 
        <Button 
            link 
            underline 
            class="text-primary-700 dark:text-primary-400 mx-0 text-base"
            @click="$emit('change-form', 'SignIn')">
            Sign in
        </Button>
    </h3>

    <h4 class="font-normal mt-2 pr-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
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

<script>
    import Vue from 'vue'

    export default Vue.extend({
        name:'FormCreateAddress',
        props:{
            title: {
                type: String,
                default: 'Create your account'
            }
        },

        data:()=>({
            email:'',
            username: '',
            password: '',
            confirmPassword:'',
            error: null,
            country: 1,
            countryList: Array.from({
                length: 200
            },(_, i) => i+1)
        }),

        computed:{
            inputs(){

                return [
                    {
                        is: 'LazySelect',
                        attrs:{
                            label: 'Country/region',
                            placeholder: 'Search',
                            name: 'country-field',
                            searchable: true,
                            modelValue: this.country,
                            options: this.countryList,
                            listClass: [
                                'bg-white dark:bg-[#333]'
                            ]
                        },
                        events:{
                            'update:modelValue': e => {
                                this.country = e;
                            }
                        }
                    },
                    {
                        attrs: {
                            label: 'Email',
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
                            label: 'Username',
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
                            label: 'Password',
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
                    class:'mb-6',
                    attrs: {
                        label: 'Confirm password',
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
        },
    })
</script>