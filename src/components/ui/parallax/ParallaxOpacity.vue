<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
import { mq } from '@/utils/mq.js'
import { paralallaxMixin } from '@/mixin/ParallaxMixin.js'

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
        /*
        Calculates the final value based on the options
        */
        executeParallax(applyStyle = true) {
            const vm = this;

            if (!mq[vm.breackpointType](vm.breackpoint) ||
                !vm.isInViewport() && !vm.renderAlways) return;

            vm.endValue = this.getOpacity()

            if (!applyStyle) return;

            if (vm.targetRef == null) {
                vm.style = vm.setStyle(vm.endValue)
            } else {
                Object.assign(vm.targetRef.style, vm.setStyle(vm.endValue))
            }
        },

        /*
        Get opacity val in default mode
        */
        getOpacity() {
            const vm = this;
            const wh = vm.wheight
            const oe = vm.endPoint
            const os = vm.startPoint
            const s = vm.scroll
            const o = vm.offset
            const vhLimit = (wh / 100 * oe);
            const vhStart = wh - (wh / 100 * os);

            let  val = 0;
            if (vm.align == 'start') {
                val = -s;
            } else {
                val = (s + vhLimit - o);
            }

            val = val * -1;

            if (vm.align == 'start') {
                val = 1 - val / o;
            } else {
                val = 1 - val / (wh - vhStart - vhLimit);
            }

            return val.toFixed(2);
        },

        /*
        Switch between zero in default mode
        */
        switchAfterZero(val) {
            const vm = this;

            if (vm.onSwitch == 'back') {
                const wh = vm.wheight
                const oe = vm.endPoint
                const os = vm.startPoint

                /*
                start vale in wh percent
                */
                const t = (wh / 100 * os)

                /*
                end value in vh percent
                */
                const e = (wh / 100 * oe)

                /*
                Are the upper and lower limits where opacity should be applied
                */
                const limitTop = e - (t  - e)
                const limitBottom = wh - (wh - t)

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
