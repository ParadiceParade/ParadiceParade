<script>
export default {
  name: 'Button',

  props: {
    autofocus: Boolean,
    link: Boolean,
    overlay: Boolean,
    icon: Boolean,
    primary: Boolean,
    block: Boolean,
    disabled: Boolean,
    hidePlainFocus:Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      default: undefined
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    size: {
      type: String,
      default: 'md'
    }
  },

  computed: {
    getTag() {
      if (this.to) {
        return 'nuxt-link'
      }
      return this.tag
    }
  },

  mounted(){
    if(this.autofocus){
      this.$el.focus()
    }
  },

  render(h) {
    return h(
      this.getTag,
      {
        props: {
          to: this.to
        },
        attrs: {
          'data-btn': '',
          tabindex: 
            this.disabled ? '-1' :
            this.getTag !='button' ? '0' : undefined,
          disabled: this.disabled,
          ...(this.$attrs || {}),
        },
        staticClass: 'root',
        class: [
          {
            'link-btn underline-effect': this.link,
            'ui-btn': !this.link,
            'grid w-full': this.block
          },
          !this.link
            ? {
                sm: this.size == 'sm',
                md: this.size == 'md',
                lg: this.size == 'lg',
                icon: this.icon,

                primary: this.primary,
                'no-bg': !this.primary,
                'hide-plain-focus':  this.hidePlainFocus,

                'border-[0.75px] border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-20':
                  this.overlay
              }
            : {
              'primary-text': this.primary
            }
        ],
        on: this.$listeners
      },
      [
        this.text || this.$slots.default
        // h(
        //   'div',
        //   {
        //     class:
        //       'absolute flex items-center justify-center w-full h-full rounded-[inherit]'
        //   },
        //   [h('Loader')]
        // )
      ]
    )
  }
}
</script>

<style>
.underline-effect[data-btn] {
  @apply after:w-full after:absolute after:h-[1px] after:bg-primary-700 dark:after:bg-primary-500 after:opacity-0 after:bottom-0 after:translate-x-[-100%] hover:after:translate-x-0 hover:after:opacity-70 after:transform-gpu after:transition-all;
}
.root[data-btn] {
  @apply inline-grid grid-flow-col gap-x-2 relative overflow-hidden isolate items-center justify-center cursor-pointer transform-gpu active:opacity-90 active:scale-[0.975] sm:active:scale-[0.9925];
  transition: 0.35s ease;
  transition-property: opacity, transform;
}

.root[data-btn]:hover{
  will-change: opacity, transform;
}

.link-btn[data-btn] {
  @apply opacity-90 hover:opacity-80 focus:opacity-[.85] active:opacity-70
  text-[0.85em] lg:text-[0.9em] mx-2;
  min-width: fit-content;
}

.ui-btn[data-btn] {
@apply outline-none ring-offset-white dark:ring-offset-black
ring-offset-1 ring-primary-900 dark:ring-primary-700 font-semibold;
  width: fit-content;
}

.ui-btn[data-btn]:not(.no-bg){
  @apply focus-visible:ring-[2px];
}

.ui-btn[data-btn].no-bg:not(.hide-plain-focus){
  @apply focus:ring-[2px];
}

.sm[data-btn] {
  @apply px-3 h-[34px] text-[0.825rem] rounded-sm;
}

.md[data-btn] {
  @apply px-6 h-[44px] text-base rounded-md;
}

.lg[data-btn] {
  @apply px-9 h-[56px] text-lg rounded-lg;
}

.icon[data-btn] {
  @apply px-0 h-[38px] w-[38px] text-base rounded-full;
}

.primary[data-btn] {
  @apply bg-primary-600 text-white dark:bg-primary-500 dark:text-black 
  hover:bg-primary-700 active:bg-primary-800 dark:hover:bg-primary-600 dark:active:bg-primary-700;
}

.primary-text[data-btn]{
  @apply text-primary-700 dark:text-primary-400;
}
</style>
