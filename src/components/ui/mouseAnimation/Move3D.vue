<template>
<div class="move3D" :style="getPerspective">
    <div class="move3D__container" :style="style">
        <div class="move3D__content">
            <slot></slot>
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
            style: { }
        }
    },
    props: {
        perspective: {
            type: Number,
            default: 1000
        },
        xDelta: {
            type: Number,
            default: 20
        },
        yDelta: {
            type: Number,
            default: 10
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

            const ax = - ( vw / 2- x ) / vm.xDelta;
            const ay = ( vh / 2- y ) / vm.yDelta;

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
    transform-style: preserve-3d;

    &__container {
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }

    &__content {
        transform-style: preserve-3d;
    }
}
</style>
