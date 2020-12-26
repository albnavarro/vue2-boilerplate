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
        depth: {
            type: Number,
            default: 100
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
            move: 'move'
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
        setStyle() {
            const vm = this;
            let d = this.depth

            if(this.animate) {
                d = Math.abs(( vm.depth * vm.delta ) / vm.limit)
            }

            this.style = {
                'transform': `translateZ(${d}px)`
            }
        }
    },
    mounted() {
        this.setStyle()
    }
}
