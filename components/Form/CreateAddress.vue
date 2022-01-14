<template>
  <section>
    <Form
      name="sign-in"
      action="."
      class="py-6 bg-white dark:bg-[#222222] rounded-lg border-[0.75px] border-gray-200 dark:border-gray-700 dark:border-opacity-60 shadow-lg lg:max-w-full"
    >
      <div
        v-if="error"
        class="grid grid-flow-col grid-cols-[auto,1fr] gap-x-2 py-2 px-3 mx-4 border border-amber-500 dark:border-amber-300 border-opacity-30 dark:border-opacity-30 bg-amber-400 bg-opacity-60 dark:bg-opacity-60 text-black text-opacity-80 dark:text-opacity-100 w-full mb-6 rounded-md"
      >
        <MdiAlert />
        {{ "Invalid username or password" }}
      </div>

      <Component
        :is="input.is || 'Input'"
        v-for="(input, i) in inputs.basic"
        :key="i"
        class="mx-4"
        :class="input.class || 'mb-4'"
        v-bind="input.attrs"
        v-on="input.events"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4">
           <Component
                :is="input.is || 'Input'"
                v-for="(input, i) in inputs.stateAndPostal"
                :key="`${i}-state-province`"
                v-bind="input.attrs"
                v-on="input.events"
            />
      </div>

      <h2
        class="font-medium text-sm mb-4 mt-8 pt-4 px-4 border-t-[0.75px]"
        :class="borderDashedClass"
      >
        Contact information
      </h2>

      <div class="px-4 mb-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input
                v-for="(input, i) in inputs.recipient.name"
                :key="`${i}-recipient-name`"
                v-bind="input.attrs"
                v-on="input.events"
            />
        </div>

        <Input
            v-for="(input, i) in inputs.recipient.contact"
            :key="`${i}-recipient-contact`"
            :class="input.class || 'mb-4'"
            v-bind="input.attrs"
            v-on="input.events"
        />
      </div>

      <div class="mt-16 border-b-[0.75px] border-t-[0.75px]" :class="borderDashedClass">
          <Button
            tag="div"
            class="rounded-none justify-between w-full my-2 primary-text"
            @click="saveCollapsed = !saveCollapsed"
          >
            Save address

            <Component
                :is="saveCollapsed ? 'MdiPlus': 'MdiMinus'"
                class="text-xl opacity-70"
            />
          </Button>

          <div
            class="transition-height"
            :class="{
              'h-0': saveCollapsed,
              'h-[142px]': !saveCollapsed
            }"
          >
            <div 
              v-if="!saveCollapsed"
              class="px-4 fade-appear">

              <Input
                  v-for="(input, i) in inputs.save"
                  :key="`${i}-save`"
                  :class="input.class || 'mb-4'"
                  v-bind="input.attrs"
                  v-on="input.events"
              />

              <div class="grid grid-flow-col gap-x-4 grid-cols-1 xs:grid-cols-2 py-4 px-4 sm:px-6 justify-center">
                  <Button 
                      v-for="action in saveActions"
                      :key="action.title"
                      class="w-full"
                      :class="action.class"
                      v-on="action.events"
                  >
                      <MdiSave v-if="action.icon"/>

                      {{
                          action.title
                      }}
                  </Button>
              </div>
                
            </div>
          </div>
      </div>

        <div
            class="px-4 sm:px-8 pt-12 pb-6"
        >
            <Button 
              type="submit" 
              size="lg" 
              primary 
              block
              class="group"
              @click="submitForm"
            >
                Continue to shipping
                <span aria-hidden="true" 
                class="group-hover:translate-x-1 transform-gpu transition-transform"
              > &rarr;</span>
            </Button>
        </div>

    </Form>
  </section>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "FormCreateAddress",
  props: {
    title: {
      type: String,
      default: "Create your account",
    },
  },

  data: () => ({
    company: "",
    address: "",
    appartment: "",
    city: "",
    stateOrProvince: "",
    postalCode: "",
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    error: null,
    country: 1,
    countryList: Array.from(
      {
        length: 200,
      },
      (_, i) => i + 1
    ),
    saveCollapsed: true,
    borderDashedClass: 'border-dashed border-gray-200 dark:border-gray-600',
    save:{
        name: ''
    }
  }),

  computed: {
    inputs() {
      return {
        basic: [
          {
            attrs: {
              label: "Company (optional)",
              modelValue: this.company,
            },
            events: {
              "update:modelValue": (e) => {
                this.company = e;
              },
            },
          },

          {
            attrs: {
              label: `Address${!this.address ? "*" : ""}`,
              modelValue: this.address,
            },
            events: {
              "update:modelValue": (e) => {
                this.address = e;
              },
            },
          },

          {
            attrs: {
              label: "Appartment, suite, etc (optional)",
              modelValue: this.appartment,
            },
            events: {
              "update:modelValue": (e) => {
                this.appartment = e;
              },
            },
          },

          {
            attrs: {
              label: `City${!this.city ? "*" : ""}`,
              modelValue: this.city,
            },
            events: {
              "update:modelValue": (e) => {
                this.city = e;
              },
            },
          },

          {
            is: "LazySelect",
            attrs: {
              label: "Country/region",
              placeholder: "Search",
              name: "country-field",
              searchable: true,
              modelValue: this.country,
              options: this.countryList,
              listClass: ["bg-white dark:bg-[#333]"],
            },
            events: {
              "update:modelValue": (e) => {
                this.country = e;
              },
            },
          },
        ],

        stateAndPostal: [
          {
            is: "LazySelect",
            attrs: {
              label: `State${!this.stateOrProvince ? "*" : ""}`,
              modelValue: this.stateOrProvince,
              placeholder: "Search",
              name: "country-field",
              searchable: true,
              options: this.countryList,
              listClass: ["bg-white dark:bg-[#333]"],
            },            
            events: {
              "update:modelValue": (e) => {
                this.stateOrProvince = e;
              },
            },
          },

          {
            attrs: {
              label: `Postal code${!this.postalCode ? "*" : ""}`,
              modelValue: this.postalCode,
            },
            events: {
              "update:modelValue": (e) => {
                this.postalCode = e;
              },
            },
          },
        ],

        recipient:{
            name: [
                {
                    attrs: {
                        label: "First name (optional)",
                        modelValue: this.firstName,
                    },
                    events: {
                        "update:modelValue": (e) => {
                            this.firstName = e;
                        },
                    },
                },
                {
                    attrs: {
                        label: `Last name${!this.lastName ? '*':''}`,
                        modelValue: this.lastName,
                    },
                    events: {
                        "update:modelValue": (e) => {
                            this.lastName = e;
                        },
                    },
                },
            ],
            contact:[
                {
                    attrs: {
                        label: `Email${!this.email ? '*':''}`,
                        type: 'email',
                        modelValue: this.email,
                    },
                    events: {
                        "update:modelValue": (e) => {
                            this.email = e;
                        },
                    },
                },
                {
                    attrs: {
                        label: `Phone (optional)`,
                        type: 'tel',
                        modelValue: this.phone,
                    },
                    events: {
                        "update:modelValue": (e) => {
                            this.phone = e;
                        },
                    },
                },
            ]
        },

        save: [
           {
            attrs: {
              label: `Address name${!this.save.name ? '*':''}`,
              modelValue: this.save.name,
              autofocus: true
            },
            events: {
              "update:modelValue": (e) => {
                this.save.name = e;
              },
            },
          }, 
        ]
      };
    },

    saveActions(){
        return [
            {
                title: 'Save',
                icon: 'save',
                class:'primary-text ring-[1px] focus:ring-[2px]'
            },
            {
                title: 'Cancel',
                events:{
                    click:()=>{
                        this.saveCollapsed = true
                    }
                }
            }
        ]
    }
  },

  methods:{
    submitForm(){
      this.$router.replace({
        query:{
          ...this.$route.query,
          step: 3
        }
      })
    }
  }
});
</script>
