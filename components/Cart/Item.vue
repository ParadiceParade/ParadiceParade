
<script>
import { ControlledFocus } from '~/utils/controlledFocus'
import { eventKey, hackTabKey } from '~/utils/main'

    export default {
        name: 'CartItem',
        props:{
            tag: {
                type:String,
                default : 'li'
            },
            img: {
                type:Object,
                default: () => ({
                    alt: 'no description',
                })
            },
            product: {
                type: Object,
                default: undefined
            }
        },

        data: () => ({
            confirmRemove: false,
            removeToggled: false
        }),

        render(h){
            if(!this.product) return null;

            const root = (d,c)=> h(this.tag, d, c);
            const div = (d,c) => h('div', d, c)
            const h3 = (d,c) => h('h3', d, c)
            const p = (d,c) => h('p', d, c)


            const Button = (d,c) => h('Button', d, c)
            const Img = (d,c) => h('Img', d, c)
            const DeleteIcon = h('MdiDelete')
            const NuxtLink = (d,c) => h('NuxtLink', d, c)
            const Transition = (d,c) => h('Transition', d, c)

            const ids = {
                root: `cart-item-${this._uid}`
            }

            const Image = [
                div({
                    staticClass: "flex-shrink-0 w-24 h-24 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
                },[
                    Img({
                        attrs: {
                            ...this.img
                        },
                        staticClass: "w-full h-full object-center object-cover",
                    })
                ])
            ]

            const details = [
                div({}, [
                    div({
                        staticClass: 'flex justify-between text-base font-medium text-gray-900 dark:text-gray-100'
                    },[
                        h3({}, [
                            NuxtLink({
                                props: {
                                    to: '#'
                                }
                            },[
                                this.product.name
                            ])
                        ]),

                        p({
                            staticClass: 'ml-4'
                        }, [
                            this.product.price
                        ])
                    ]),

                    p({
                        staticClass: "mt-1 text-sm text-gray-500 dark:text-gray-200"
                    },[
                        `${this.product.color} | Qty 1` 
                    ]),
                ]),

                div({
                    staticClass: "flex-1 flex items-end justify-between text-sm"
                },[
                    Button({
                        class: "font-medium mx-0",
                        props:{
                            link: true,
                            primary: true
                        },
                        on:{
                            click:()=>{
                                this.$emit('edit-item')
                            }
                        }
                    },[
                        'Edit'
                    ]),

                    Button({
                        staticClass:"text-base h-[fit-content] w-[28px] opacity-60 hover:opacity-100 active:opacity-80",
                        class:[{
                            'invisible': this.confirmRemove
                        }],
                        attrs:{
                            title: `remove product from cart`
                        },
                        props:{
                            link: true,
                            autofocus: this.removeToggled && !this.confirmRemove
                        },
                        on:{
                            click: ()=>{
                                this.confirmRemove = true;
                            }
                        }
                    },[
                        DeleteIcon
                    ])
                ])
            ]

            const confirmRemove = [
                div({
                    staticClass: 'text-center z-10 relative'
                },[
                    h3({
                        staticClass: 'font-medium'
                    }, [
                        'Remove item?'
                    ]),

                    p({
                        staticClass: 'text-[0.8rem] opacity-80 hidden xs:block'
                    },[
                        'This action cannot be undone'
                    ])
                ]),

                div({
                    staticClass: "grid grid-flow-col items-end justify-center text-sm xs:px-2 xs:gap-x-4 gap-x-2 pb-1 z-1",
                    tabindex: '0',
                    on:{
                        keydown: e =>{
                            if (!this.confirmRemove) {
                                return
                            }

                            const key = eventKey(e)

                            if (key == 'esc') {
                                e.stopPropagation();
                                
                                return (this.confirmRemove = false)
                            }

                            hackTabKey(
                                e,
                                () => {
                                    e.stopPropagation();

                                    const controlledFocus = new ControlledFocus({
                                        root: e.currentTarget,
                                        children: '.ui-btn',
                                        loop: true,
                                        uid: this._uid
                                    })

                                    if (e.shiftKey) {
                                        controlledFocus.backward()
                                    } else controlledFocus.forward()
                                },
                                key
                            )
                        }
                    }
                },[
                    [
                        {
                            title: 'Cancel',
                            props:{
                                autofocus: true
                            },
                            on:{
                                click:()=> (this.confirmRemove = false),
                            }
                        },
                        {
                            title: 'Remove',
                            props:{
                                primary: true
                            }
                        }
                    ].map((item, key) => {
                        return Button({
                            key,
                            ref: `confirm-${key}`,
                            class: "font-medium",
                            props: {
                                ...item.props,
                                size: 'sm'
                            },
                            on: {
                                ...item.on,
                                blur: e=> {
                                    if(e.relatedTarget){
                                        if(!e.relatedTarget
                                            .closest(
                                                `#${ids.root}`
                                            )
                                        ){
                                            this.confirmRemove = false
                                        }
                                    }else this.confirmRemove = false
                                }
                            }
                        },[
                            item.title
                        ])
                    })                    
                ])
            ]

            const rootFocus = this.confirmRemove ? 
                {
                    focus: e=> {
                        this.$emit('focus', e)

                        this.$refs['confirm-0']
                            .$el.focus()
                    }
                }
            :   {
                    keydown: e=>{
                        const key = eventKey(e);

                        if(key == 'delete'){
                            this.confirmRemove = true
                        }
                    }
                }

            return root({                
                domProps:{
                    id: ids.root
                },
                staticClass: 'py-6 flex outline-none focus-visible:ring ring-offset-1 ring-offset-white dark:ring-offset-black relative fill-before before:bg-white before:bg-opacity-50 dark:before:bg-black dark:before:bg-opacity-50 before:transition-opacity before:z-1',
                class:[{
                    'before:opacity-1': this.confirmRemove,
                    'before:opacity-0': !this.confirmRemove
                }],
                attrs: {
                    tabindex: '0',
                    ...this.$attrs
                },
                on:{
                    ...rootFocus,
                    ...this.$listeners
                }
            },[
                Image,

                div({
                    class: 'overflow-x-hidden ml-3 pl-1 flex-1'
                },[
                    Transition({
                        props:{
                            name: 'slide-x',
                            mode: 'out-in'
                        },
                        on:{
                            beforeLeave: ()=>{
                                this.removeToggled = true;
                            }
                        }
                    },[
                        div({
                            key: `b-${this.confirmRemove}`,
                            staticClass: 'flex flex-col h-full xxs:justify-between',
                            class: [{
                                '-ml-4': this.confirmRemove
                            }],
                            style:{
                                '--slide-x-enter': this.confirmRemove ? '2rem' : '-1rem',
                                '--slide-x-leave': this.confirmRemove ? '4rem' : '-4rem',
                                '--fade': '0'
                            }
                        },[
                            this.confirmRemove ? 
                                confirmRemove
                            :   details
                        ])
                    ])
                ])

            ])
        }
    }
</script>
