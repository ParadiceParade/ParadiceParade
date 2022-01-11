<script>
    import { mapState } from 'vuex';

    import {isTop} from './utils';

    import {eventKey, nextAnimFrame} from '~/utils/main';

    export default {
        name: 'Select',

        model:{
            prop: 'modelValue',
            event: 'update:modelValue',
        },

        props:{
            searchable: Boolean,
            modelValue: {
                type: [String, Number],
                default: undefined
            },
            label:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            placeholder:{
                type: String,
                required: true
            },
            options:{
                type: Array,
                default: undefined
            },
            listClass:{
                type: Array,
                required: true
            },
        },

        data:()=>({
            searchField: '',
            activatorFocused: false,
            isTop: false
        }),

        computed:{
            ...mapState(['breakpoints']),
            transitionConfig(){
                return this.isTop ? '1rem' : '-1rem'
            }
        },

        created(){
            this.searchField = `${this.modelValue}`;
        },

        methods:{
            async openListBox(e){
                this.searchField = `${this.modelValue}`;

                this.isTop = isTop(e);

                await nextAnimFrame();

                this.activatorFocused = true
            }
        },

        render(h){
            if(!this.options?.length){
                return null
            }

            // const isMobile = /xxs|xs|sm/.test(this.breakpoints.is);

            const Root = (d, c) => h('div', d, c);

            const div = (d, c) => h('div', d, c);

            const Transition = (d, c) => h('Transition', d, c);

            const ul = (d, c) => h('ul', d, c);

            const Icon = h('MdiSelectChevron')

            const Input = (d, c) => h('Input', d, c);

            const Listbox = [
                Transition({
                    props:{
                        name: 'slide-y',
                        mode: 'out-in'
                    }
                },[
                    this.activatorFocused ?
                        ul({
                            staticClass: 
                                'h-[200px] w-full absolute z-10 rounded-md border border-gray-200 dark:border-gray-800',
                            class:[
                                this.listClass || 'bg-white dark:bg-gray-900',
                                {
                                    'top-[100%] mt-2 shadow-2xl': !this.isTop,
                                    'bottom-[100%] mb-2 top-shadow': this.isTop
                                }
                            ],
                            style:{
                                '--slide-y': this.transitionConfig
                            }
                        },[])
                    :   null
                ])
            ]


            return Root({
                staticClass: 'root relative',
            },[
                Input({
                    props:{
                        label: this.label,
                        placeholder: this.placeholder,
                        modelValue: this.activatorFocused ?
                            this.searchField 
                            : `${this.modelValue}`,
                        type: 'search',
                        inputClass: [
                            'pr-[36px]'
                        ],
                        autocomplete: 'noautocomplete',
                        hideCaret: !this.activatorFocused
                    },
                    on:{
                        'update:modelValue': e =>{
                            this.searchField = e;
                        },
                        input: async e => {
                            if(e.data && !this.activatorFocused){
                                await this.openListBox(e)
                            }
                        },
                        click: async (e)=>{
                            await this.openListBox(e)
                        },
                        blur: ()=>{
                            this.activatorFocused = false
                        },
                        keydown: e=>{
                            const key = eventKey(e);

                            if(key == 'esc'){
                                this.activatorFocused = false
                            }
                        }
                    }
                },[
                    div({
                        slot: 'append',
                        staticClass: 'absolute right-2 top-[50%] translate-y-[-50%] text-xl opacity-70 px-2 h-full flex items-center justify-center w-[36px] pointer-events-none z-100'
                    },[
                        Icon
                    ])
                ]),
                Listbox
            ])
        }
    }
</script>

<style >
    .top-shadow{
        box-shadow: 0 -25px 50px -12px rgb(0 0 0 / 0.25);
    }
</style>
