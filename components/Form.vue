<script>
export default {
  name: 'Form',
  props: {
    showSubmit: {
      type: Boolean,
      default: true,
    },
    submitText: {
      type: String,
      default: '',
    },
    submitData: {
      type: Object,
      default: () => ({
        props: {
          background: 'info',
          flat: true,
        },
      }),
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selfName: 'UiForm',
    }
  },
  render(h) {
    const form = (d, c) => h('form', d, c)
    const submit = (d, c) => h('Button', d, c)

    const submitData = { ...this.submitData }

    return form(
      {
        attrs: { name: this.name, ...this.$attrs },
        staticClass: 'ui-form',
        class: [`${this.$theme.is}-theme`],
        on: {
          submit: (e) => {
            e.preventDefault()
          },
        },
      },
      [
        this.$slots.default,
        this.showSubmit && this.submitText
          ? submit(
              {
                ...submitData,
                props: {
                  primary:true,
                  block:true,
                  ...(submitData?.props || {}),
                },
                attrs: {
                  type: 'submit',
                  title: this.submitText.toLowerCase(),
                  ...(submitData?.attrs || {}),
                },
                staticClass: 'submit-form',
                on: {
                  ...(submitData?.on || {}),

                  click: async (e) => {
                    this.$emit('submit-clicked')

                    e.preventDefault()

                    const inputs = [...this.$children].filter((x) =>
                      /input/i.test(x.$vnode.tag)
                    )
                    const validForm = {
                      componentInvalid: [],
                      checkValidity: undefined,
                      reportValidity: undefined,
                    }

                    const vmodel = {}

                    inputs.forEach((x) => {
                      vmodel[(x.autocomplete || x.label).toLowerCase()] =
                        x.output
                      x?.validate?.()
                      this.$nextTick(() => {
                        if (x?.validation?.valid === false) {
                          validForm.componentInvalid.push(x)

                          x.keys['v-msg'] += 1
                        }
                      })
                    })

                    delete vmodel['information is correct']

                    await this.$sleep(16)

                    if (typeof this.$el.reportValidity == 'function') {
                      validForm.reportValidity = this.$el.reportValidity?.()
                    }

                    validForm.checkValidity = this.$el?.checkValidity?.()

                    const htmlValid = /true|undefined/i

                    const isValid =
                      !validForm.componentInvalid.length &&
                      htmlValid.test(validForm.checkValidity) &&
                      htmlValid.test(validForm.reportValidity)

                    if (isValid) {
                      this.$nextTick(() => {
                        this.$emit('submit-form', vmodel)
                      })
                    }
                  },
                },
              },
              [this.$slots.submitText || this.submitText]
            )
          : null,
        this.$slots.append,
      ]
    )
  },
}
</script>

<style>
.ui-form{
  max-width: 550px;
}
</style>
