<script>
    import { mapState } from 'vuex';

    import {isTop} from './utils';

    import props from './props';

    import {eventKey, nextAnimFrame} from '~/utils/main';

    let activeListBox = []

    export default {
        name: 'Select',

        model:{
            prop: 'modelValue',
            event: 'update:modelValue',
        },

        props,

        data:()=>({
            searchField: '',
            activatorFocused: false,
            optionTransitioning: false,
            // null, 1, -1
            arrowStep: null,
            listBoxState: ''
        }),

        computed:{
            ...mapState(['breakpoints']),
        },

        watch:{
            activatorFocused(n){
                this.arrowStep = null;
                if(n){
                    this.register();
                    this.addClickAway()
                }else {
                    this.removeClickAway()
                    // this.focusInput()
                }
            }
        },

        beforeDestroy() {
            this.removeClickAway()
            this.unregister()
        },

        methods:{
            unregister(){
                activeListBox = activeListBox.filter(x=>x!=this._uid)
            },
            register(){
                activeListBox = 
                    [...new Set([...activeListBox, this._uid])]
            },
            focusInput(){
                this.$refs.input.$refs.input.focus()
            },
            async openListBox(e){
                if(this.optionTransitioning || this.activatorFocused) return ;

                this.searchField = `${this.modelValue}`;

                this.isTop = isTop(e);

                await nextAnimFrame();

                this.activatorFocused = true
            },
            closeListBox(){
                this.activatorFocused = false;
            },
            toggleClickAway(action){
                document.documentElement[`${action}EventListener`](
                    'click',
                    this.closeListBox,
                    { once: true }
                )
            },
            addClickAway(){
                // clear any possible active event;
                this.removeClickAway();

                this.toggleClickAway('add')
            },
            removeClickAway(){
                this.toggleClickAway('remove')
            },
            matchSearchField(){
                this.$nextTick(()=>{
                    this.searchField = `${this.modelValue}`
                });
            }
        },

        render(h){
            if(!this.options?.length){
                return null
            }

            // const isMobile = /xxs|xs|sm/.test(this.breakpoints.is);

            const Root = (d, c) => h('div', d, c);

            const div = (d, c) => h('div', d, c);

            const Icon = h('MdiSelectChevron')

            const Input = (d, c) => h('Input', d, c);

            const Option = (d, c) => h('SelectOption', d, c);

            const sharedID = `select-${this._uid}`

            const inputID = `select-input-${this._uid}`

            return Root({
                attrs:{
                    'data-value': this.modelValue
                },
                staticClass: 'root relative',
            },[
                Input({
                    ref: 'input',
                    attrs:{
                        autocorrect: 'off',
                        autocapitalize: 'off',
                        spellcheck: 'false',
                        role: 'combobox',
                        'aria-autocomplete': 'list',
                        'aria-expanded': this.activatorFocused ? 'true' : undefined,
                        'aria-haspopup': 'true',
                        'aria-owns': sharedID
                    },
                    props:{
                        id: this.inputID,
                        label: this.label,
                        placeholder: this.placeholder,
                        modelValue: `${this.modelValue}`,
                        type: 'search',
                        inputClass: [
                            'pr-[36px]'
                        ],
                        autocomplete: 'noautocomplete',
                        hideCaret: !this.activatorFocused
                    },
                    on:{
                        // 'update:modelValue': e =>{
                        //     this.searchField = e;
                        // },
                        input: async e => {
                            const canOpenList = e.data && !this.activatorFocused && !this.optionTransitioning

                            if(canOpenList){
                                await this.openListBox(e)
                            }
                        },
                        click: async (e)=>{
                            if(this.activatorFocused && !this.optionTransitioning){
                                e.stopPropagation();
                            }
                            
                            await this.openListBox(e)
                        },
                        keydown: e=>{
                            const key = eventKey(e);

                            if(key == 'esc'){
                                this.closeListBox()
                            }
                        },
                        focus:(e)=>{
                            if(this.listBoxState != 'afterenter'){
                                e.currentTarget.blur()
                            }
                        }
                    }
                },[
                    div({
                        slot: 'append',
                        staticClass: 'absolute right-0 top-[50%] translate-y-[-50%] text-xl opacity-70 px-2 h-full flex items-center justify-center w-[36px] pointer-events-none z-100'
                    },[
                        Icon
                    ])
                ]),
                Option({
                    attrs:{
                        'aria-labelledby': inputID
                    },
                    domProps:{
                        id: sharedID,
                    },
                    props:{
                        isTop: this.isTop,
                        show: this.activatorFocused,
                        rootClass: this.listClass,
                        options: this.options,
                        selected: this.modelValue,
                    },
                    on:{
                        'update:modelValue': e=>{
                            // this.searchField = e;
                            this.$emit('update:modelValue', e)
                        },
                        // 'update:searchField': e=>{
                        //     this.searchField = e;
                        // },
                        'update:closeOption': this.closeListBox,
                        'update:transitioning': (e)=>{
                            this.optionTransitioning = e
                        },
                        'update:transitionState':e=>{
                            this.listBoxState = e
                        },
                        // 'update:input': e=>{
                        //     this.searchField = e
                        // }
                    },
                    scopedSlots:{
                        default: (options) =>{
                            return [this.$slots.options?.()]
                        }
                    }
                })
            ])
        }
    }
</script>
