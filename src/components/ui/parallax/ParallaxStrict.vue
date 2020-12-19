<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
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
        setValByContext(applyStyle) {
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
            sp = Start point calculated in vh
            */
            const sp =  ((wh / 100) * vm.shiftOffset)
            const partials = -((s + wh - sp) - ( o + h));
            const iw = vm.inward
            const ds = vm.disableStart
            const de = vm.disableEnd
            const st = vm.static

            /*
            ep = Maximum value ( end position)
            */
            const max = (h / 100) * rg;

            /*
            im = active value through motion
            */
            const v = (partials / 100) * rg;

            if (s + wh - sp <  o) {
                val = (iw) ? max : 0;
                if (ds) applyStyle = false;

            } else if (s + wh - sp >  o + h) {
                val = (iw) ? 0 : - max;
                if (de) applyStyle = false;

            } else {
                val = (iw) ? v : v - max;
            }

            if (st) val = max;

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
                val: val,
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
