<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
import { mq } from '@/utils/mq.js'
import { paralallaxMixin } from '@/components/ui/parallax/ParallaxMixin.js'

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
        opacityStartAt: {
            type: Number,
            default: 100
        },
        opacityEndtAt: {
            type: Number,
            default: 0
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

        /*
        Calculates the final value based on the options
        */
        executeParallax(applyStyle = true) {
            const vm = this;

            if (!mq[vm.breackpointType](vm.breackpoint) ||
                !vm.isInViewport() && !vm.renderAlways) return;

            switch (vm.propierties) {
                case 'opacity':
                    vm.endValue = this.getOpacity()
                    break;

                default:
                    if (this.alignVh) {
                        vm.endValue = this.getAlignIsNumber()
                    } else {
                        vm.endValue = this.getAlignIsNaN()
                    }
                    vm.endValue = vm.endValue.toFixed(1) / 2;
                    break;
            }

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
            const oe = vm.opacityEndtAt
            const os = vm.opacityStartAt
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
            const da = this.alignVh
            const o = vm.offset
            const d = vm.distance

            return ((s + (wh / 100 * da)) - o) / d;
        },


        /*
        Switch between zero in default mode
        */
        switchAfterZero(val) {
            const vm = this;

            if (vm.propierties != 'opacity') {
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
            } else {
                if (vm.onSwitch == 'back') {
                    const wh = vm.wheight
                    const oe = vm.opacityEndtAt
                    const os = vm.opacityStartAt

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

        &.smooth-transition {
            transition: transform 1s cubic-bezier(0.305, 0.550, 0.470, 1.015);
        }
    }
}
</style>
