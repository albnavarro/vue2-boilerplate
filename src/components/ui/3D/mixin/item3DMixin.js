import { mapState } from 'vuex'

export const item3DMixin = {
    data() {
        return {
            style: {}
        }
    },
    props: {
        delta: {
            type: Number,
            default: 100
        },
        limit: {
            type: Number,
            default: 15
        },
        drag: {
            type: Boolean,
            default: true
        },
        depth: {
            type: Number,
            default: 0
        },
        animate: {
            type: Boolean,
            default: true
        },
        isContainer: {
            type: Boolean,
            default: false
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        }
    },
    computed: {
        ...mapState('mouse', {
            move: 'move',
            touchStart: 'touchStart',
            touchEnd: 'touchEnd'
        }),
        setContainer() {
            return this.isContainer ? { 'position': 'relative' } : { 'position': 'absolute' }
        },
        setX() {
            return (this.x != 0 && !this.isContainer) ? {'left': `${this.x}%`} : {'left': '0'}
        },
        setY() {
            return (this.y != 0 && !this.isContainer) ? {'top': `${this.y}%`} : {'top': '0'}
        }
    },
    watch: {
        move() {
            if(this.animate) this.setStyle()
        },
        depth() {
            this.setStyle()
        }
    },
    methods: {
        setStyle(force = false) {
            const vm = this;
            let d = this.depth

            if(this.animate) {
                d = Math.abs(( vm.depth * vm.delta ) / vm.limit)
            }

            let apply = false;
            if( (vm.drag && vm.onDrag) || !vm.drag || force) apply = true

            if (apply) {
                this.style = {
                    'transform': `translateZ(${d}px)`
                }
            }
        }
    },
    mounted() {
        const vm = this;
        vm.setStyle(true)

        if( vm.drag ) {
            vm.$watch('touchStart', () => {
                vm.onDrag = true
            })

            vm.$watch('touchEnd', () => {
                vm.onDrag = false
            })
        }
    }
}
