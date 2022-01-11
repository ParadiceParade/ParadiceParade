<script>
const scoping = { 'data-input': '' }

export default {
  name: 'Input',

  inheritAttrs: false,

  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },

  props: {
    mainClass: {
      type: Array,
      default: undefined
    },
    inputClass:{
      type:Array,
      default: undefined
    },
    required: Boolean,
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    pattern: {
      type: String,
      default: undefined
    },
    background: {
      type: String,
      default: undefined
    },
    validate: {
      type: Function,
      default: undefined
    },
    autocomplete: {
      type: String,
      default: undefined
    },
    modelValue: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    disabled: Boolean,
    hideCaret: Boolean
  },

  emits: ['update:modelValue'],

  data: () => ({
    focused: false,
    inputDirtied: false,
    vMsgKey: 1,
    manualValue: undefined,
    showPassword: false
  }),

  created() {
    this.manualActive = this.modelValue
  },

  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.input

      const getValidation = this.getValidation()

      const message = getValidation.message

      input._reportValidity = () => {
        this.inputDirtied = true

        this.vMsgKey += 1

        return getValidation.valid
      }

      input?.setCustomValidity?.(message)
    })
  },

  methods: {
    getValidation() {
      const getValidate = this.validate || (() => true)

      const validationValue = () => {
        const validator = getValidate(this.modelValue)

        if (typeof validator == 'undefined') {
          return {
            valid: undefined,
            message: ''
          }
        }
        if (typeof validator == 'string') {
          return {
            valid: false,
            message: validator
          }
        }

        if (validator === true) {
          return {
            valid: true,
            message: ''
          }
        }
        return {
          valid: undefined,
          message: ''
        }
      }

      const getValidation = validationValue()

      this.$nextTick(() => {
        const input = this.$refs.input
        const message = getValidation.message

        this.$emit('input-validity', getValidation.valid)

        input?.setCustomValidity?.(message)
      })

      return getValidation
    }
  },

  render(h) {
    const div = (d, c) => h('div', d, c)
    const label = (d, c) => h('label', d, c)
    const btn = (d, c) => h('Button', d, c)

    const id = `uit-${this._uid}`

    const getValidation = this.getValidation()

    const invalid = getValidation.valid === false && this.inputDirtied

    const textarea = this.type == 'textarea'

    const vmodel = this.modelValue || this.manualValue

    const isPassword = this.type == 'password'

    return div(
      {
        attrs: {
          ...scoping,
          'data-value': this.modelValue
        },
        class: [
          'root',
          {
            invalid,
            textarea,
            sm: /^sm$|^small$/i.test(this.size),
            lg: /^lg$|^large$/i.test(this.size),
            'opacity-50': this.disabled
          }
        ]
      },
      [
        div(
          {
            attrs: {
              ...scoping
            },
            class: [
              'main fill-before-after ring-1 ring-black ring-opacity-10 dark:ring-white dark:ring-opacity-10',

              {
                'before:border-dotted before:border-[1.5px]': this.disabled,
                'before:border-2': !this.disabled,
                'before:border-amber-500 dark:before:border-amber-300': invalid && !this.focused,
                'focused before:border-blue-700 dark:before:border-blue-400': this.focused,
                'has-value': vmodel,
                invalid,
                textarea
              },
              this.mainClass || []
            ]
          },
          [
            div({
              staticClass: 'container',
              attrs:{
                ...scoping
              }
            },[
              label(
                {
                  attrs: {
                    ...scoping,
                    for: id
                  },
                  staticClass: 'label text-gray-700 dark:text-gray-300 text-[0.925rem]',
                  class: [
                    {
                      'opacity-60': this.focused || vmodel
                    }
                  ]
                },
                this.label
              ),

              h(textarea ? 'textarea' : 'input', {
                ref: 'input',
                staticClass:'input',
                class: [
                  this.inputClass,
                  {
                    textarea,
                    'has-value': vmodel,
                    'pr-[calc(32px+0.75rem)]': this.type == 'password',
                    'hide-caret': this.hideCaret
                  }
                ],
                attrs: {
                  ...scoping,

                  ...this.$attrs,

                  value: vmodel,
                  pattern: this.pattern,
                  required: this.required,
                  placeholder: this.placeholder,
                  type: isPassword
                    ? this.showPassword
                      ? 'text'
                      : 'password'
                    : this.type,
                  disabled: this.disabled
                },
                domProps: {
                  id,
                  autocomplete: this.autocomplete,
                  value: vmodel
                },
                on: {
                  ...this.$listeners,
                  focus: (e) => {
                    this.$emit('focus', e)
                    this.focused = true

                    if (this.isPassword) {
                      this.$emit('modelValue', '')
                    }
                  },
                  blur: (e) => {
                    this.$emit('blur', e)

                    this.focused = false

                    this.inputDirtied = true

                    this.getValidation()
                  },
                  input: (e) => {
                    this.$emit('input', e)
                    const value = e.currentTarget.value

                    if (textarea) {
                      let scrollHeight = this.$refs.input.scrollHeight

                      scrollHeight != 96 &&
                        this.$nextTick(() => {
                          this.$refs.input.style.height = ''
                          scrollHeight = this.$refs.input.scrollHeight
                          requestAnimationFrame(() => {
                            this.$refs.input.style.height = `${scrollHeight}px`
                          })
                        })
                    }

                    this.$emit('update:modelValue', value)

                    this.manualValue = value

                    e.currentTarget.setCustomValidity(getValidation.message)
                  }
                }
              }),
            ]),

            this.$slots.append,

            isPassword && !this.disabled
              ? btn(
                  {
                    props: { tag: 'div' },
                    attrs: { ...scoping },
                    staticClass:
                      'absolute right-2 min-w-[32px] p-0 w-[32px] h-[32px] min-h-[32px] rounded-full top-[50%] translate-y-[-50%]',
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                        
                        this.showPassword = !this.showPassword
                        this.$emit('append-icon-click')
                      }
                    }
                  },
                  [
                    this.$slots.appendIcon ||
                      h(`Mdi${this.showPassword ? 'EyeOff' : 'Eye'}`, {
                        key: `p-${this.showPassword}`,
                        class: 'opacity-70'
                      })
                  ]
                )
              : null
          ]
        ),

        invalid
          ? div(
              {
                key: this.vMsgKey,
                attrs: {
                  ...scoping
                },
                class: ['v-msg vibrate text-red-600']
              },
              [getValidation.message]
            )
          : undefined
      ]
    )
  }
}
</script>

