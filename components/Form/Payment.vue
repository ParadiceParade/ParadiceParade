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

      <div class="mt-16 border-b-[0.75px] border-t-[0.75px]" :class="borderDashedClass">
          <Button
            tag="div"
            class="rounded-none justify-between w-full my-2 primary-text"
            @click="saveCollapsed = !saveCollapsed"
          >
            Save payment

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
                Pay now
            </Button>
        </div>

    </Form>
  </section>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "FormPayment",
  props: {
    title: {
      type: String,
      default: "Create your account",
    },
  },

  data: () => ({
    saveCollapsed: true,
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    save:{
        name: ''
    },
    borderDashedClass: 'border-dashed border-gray-200 dark:border-gray-600',
    error: false
  }),

  computed: {
    inputs() {
      return {
        basic: [
          {
            attrs: {
              label: `Card number${!this.cardNumber ? "*" : ""}`,
              modelValue: this.cardNumber,
              placeholder: 'xxxx '.repeat(4).trim()
            },
            events: {
              "update:modelValue": (e) => {
                this.cardNumber = e;
              },
            },
          },

          {
            attrs: {
              label: `Name on card${!this.cardName ? "*" : ""}`,
              modelValue: this.cardName,
            },
            events: {
              "update:modelValue": (e) => {
                this.cardName = e;
              },
            },
          },

          {
            attrs: {
              label: `Month${!this.expiryMonth ? "*" : ""}`,
              modelValue: this.expiryMonth,
            },
            events: {
              "update:modelValue": (e) => {
                this.expiryMonth = e;
              },
            },
          },

          {
            attrs: {
              label: `Year${!this.expiryYear ? "*" : ""}`,
              modelValue: this.expiryYear,
            },
            events: {
              "update:modelValue": (e) => {
                this.expiryYear = e;
              },
            },
          },
          {
            attrs: {
              label: `CVV${!this.cvv ? "*" : ""}`,
              modelValue: this.cvv,
              type: 'number',
              maxLength: '3'
            },
            events: {
              "update:modelValue": (e) => {
                this.cvv = e;
              },
            },
          },
        ],

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
