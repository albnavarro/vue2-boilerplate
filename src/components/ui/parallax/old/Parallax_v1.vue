<template>
<div class="parallax__item" :class="smoothCss" :style="style" ref="item">
    <slot></slot>
</div>
</template>


<script>
import { mapState } from 'vuex'
import { offset, outerHeight, outerWidth } from '@/utils/vanillaFunction.js'
import { mq } from '@/utils/mq.js'

export default {
    name: 'Parallax',
    data() {
        return {
            style: {}
        }
    },
    props: {
        computationType: {
            type: String,
            default: "default",
            validator: function (value) {
                return [
                    'fixed',
                    'default'
                ].indexOf(value) !== -1
            }
        },
        fixedDistance: {
            type: Number,
            default: 50
        },
        fixedDistanceImmutable: {
            type: Boolean,
            default: false
        },
        fixedOffset: {
            type: Number,
            default: 0
        },
        fixedStartFromEnd: {
            type: Boolean,
            default: false
        },
        fixedStopAfterEnd: {
            type: Boolean,
            default: false
        },
        fixedStopBeforeStart: {
            type: Boolean,
            default: false
        },
        defaultDistance: {
            type: Number,
            default: 8
        },
        defaultAlign: {
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
        defaultAlignVh: {
            type: Number,
            default: null
        },
        defaultStopBack: {
            type: String,
            default: null,
            validator: function (value) {
                return [
                    'toStop',
                    'toBack'
                ].indexOf(value) !== -1
            }
        },
        defaultOpacityStart: {
            type: Number,
            default: 100
        },
        defaultOpacityEnd: {
            type: Number,
            default: 0
        },
        parentRef: {
            type: HTMLDivElement,
            default: null
        },
        targetRef: {
            type: HTMLDivElement,
            default: null
        },
        breackpoint: {
            type: String,
            default: "desktop"
            // reackpoint list -> src/utils/mq.js
        },
        breackpointType: {
            type: String,
            default: "min",
            validator: function (value) {
                return [
                    'min',
                    'max'
                ].indexOf(value) !== -1
            }
        },
        renderAlways: {
            type: Boolean,
            default: false
        },
        responsive: {
            type: Boolean,
            default: false
        },
        responsiveBreackpoint: {
            type: String,
            default: "x-large"
            // reackpoint list -> src/utils/mq.js
        },
        reverse: {
            type: Boolean,
            default: false
        },
        ease: {
            type: String,
            default: "linear",
            validator: function (value) {
                return [
                    'linear',
                    'smooth'
                ].indexOf(value) !== -1
            }
        },
        smoothType: {
            type: String,
            default: "css",
            validator: function (value) {
                return [
                    'css',
                    'js'
                ].indexOf(value) !== -1
            }
        },
        jsDelta: {
            type: Number,
            default: 8
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
    computed: {
        ...mapState('browser', {
            scroll: 'scroll',
            scrollThrottle: 'scrollThrottle',
            wWidth: 'width'
        }),
        smoothCss() {
            return (this.smoothType == 'css' && this.ease == "smooth") ? 'smooth-transition' : ''
        }
    },
    watch: {
        wWidth() {
            const vm = this
            vm.calcSizes()
            vm.rereshParallax()
        },
        parentRef() {
            const vm = this
            vm.calcSizes()
        },
        defaultDistance() {
            const vm = this
            vm.distance = vm.normalizeDistance(vm.defaultDistance)
        },
        jsDelta() {
            const vm = this
            vm.jsVelocity = vm.normalizeVelocity(vm.jsDelta)
        },
        ease() {
            this.addWatcher()
        }
    },
    methods: {
        normalizeDistance(n) {
            if (n < 0) n = .1
            if (n >= 10) n = 9.9

            return 10 - n
        },

        normalizeVelocity(n) {
            if (n < 1) n = 1
            if (n >= 10) n = 9.9

            return (10 - n) * 10
        },

        /*
        Refresh stored size data each resize
        */
        calcSizes() {
            const vm = this;

            vm.wheight = vm.$store.state.browser.height
            vm.documentHeight = vm.$store.state.browser.documentHeight

            vm.selfWidth = parseInt(outerWidth(vm.$refs.item))

            if (vm.parentRef == null) {
                vm.offset = parseInt(offset(vm.$refs.item).top)
                vm.height = parseInt(outerHeight(vm.$refs.item))
                vm.width = vm.selfWidth
            } else {
                vm.offset = parseInt(offset(vm.parentRef).top)
                vm.height = parseInt(outerHeight(vm.parentRef))
                vm.width = parseInt(outerWidth(vm.parentRef))
            }
        },

        /*
        Check if item is in viewport
        */
        isInViewport() {
            const vm = this;

            if(vm.firstTime) {
                // first time set postion of element outside monitor
                vm.firstTime = false
                return true
            } else {
                return vm.offset + vm.height > vm.scroll &&
                vm.offset < vm.scroll + vm.wheight
            }

        },

        /*
        Instantiate a new ReuqestAnimation loop at each scrollThrootle change
        */
        smoothParallaxJs() {
            const vm = this;
            if (vm.ease == 'linear') return;

            vm.executeParallax(false)
            if (vm.raf) cancelAnimationFrame(vm.raf);
            vm.raf = requestAnimationFrame(vm.onReuqestAnim.bind(vm))
        },

        /*
        ReuqestAnimation loop in smooth mode and js anabled
        */
        onReuqestAnim() {
            const draw = () => {
                const vm = this;

                vm.prevValue = vm.startValue

                const s = vm.startValue
                const f = vm.endValue
                const v = vm.jsVelocity
                const val = ((f - s) / v) + s * 1


                switch (vm.propierties) {
                    case 'opacity':
                    case 'rotate':
                    case 'border-width':
                        vm.startValue = val.toFixed(4);
                        break;

                    default:
                        vm.startValue = val.toFixed(1);
                }

                if (vm.targetRef == null) {
                    vm.style = vm.setStyle(vm.startValue)
                } else {
                    Object.assign(vm.targetRef.style, vm.setStyle(vm.startValue))
                }

                /*
                La RAF viene "rigenerata" fino a quando tutti gli elementi rimangono fermi
                */
                if (vm.prevValue == vm.startValue) return;

                if (vm.raf) cancelAnimationFrame(vm.raf);
                vm.raf = requestAnimationFrame(draw)
            }

            draw()
        },

        /*
        Calculates the final value based on the options
        */
        executeParallax(applyStyle = true) {
            const vm = this;

            if (!mq[vm.breackpointType](vm.breackpoint) ||
                !vm.isInViewport() && !vm.renderAlways) return;

            let fRes = {}
            switch (vm.computationType) {
                case 'fixed':
                    fRes = this.getFixedValue(applyStyle)
                    vm.endValue = fRes.endvalue
                    applyStyle = fRes.applyStyle
                    break;

                case 'default':
                    switch (vm.propierties) {
                        case 'opacity':
                            vm.endValue = this.getDefaultOpacity()
                            break;

                        default:
                            if (this.defaultAlignVh) {
                                vm.endValue = this.getDefaultAlignIsNumber()
                            } else {
                                vm.endValue = this.getDefaultAlignIsNaN()
                            }
                            vm.endValue = vm.endValue.toFixed(1) / 2;
                            break;
                    }
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
            const fd = vm.fixedDistance
            const fo =  ((wh / 100) * vm.fixedOffset)
            const partials = -((s + wh - fo) - ( o + h));
            const fe = vm.fixedStartFromEnd
            const bs = vm.fixedStopBeforeStart
            const ae = vm.fixedStopAfterEnd
            const fi = vm.fixedDistanceImmutable

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
        Get opacity val in default mode
        */
        getDefaultOpacity() {
            const vm = this;
            const wh = vm.wheight
            const oe = vm.defaultOpacityEnd
            const os = vm.defaultOpacityStart
            const s = vm.scroll
            const o = vm.offset
            const vhLimit = (wh / 100 * oe);
            const vhStart = wh - (wh / 100 * os);

            let  val = 0;
            if (vm.defaultAlign == 'start') {
                val = -s;
            } else {
                val = (s + vhLimit - o);
            }

            val = val * -1;

            if (vm.defaultAlign == 'start') {
                val = 1 - val / o;
            } else {
                val = 1 - val / (wh - vhStart - vhLimit);
            }

            return val.toFixed(2);
        },

        /*
        Get motion val when use align like top, bottom etc... in default mode
        */
        getDefaultAlignIsNaN() {
            const vm = this
            const s = vm.scroll
            const d = vm.distance
            const o = vm.offset
            const h = vm.height
            const wh = vm.wheight
            const dh = vm.documentHeight
            let val = 0

            switch (vm.defaultAlign) {
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
        getDefaultAlignIsNumber() {
            const vm = this
            const s = vm.scroll
            const wh = vm.wheight
            const da = this.defaultAlignVh
            const o = vm.offset
            const d = vm.distance

            return ((s + (wh / 100 * da)) - o) / d;
        },


        /*
        Switch between zero in default mode
        */
        switchAfterZero(val) {
            const vm = this;

            if (vm.computationType == 'default') {
                if (vm.propierties != 'opacity') {
                    switch (vm.defaultStopBack) {
                        case 'toStop':
                            if (!vm.reverse && val > 0 ||
                                vm.reverse && val < 0) {
                                val = 0;
                            }
                            break;

                        case 'toBack':
                            if (!vm.reverse && val > 0 ||
                                vm.reverse && val < 0) {
                                val = -val;
                            }
                            break;
                    }
                } else {
                    if (vm.defaultStopBack == 'toBack') {
                        const wh = vm.wheight
                        const oe = vm.defaultOpacityEnd
                        const os = vm.defaultOpacityStart

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
            }

            return val
        },

        /*
        Revert value
        */
        setReverse(val) {
            const vm = this;

            if (vm.reverse) {
                switch (vm.propierties) {
                    case 'opacity':
                        val = 1 - val;
                        break;

                    default:
                        val = -val;
                }
            }

            return val
        },


        /*
        Get final style
        */
        setStyle(val) {
            const vm = this;
            let style = {};

            val = this.setReverse(val)
            val = this.switchAfterZero(val)

            let scaleVal = 0
            switch (vm.propierties) {
                case 'vertical':
                    if (vm.responsive && !mq.min(vm.responsiveBreackpoint)) {
                        const value = (val * 100) / vm.height;
                        style['transform'] = `translate3d(0,0,0) translateY(${value}vh)`;
                    } else {
                        style['transform'] = `translate3d(0,0,0) translateY(${val}px)`;
                    }
                    break;

                case 'horizontal':
                    if (vm.responsive && !mq.min(vm.responsiveBreackpoint)) {
                        const value = (val * 100) / vm.width;
                        style['transform'] = `translate3d(0,0,0) translateX(${value}vw)`;
                    } else {
                        style['transform'] = `translate3d(0,0,0) translateX(${val}px)`;
                    }
                    break;

                case 'rotate':
                    style['transform'] = `translate3d(0,0,0) rotate(${val}deg)`;
                    break;

                case 'border-width':
                    style['border-width'] = `${val}px`;
                    break;

                case 'opacity':
                    style['opacity'] = `${val}`;
                    break;

                case 'scale':
                    scaleVal = 1 + (val / 1000);
                    style['transform'] = `translate3d(0,0,0) scale(${scaleVal})`;
                    break;
            }

            return style
        },


        /*
        Add right scroll watcher
        */
        addWatcher() {
            const vm = this;
            /*
            Remove previous watcher if exist
            */
            if(vm.scrollWatcher != null) vm.scrollWatcher();

            /*
            Add new watcher dynamically
            */
            if (vm.ease == 'linear') {
                vm.scrollWatcher = vm.$watch('scroll', () => {
                    vm.executeParallax()
                });
            }

            if (vm.ease == 'smooth') {
                vm.scrollWatcher = vm.$watch('scrollThrottle', () => {
                    switch (vm.smoothType) {
                        case 'css':
                            vm.executeParallax()
                            break;
                        case 'js':
                            vm.smoothParallaxJs()
                            break;
                    }
                });
            }
        },

        /*
        Refresh position
        */
        rereshParallax() {
            const vm = this;

            switch (vm.ease) {
                case 'linear':
                    vm.executeParallax()
                    break;

                case 'smooth':
                    switch (vm.smoothType) {
                        case 'css':
                            vm.executeParallax()
                            break;
                        case 'js':
                            vm.smoothParallaxJs()
                            break;
                    }
                    break;
            }
        }
    },

    created() {
        const vm = this;

        // Non reactive data
        vm.offset = 0
        vm.endValue = 0
        vm.startValue = 0
        vm.prevValue = 0
        vm.height = 0
        vm.wheight = 0
        vm.width = 0
        vm.selfWidth = 0
        vm.documentHeight = 0
        vm.distance = 0
        vm.jsVelocity = 0
        vm.firstTime = true
        vm.raf = null
        vm.scrollWatcher = null
    },

    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            vm.distance = vm.normalizeDistance(vm.defaultDistance)
            vm.jsVelocity = vm.normalizeVelocity(vm.jsDelta)

            if (vm.parentRef == null) vm.calcSizes()
            vm.rereshParallax()

            vm.addWatcher();
        });
    },

    beforeDestroy() {
        const vm = this;

        // Remove Watcher
        vm.scrollWatcher()

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
