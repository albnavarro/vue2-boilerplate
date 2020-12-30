<template>
<div class="move3D__container" :style="style">
    <div class="move3D__content">
        <slot :delta="delta" :limit="limit" :isDragging="isDragging"></slot>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Move3D',
    data() {
        return {
            style: {},
            delta: 0,
            limit: 0
        }
    },
    props: {
        xDepth: {
            type: Number,
            default: 20
        },
        yDepth: {
            type: Number,
            default: 10
        },
        xLimit: {
            type: Number,
            default: 35
        },
        yLimit: {
            type: Number,
            default: 35
        },
        isDragging: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState('mouse', {
            move: 'move',
            touchStart: 'touchStart',
            touchEnd: 'touchEnd'
        })
    },
    watch: {
        move() {
            this.setStyle()
        }
    },
    methods: {
        setStyle() {
            const vm = this;

            const vw = vm.$store.state.browser.width
            const vh = vm.$store.state.browser.height
            let x = vm.$store.state.mouse.pointer.x
            let y = vm.$store.state.mouse.pointer.y

            let xgap = 0
            let ygap = 0
            if( vm.isDragging && vm.onDrag ) {
                xgap = x - vm.lastX
                ygap = y - vm.lastY;

                vm.dragX += xgap
                x =  vm.dragX;

                vm.dragY += ygap
                y =  vm.dragY
            }

            /*
            ax = grado di rotazione sull'asse X
            ay = grado di rotazione sull'asse Y
            */
            let ax = - ( (vw / 2) - x ) / vm.xDepth;
            let ay = ( (vh / 2) - y ) / vm.yDepth;

            if (Math.abs(ax) > vm.xLimit) {
                (ax > 0) ? ax = vm.xLimit : ax = -vm.xLimit
                /*
                prevent stall when angle reaches the limit
                */
                vm.dragX -= xgap
            }

            if (Math.abs(ay) > vm.yLimit) {
                (ay > 0) ? ay = vm.yLimit : ay = -vm.yLimit
                /*
                prevent stall when angle reaches the limit
                */
                vm.dragY -= ygap
            }

            vm.lastX = vm.$store.state.mouse.pointer.x
            vm.lastY = vm.$store.state.mouse.pointer.y

            /*
            Calcolo il valore da passare ai componenti figli per animarre l'asse Z.
            Il delta sarà l'ipotenusa del triangolo formato dai volri ax e ay
            */
            vm.delta = Math.sqrt(Math.pow(Math.abs(ay), 2) +  Math.pow(Math.abs(ax), 2));
            vm.limit = Math.sqrt(Math.pow(Math.abs(vm.xLimit), 2) +  Math.pow(Math.abs(vm.yLimit), 2));

            let apply = false;
            if( (vm.isDragging && vm.onDrag ) || !vm.isDragging) apply = true

            if (apply) {
                vm.style = {
                    'transform': `rotateY(${ax}deg) rotateX(${ay}deg) translateZ(0)`
                }
            }
        }
    },
    mounted() {
        const vm = this
        vm.lastX = 0
        vm.dragX = vm.$store.state.browser.width/2
        vm.lastY = 0
        vm.dragY = vm.$store.state.browser.height/2
        vm.onDrag = false

        if( vm.isDragging ) {
            vm.$watch('touchStart', () => {
                vm.onDrag = true
            })

            vm.$watch('touchEnd', () => {
                vm.onDrag = false
            })
        }

        this.$store.dispatch('mouse/inizialize')
    }

}
</script>

<style lang="scss" scoped>
.move3D {

    &__container {
        transform-style: preserve-3d;
        backface-visibility: hidden;
        user-select: none;
    }

    &__content {
        transform-style: inherit;
        user-select: none;
    }
}
</style>
