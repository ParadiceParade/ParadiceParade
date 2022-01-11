<script>

    export default {
        name: 'RadioItem',

        model:{
            prop: 'modelValue',
            event: 'update:modelValue'
        },

        props:{
            modelValue: Boolean,
            readonly: Boolean,
            disabled: Boolean,
            id:{
                type: String,
                default: undefined
            },
            title:{
                type: String,
                default: 'Address name'
            },
            subtitle:{
                type: String,
                default: '16 Raji Apoyin, Lagos, Nigeria'
            },
            initialFocus: Boolean
        },

        data:()=>({
            manualChecked: false,
            dirtied:false,
        }),

        computed:{
            isChecked(){
                if(typeof this.modelValue == 'boolean'){
                    return this.modelValue 
                }
                return this.manualChecked
            }
        },
        
        methods:{
            updateModel(value){
                const inactive = this.readonly || this.disabled;

                if (inactive) {
                    return;
                }

                this.dirtied = true

                this.$emit("update:modelValue", value);

                this.manualChecked = value;
            }
        },

        render(h){
            const label = (d, c) => h('label', d, c);
            const div = (d, c) => h('div', d, c);
            const p = (d, c) => h('p', d, c);
            const input = (d) => h('input', d);

            const Icon = 
                h(`Mdi${this.isChecked ? 'RadioBoxMarked' : 'RadioBoxBlank'}`,{
                    key: `icon-${this.isChecked}`,
                    class: {
                        'opacity-60': !this.isChecked,
                        'opacity-90 text-primary-700 dark:text-primary-500':this.isChecked,
                        'fade-scale-appear': this.isChecked && this.dirtied
                    },
                    staticClass: "text-2xl"
                })

            const Content = [
                input({
                    attrs:{
                        ...this.$attrs,
                        type: "radio",
                        id: this.id,
                        tabindex: 
                            this.initialFocus && !this.dirtied ? 
                                true 
                            : (
                                !this.isChecked ? "-1" : undefined
                            ),
                        required: this.required,
                        disabled: this.disabled,
                        readonly: this.readonly
                    },
                    domProps:{
                        checked: this.isChecked ? "checked" : undefined,
                    },
                    class: ["sr-only"],

                    on:{
                        onInput: (e) => {
                            const value = e.currentTarget.checked;

                            this.toggle(value);
                        },
                    }
                }),
                div({
                    class: "text-left"
                },[
                    p({
                        class: "truncate font-medium text-gray-900 dark:text-gray-50"
                    },[
                        this.title
                    ]),

                    p({
                        class: "truncate text-sm opacity-80"
                    }, this.subtitle)
                ]),

                Icon
            ]

            return label({
                attrs:{
                    'data-radio-item': '',
                    'aria-checked': this.isChecked
                },
                domProps:{
                    for: this.id
                },
                staticClass: "root fill-before",
                class: {
                    "ring-primary-700 dark:ring-primary-500 ring-[3px] ring-offset-2 ring-offset-white dark:ring-offset-black": this.isChecked,
                    "focus-within:border-2": !this.isChecked
                },
                staticStyle: {
                    '--pseudo-bg': 'currentColor'
                },
                on:{
                    click:()=>{
                        this.updateModel(true)
                    }
                }
            },[
                Content
            ])
        }
    }

</script>

<style scoped>
    .root{
        @apply grid grid-flow-col grid-cols-[1fr,auto] gap-x-3 items-center px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-md relative before:opacity-0 before:transition-opacity hover:before:opacity-[0.05] active:before:opacity-10 outline-none cursor-pointer;
    }
</style>