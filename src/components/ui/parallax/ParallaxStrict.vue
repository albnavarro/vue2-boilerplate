<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
import { mq } from '@/utils/mq.js'
import { paralallaxMixin } from '@/components/ui/parallax/ParallaxMixin.js'

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
            const fd = vm.range
            const fo =  ((wh / 100) * vm.shiftOffset)
            const partials = -((s + wh - fo) - ( o + h));
            const fe = vm.inward
            const bs = vm.disableStart
            const ae = vm.disableEnd
            const fi = vm.static

            /*
            ep = Maximum value ( end position)
            */
            const ep = (h / 100) * fd;

            /*
            im = active value through motion
            */
            const im = (partials / 100) * fd;

            if (s + wh - fo <  o) {
                val = (fe) ? ep : 0;
                if (bs) applyStyle = false;

            } else if (s + wh - fo >  o + h) {
                val = (fe) ? 0 : - ep;
                if (ae) applyStyle = false;

            } else {
                val = (fe) ? im : im - ep;
            }

            if (fi) val = ep;

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
        },

        /*
        Switch between zero in default mode
        */
        switchAfterZero(val) {
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