<style>
.root[data-input] {
  --ui-rounded: 8px;
  --ui-height: 56px;
  --ui-lable-font-size: 1.05rem;
  --ui-min-height: initial;
  --ui-background: initial;
  --ui-active-scale: translate3d(12px, 6px, 0) scale3d(0.8, 0.8, 1);
}

.root[data-input].sm {
  --ui-height: 40px;
  --ui-lable-font-size: 0.85rem;
  --ui-active-scale: translate3d(12px, 4px, 0) scale3d(0.775, 0.775, 1);
}

.root[data-input].lg {
  --ui-height: 64px;
  --ui-lable-font-size: 1.25rem;
  --ui-active-scale: translate3d(12px, 8px, 0) scale3d(0.95, 0.85, 1);
}

.main.focused[data-input]::before {
  opacity: 0.75;
  transform: scale3d(1, 1, 1);
}

.main[data-input] {
  min-height: var(--ui-min-height);
  position: relative;
  border-radius: var(--ui-rounded);
}

.main[data-input].textarea {
  --ui-min-height: 96px;
}

.main[data-input]::before {
  transition: 0.1s opacity linear, 0.15s transform linear;
  opacity: 0;
  transform: scale3d(1.005, 1.005, 1);
}

.main[data-input]::after {
  background-color: currentColor;
  transition: 0.2s opacity linear;
  opacity: 0;
}

.can-hover .main[data-input]:hover::after {
  opacity: 0.05;
}

.main[data-input]:active::after {
  opacity: 0.075;
}

.main[data-input].invalid:not(:focus-within)::before {
  border: 2px solid var(--text-red-600);
  opacity: 0.25;
}

.main.focused[data-input]::before {
  opacity: 0.5;
}

.main[data-input].has-value:not(:focus-within):before {
  opacity: 0.35;
}

.label[data-input] {
  position: absolute;
  color: currentColor;
  font-weight: 400;
  font-size: var(--ui-lable-font-size);
  line-height: 1.4;
  letter-spacing: 0.4px;
  padding: 0px;
  display: block;
  transform-origin: left top;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  left: 0px;
  top: 0px;
  transform: translate3d(12px, 14px, 0) scale3d(1, 1, 1);
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    opacity 0.15s linear;
  z-index: 1;
  pointer-events: none;
}

.container[data-input]:focus-within > .label[data-input],
.main[data-input].has-value .label[data-input] {
  transform: var(--ui-active-scale);
}

.input[data-input] {
  appearance: none;
  border: none;
  outline: none;
  background-color: transparent;
  height: 100%;
  width: 100%;
  --height: calc(var(--ui-height) - calc(var(--ui-height) * 0.4285));
  padding: calc(0.75 * var(--height)) 12px calc(0.25 * var(--height));
  color: var(--body-c);
  letter-spacing: 0.4px;
  font-family: var(--default-font-family);
  opacity: 0;
}

.input[data-input].has-value,
.input[data-input]:focus {
  opacity: 1;
}

.input[data-input]::placeholder {
  font-size: 0.875em;
}

.input[data-input].textarea {
  resize: vertical;
  min-height: 96px;
}

.input[data-input]:-webkit-autofill,
.input[data-input]:-webkit-autofill:hover,
.input[data-input]:-webkit-autofill:focus {
  box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-text-fill-color: var(--body-c) !important;
  border-radius: var(--ui-rounded);
}

.input[data-input]:autofill {
  box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-box-shadow: 0 0 0 1000px var(--theme-banner) inset !important;
  -webkit-text-fill-color: var(--body-c) !important;
  border-radius: var(--ui-rounded);
}

.v-msg[data-input] {
  font-size: 0.9rem;
  text-align: right;
  padding: 0 var(--qtr-x-gutter);
  animation-delay: 0.15s;
  font-weight: 500;
  letter-spacing: 0.4px;
}

.input[data-input][type='search']::-webkit-search-cancel-button,
.input[data-input][type='search']::-webkit-search-decoration,
.input[data-input][type='search']::-webkit-search-results-button,
.input[data-input][type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.input::-ms-clear,
.input::-ms-reveal {
  display: none;
}
</style>
