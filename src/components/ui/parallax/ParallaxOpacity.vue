<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
import { paralallaxMixin } from '@/components/ui/parallax/mixin/ParallaxMixin.js'

export default {
    name: 'ParallaxOpacity',
    mixins: [paralallaxMixin],
    props: {
        align: {
            type: String,
            default: null,
            validator: function (value) {
                return [
                    'start'
                ].indexOf(value) !== -1
            }
        },
        onSwitch: {
            type: String,
            default: null,
            validator: function (value) {
                return [
                    'back'
                ].indexOf(value) !== -1
            }
        },
        startPoint: {
            type: Number,
            default: 100
        },
        endPoint: {
            type: Number,
            default:50
        },
        propierties: {
            type: String,
            default: "opacity",
            validator: function (value) {
                return [
                    'opacity'
                ].indexOf(value) !== -1
            }
        }
    },
    methods: {
        setValByContext(applyStyle) {
            const vm = this;
            const wh = vm.wheight
            const ep = vm.endPoint
            const sp = vm.startPoint
            const s = vm.scroll
            const o = vm.offset
            const vhEnd = (wh / 100 * ep);
            const vhStart = wh - (wh / 100 * sp);

            let  val = 0;
            if (vm.align == 'start') {
                val = -s;
            } else {
                val = (s + vhEnd - o);
            }

            val = val * -1;

            if (vm.align == 'start') {
                val = 1 - val / o;
            } else {
                val = 1 - val / (wh - vhStart - vhEnd);
            }

            return {
                val: val.toFixed(2),
                applyStyle
            }
        },

        /*
        Switch between zero in default mode
        */
        switchAfterZero(val) {
            const vm = this;

            if (vm.onSwitch == 'back') {
                const wh = vm.wheight
                const ep = vm.endPoint
                const sp = vm.startPoint

                /*
                start value in wh percent
                */
                const sv = (wh / 100 * sp)

                /*
                end value in vh percent
                */
                const ev = (wh / 100 * ep)

                /*
                Are the upper and lower limits where opacity should be applied
                */
                const limitTop = ev - (sv  - ev)
                const limitBottom = wh - (wh - sv)

                /*
                el relative offset in relation to the window
                */
                const relOffset = vm.offset - vm.scroll

                /*
                Invert opacity if should be applied
                */
                if(relOffset >= limitTop && relOffset <= limitBottom) {
                    if (val > 1.999) val = 1.999
                    if (val < 0) val = - val;
                    if (val > 1) val = 1 - (val % 1);
                } else if ( relOffset < limitTop && !vm.reverse) {
                    val = 0
                } else if ( relOffset < limitTop && vm.reverse) {
                    val = val = - val
                }
            }

            return val
        }
    },

    mounted() {
        const vm = this;

        vm.$nextTick(() => {
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

        &.smooth-transition {
            transition: transform 1s cubic-bezier(0.305, 0.550, 0.470, 1.015);
        }
    }
}
</style>
