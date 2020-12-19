<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
import { mq } from '@/utils/mq.js'
import { paralallaxMixin } from '@/mixin/ParallaxMixin.js'

export default {
    name: 'ParallaxStrict',
    mixins: [paralallaxMixin],
    props: {
        range: {
            type: Number,
            default: 50
        },
        static: {
            type: Boolean,
            default: false
        },
        shiftOffset: {
            type: Number,
            default: 0
        },
        inward: {
            type: Boolean,
            default: false
        },
        disableEnd: {
            type: Boolean,
            default: false
        },
        disableStart: {
            type: Boolean,
            default: false
        },
        propierties: {
            type: String,
            default: "vertical",
            validator: function (value) {
                return [
                    'vertical',
                    'horizontal',
                    'rotate',
                    'scale',
                    'opacity',
                    'border-width'
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

            const res = this.getFixedValue(applyStyle)
            vm.endValue = res.endvalue
            applyStyle = res.applyStyle

            if (!applyStyle) return;

            if (vm.targetRef == null) {
                vm.style = vm.setStyle(vm.endValue)
            } else {
                Object.assign(vm.targetRef.style, vm.setStyle(vm.endValue))
            }
        },

        /*
        Get motion val in fixed mode
        */
        getFixedValue(applyStyle) {
            let val = 0

            const vm = this
            const s = vm.scroll
            const wh = vm.wheight
            const o = vm.offset
            const h = vm.height
            const w = vm.width
            const sw = vm.selfWidth
            const rg = vm.range

            /*
            fo = Start point calculated in vh
            */
            const fo =  ((wh / 100) * vm.shiftOffset)
            const partials = -((s + wh - fo) - ( o + h));
            const iw = vm.inward
            const ds = vm.disableStart
            const de = vm.disableEnd
            const st = vm.static

            /*
            ep = Maximum value ( end position)
            */
            const ep = (h / 100) * rg;

            /*
            im = active value through motion
            */
            const im = (partials / 100) * rg;

            if (s + wh - fo <  o) {
                val = (iw) ? ep : 0;
                if (ds) applyStyle = false;

            } else if (s + wh - fo >  o + h) {
                val = (iw) ? 0 : - ep;
                if (de) applyStyle = false;

            } else {
                val = (iw) ? im : im - ep;
            }

            if (st) val = ep;

            /*
            p = percent value
            */
            const p = (Math.abs(val) * 100) / h;

            switch (vm.propierties) {
                case 'horizontal':
                    val = -((w / 100) * p) - ((sw / 100) * p);
                    break;

                case 'scale':
                    val = p * 10;
                    break;

                case 'opacity':
                    val = p / 100;
                    break;

                case 'rotate':
                case 'border-width':
                    val = p;
                    break;
            }

            return {
                endvalue: val,
                applyStyle
            }
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
