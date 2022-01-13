<script>
    import {debounce} from 'lodash';

    import {transitionEvents} from './utils';
    import {eventKey} from '~/utils/main';
    import {ControlledFocus} from '~/utils/controlledFocus';

   export default {
       name: 'SelectOption',

       props:{
            isTop:Boolean,
            show:Boolean,
            rootClass: {
               type: Array,
               default: undefined
            },
            options:{
                type:Array,
                default: undefined
            },
            selected: {
                type: [String, Number],
                default: undefined,
            },
            arrowStep:{
                type: Number,
                default:undefined
            }
       },

       data:()=>({
            transitioning: false,
            // active focus key
            pseudoFocus:null,
            searchField: ''
       }),

       computed:{
            transitionConfig(){
                return this.isTop ? '1rem' : '-1rem'
            }
       },

       watch:{
            transitioning(n){
                this.$emit(
                   'update:transitioning',
                   n
                )
            },
            arrowStep(n){
                if(n && this.show && !this.transitioning){
                    const nextStep = Math.min(this.options.length - 1, 
                        Math.max(this.pseudoFocus + n, 0)
                    );

                    this.pseudoFocus = nextStep;

                    this.$emit('update:arrowStep')
                }
            }
       },

       methods:{
           closeListBox(){
               this.$emit('update:closeOption')
           },
           debounceCallback(){
                if(this.debounceCallback.search == this.searchField){
                    this.searchField = '';
                }
           },
           resetSearchFieldDebounce(){                
                return debounce(()=>{
                    if(
                        this.resetSearchFieldDebounce.currentSearch 
                            == this.searchField
                    ) {
                        this.searchField = ''
                        this.resetSearchFieldDebounce.currentSearch = this.searchField;
                    }
                }, 2000)
           }
       },

       render(h){

           if(!this.$scopedSlots.default) return null;

            const Transition = (d, c) => h('Transition', d, c);

            const ul = (d, c) => h('ul', d, c);

            const li = (d, c) => h('li', d, c);

            const div = (d, c) => h('div', d, c);

            const OptionsVNode = this.$scopedSlots.default?.();

            return Transition({
                    props:{
                        name: 'slide-y',
                        mode: 'out-in'
                    },
                    on: transitionEvents.call(this)
                },[
                    this.show ?
                        ul({
                            attrs:{
                                role: 'listbox'
                            },
                            staticClass: 
                                'h-[200px] w-full absolute z-10 rounded-md border border-gray-300 dark:border-gray-800 overflow-y-auto',
                            class:[
                                this.rootClass || 'bg-white dark:bg-gray-900',
                                {
                                    'top-[100%] mt-2 shadow-2xl': !this.isTop,
                                    'bottom-[100%] mb-2 top-shadow': this.isTop
                                }
                            ],
                            style:{
                                '--slide-y': this.transitionConfig
                            },
                            on:{
                                click:()=>{
                                },
                                mousemove: ()=> {

                                },
                                keydown: e => {
                                    const key = eventKey(e);

                                    if(/arrow_down|arrow_up/.test(key)){
                                        e.preventDefault();
                                        
                                        const controlledFocus = new ControlledFocus({
                                            root: e.currentTarget,
                                            children: 'li',
                                            uid: this._uid
                                        })

                                        if(/down/.test(key)){
                                            controlledFocus.forward();
                                        } 
                                        else controlledFocus.backward();
                                    }else if(key == 'esc'){
                                        this.closeListBox()
                                    } else if(/^.$/.test(e.key) && !e.ctrlKey){
                                        this.searchField += e.key;

                                        this.$emit(
                                            'update:input', this.searchField
                                        )

                                        this.resetSearchFieldDebounce()()
                                    }
                                }
                            }
                        },[
                            (OptionsVNode || this.options).map((option, key)=>{
                                return li({
                                    ref: key == this.pseudoFocus ? 'selected' : undefined,
                                    key: `li-${key}`,
                                    attrs:{
                                        tabindex: '0',
                                        role: 'option'
                                    },
                                    staticClass: 
                                        'h-[32px] w-full cursor-pointer relative fill-before outline-none focus:before:opacity-10 before:opacity-0',
                                    class:[{
                                        'rounded-t-md': key == 0,
                                        'rounded-b-md': key == this.options.length,
                                    }],
                                    style:{
                                        '--pseudo-bg': 'currentColor'
                                    },
                                    on: {
                                        '!click':()=>{
                                                this.$emit(
                                                    'update:modelValue',
                                                    `${key}`
                                                )
                                                this.pseudoFocus = key
                                            
                                        },
                                        '!mousemove': (e)=>{
                                            if(key != this.pseudoFocus){
                                                // this.$emit('update:modelValue', 
                                                //     `${key}`
                                                // );
                                                e.currentTarget.focus();
                                                // this.pseudoFocus = key
                                            }
                                        }
                                    } 
                                },[ 
                                    OptionsVNode || [
                                        div({
                                            staticClass: 'grid grid-flow-col grid-cols-1 items-center px-4 h-full',
                                            class:{
                                                'font-semibold': key == this.pseudoFocus,
                                                'opacity-70': key != this.pseudoFocus
                                            }
                                        },[
                                            option
                                        ])
                                    ]
                                ])
                            })
                        ])
                    :   null
            ])
       }
   }
</script>

<style>
    .top-shadow{
        box-shadow: 0 -25px 50px -12px rgb(0 0 0 / 0.25);
    }
</style>
