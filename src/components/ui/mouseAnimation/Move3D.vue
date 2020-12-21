<template>
<div class="move3D" :style="getPerspective">
    <div class="move3D__container" :style="style">
        <div class="move3D__content">
            <slot :delta="delta" :limit="limit"></slot>
        </div>
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
        perspective: {
            type: Number,
            default: 1000
        },
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
        }
    },
    computed: {
        ...mapState('mouse', {
            move: 'move'
        }),
        getPerspective() {
            return {
                'perspective': `${this.perspective}px`
            }
        }
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
            const x = vm.$store.state.mouse.pointer.x
            const y = vm.$store.state.mouse.pointer.y

            /*
            ax = grado di rotazione sull'asse X
            ay = grado di rotazione sull'asse Y
            */
            let ax = - ( vw / 2- x ) / vm.xDepth;
            let ay = ( vh / 2- y ) / vm.yDepth;

            if (Math.abs(ax) > vm.xLimit) {
                (ax > 0) ? ax = vm.xLimit : ax = -vm.xLimit
            }

            if (Math.abs(ay) > vm.yLimit) {
                (ay > 0) ? ay = vm.yLimit : ay = -vm.yLimit
            }

            /*
            Calcolo il valore da passare ai componenti figli per animarre l'asse Z.
            Il delta sarà l'ipotenusa del triangolo formato dai volri ax e ay
            */
            vm.delta = Math.sqrt(Math.pow(Math.abs(ay), 2) +  Math.pow(Math.abs(ax), 2));
            vm.limit = Math.sqrt(Math.pow(Math.abs(vm.xLimit), 2) +  Math.pow(Math.abs(vm.yLimit), 2));

            vm.style = {
                'transform': `rotateY(${ax}deg) rotateX(${ay}deg) translateZ(0)`
            }
        }
    },
    mounted() {
        this.$store.dispatch('mouse/inizialize')
    }

}
</script>

<style lang="scss" scoped>
.move3D {

    &__container {
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    &__content {
        transform-style: inherit;
    }
}
</style>
