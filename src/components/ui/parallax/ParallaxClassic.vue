<template>
<div ref="item">
    <div class="parallax__item" :class="smoothCss" :style="style" ref="item">
        <slot></slot>
    </div>
</div>

</template>


<script>
import { paralallaxMixin } from '@/components/ui/parallax/mixin/ParallaxMixin.js'

export default {
    name: 'ParallaxClassic',
    mixins: [paralallaxMixin],
    props: {
        range: {
            type: Number,
            default: 8
        },
        align: {
            type: String,
            default: "center",
            validator: function (value) {
                return [
                    'start',
                    'top',
                    'center',
                    'bottom',
                    'end'
                ].indexOf(value) !== -1
            }
        },
        alignVh: {
            type: Number,
            default: null
        },
        onSwitch: {
            type: String,
            default: null,
            validator: function (value) {
                return [
                    'stop',
                    'back'
                ].indexOf(value) !== -1
            }
        },
        propierties: {
            type: String,
            default: "vertical",
            validator: function (value) {
                return [
                    'vertical',
                    'horizontal',
                    'depth',
                    'rotate',
                    'scale',
                    'border-width',
                    'rotateY',
                    'rotateX',
                    'rotateZ'
                ].indexOf(value) !== -1
            }
        }
    },
    watch: {
        range() {
            const vm = this
            vm.distance = vm.normalizeDistance(vm.range)
        }
    },
    methods: {
        normalizeDistance(n) {
            if (n < 0) n = .1
            if (n >= 10) n = 9.9

            return 10 - n
        },


        setValByContext(applyStyle) {
            let val = 0

            if (this.alignVh) {
                val = this.getAlignIsNumber()
            } else {
                val = this.getAlignIsNaN()
            }
            val = val.toFixed(1) / 2;

            return {
                val,
                applyStyle
            }
        },

        /*
        Get motion val when use align like top, bottom etc... in default mode
        */
        getAlignIsNaN() {
            const vm = this
            const s = vm.scroll
            const d = vm.distance
            const o = vm.offset
            const h = vm.height
            const wh = vm.wheight
            const dh = vm.documentHeight
            let val = 0

            switch (vm.align) {
                case 'start':
                    val = s / d;
                    break;

                case 'top':
                    val = (s - o) / d;
                    break;

                case 'center':
                    val = ((s + (wh / 2 - h / 2)) - o) / d;
                    break;

                case 'bottom':
                    val = ((s + (wh - h)) - o) / d;
                    break;

                case 'end':
                    val = -((dh - (s + wh)) / d);
                    break;
            }

            return val
        },

        /*
        Get motion val when use align in vh in default mode
        */
        getAlignIsNumber() {
            const vm = this
            const s = vm.scroll
            const wh = vm.wheight
            const ah = this.alignVh
            const o = vm.offset
            const d = vm.distance

            return ((s + (wh / 100 * ah)) - o) / d;
        },


        /*
        Switch between zero in default mode
        */
        switchAfterZero(val) {
            const vm = this;

            switch (vm.onSwitch) {
                case 'stop':
                    if (!vm.reverse && val > 0 ||
                        vm.reverse && val < 0) {
                        val = 0;
                    }
                    break;

                case 'back':
                    if (!vm.reverse && val > 0 ||
                        vm.reverse && val < 0) {
                        val = -val;
                    }
                    break;
            }

            return val
        },
    },

    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            vm.distance = vm.normalizeDistance(vm.range)
            vm.jsVelocity = vm.normalizeVelocity(vm.jsDelta)

            if (vm.parentRef == null) vm.calcSizes()
            vm.rereshParallax()

            vm.addWatcher();
        });
    }
}
</script>

<style lang="scss" scoped>
.parallax {
    &__item {
        position: relative;
        transform-style: inherit;

        &.smooth-transition {
            transition: transform 1s cubic-bezier(0.305, 0.550, 0.470, 1.015);
        }
    }
}
</style>
