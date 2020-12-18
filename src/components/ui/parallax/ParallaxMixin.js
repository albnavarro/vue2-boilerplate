import { mapState } from 'vuex'
import { offset, outerHeight, outerWidth } from '@/utils/vanillaFunction.js'
import { mq } from '@/utils/mq.js'

export const paralallaxMixin = {
    data() {
        return {
            style: {}
        }
    },
    props: {
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
        executeParallax() {
        /*
        Override by component
        */
        },


        /*
        Switch between zero in default mode
        Override by component
        */
        switchAfterZero(val) {
            /*
            Override by component
            */
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

    beforeDestroy() {
        const vm = this;

        // Remove Watcher
        vm.scrollWatcher()

    }
}
