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
            default: "default"
        },
        fixedDistance: {
            type: Number,
            default: null
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
        defaulAlign: {
            type: String,
            default: "center"
        },
        defaultStopBack: {
            type: String,
            default: ""
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
        },
        breackpointType: {
            type: String,
            default: "min"
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
            default: "xLarge"
        },
        reverse: {
            type: Boolean,
            default: false
        },
        ease: {
            type: String,
            default: "linear"
        },
        smoothType: {
            type: String,
            default: "js"
        },
        jsDelta: {
            type: Number,
            default: 8
        },
        propierties: {
            type: String,
            default: "vertical"
        }
    },
    computed: {
        ...mapState('browser', {
            scroll: 'scroll',
            scrollThrottle: 'scrollThrottle',
            wWidth: 'width'
        }),
        smoothCss() {
            return this.smoothType == 'css' ? 'smooth-transition' : ''
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


        calcSizes() {
            const vm = this;

            vm.wheight = vm.$store.state.browser.height
            vm.documentHeight = vm.$store.state.browser.documentHeight

            if (vm.parentRef == null) {
                vm.offset = parseInt(offset(vm.$refs.item).top)
                vm.height = parseInt(outerHeight(vm.$refs.item))
                vm.width = parseInt(outerWidth(vm.$refs.item))
            } else {
                vm.offset = parseInt(offset(vm.parentRef).top)
                vm.height = parseInt(outerHeight(vm.parentRef))
                vm.width = parseInt(outerWidth(vm.parentRef))
            }
        },


        isInViewport() {
            const vm = this;
            const secureGap = 20

            return vm.offset + vm.height + secureGap > vm.scroll &&
                vm.offset < vm.scroll + vm.wheight + secureGap
        },


        smoothParallaxJs() {
            const vm = this;

            vm.executeParallax(false)
            if (vm.raf) cancelAnimationFrame(vm.raf);
            vm.raf = requestAnimationFrame(vm.onReuqestAnim.bind(vm))
        },


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

                // La RAF viene "rigenerata" fino a quando tutti gli elementi rimangono fermi
                if (vm.prevValue == vm.startValue) return;

                if (vm.raf) cancelAnimationFrame(vm.raf);
                vm.raf = requestAnimationFrame(draw)
            }

            draw()
        },


        executeParallax(applyStyle = true) {
            const vm = this;

            if (!mq[vm.breackpointType](vm.breackpoint) ||
                !vm.isInViewport() && !vm.renderAlways) return;

            let partials = 0
            let endPos = 0
            let inMotion = 0
            let percent = 0
            let vhLimit = 0
            let vhStart = 0
            let opacityVal = 0
            const isNumber = parseInt(vm.defaulAlign)
            const fixfedEntryOffset = ((vm.wheight / 100) * vm.fixedOffset)

            switch (vm.computationType) {
                case 'fixed':
                    partials = -((vm.scroll + vm.wheight - fixfedEntryOffset) - ( vm.offset + vm.height));
                    endPos = (vm.height / 100) * vm.fixedDistance;
                    inMotion = (partials / 100) * vm.fixedDistance;

                    if (vm.scroll + vm.wheight - fixfedEntryOffset <  vm.offset) {
                        vm.endValue = (vm.fixedStartFromEnd) ? endPos : 0;
                        if (vm.fixedStopBeforeStart) applyStyle = false;

                    } else if (vm.scroll + vm.wheight - fixfedEntryOffset >  vm.offset + vm.height) {
                        vm.endValue = (vm.fixedStartFromEnd) ? 0 : -endPos;
                        if (vm.fixedStopAfterEnd) applyStyle = false;

                    } else {
                        vm.endValue = (vm.fixedStartFromEnd) ? inMotion : inMotion - endPos;
                    }

                    if(vm.fixedDistanceImmutable)  {
                        vm.endValue = endPos;
                    }

                    percent = (Math.abs(vm.endValue) * 100) / vm.height;

                    switch (vm.propierties) {
                        case 'horizontal':
                            vm.endValue = -((vm.width / 100) * percent);
                            break;

                        case 'scale':
                            vm.endValue = percent * 10;
                            break;

                        case 'opacity':
                            vm.endValue = percent / 100;
                            break;

                        case 'rotate':
                        case 'border-width':
                            vm.endValue = percent;
                            break;
                    }
                    break;

                case 'default':
                    switch (vm.propierties) {
                        case 'opacity':
                            vhLimit = (vm.wheight / 100 * vm.defaultOpacityEnd);
                            vhStart = vm.wheight - (vm.wheight / 100 * vm.defaultOpacityStart);

                            opacityVal = 0;
                            if (vm.defaulAlign == 'start') {
                                opacityVal = -vm.scroll;
                            } else {
                                opacityVal = (vm.scroll + vhLimit - vm.offset);
                            }

                            opacityVal = opacityVal * -1;

                            if (vm.defaulAlign == 'start') {
                                opacityVal = 1 - opacityVal / vm.offset;
                            } else {
                                opacityVal = 1 - opacityVal / (vm.wheight - vhStart - vhLimit);
                            }

                            vm.endValue = opacityVal.toFixed(2);
                            break;

                        default:
                            if (isNaN(isNumber)) {
                                switch (vm.defaulAlign) {
                                    case 'start':
                                        vm.endValue = (vm.scroll / vm.distance);
                                        break;

                                    case 'top':
                                        vm.endValue = (((vm.scroll - vm.offset) / vm.distance));
                                        break;

                                    case 'center':
                                        vm.endValue = ((((vm.scroll + (vm.wheight / 2 - vm.height / 2)) - vm.offset) / vm.distance));
                                        break;

                                    case 'bottom':
                                        vm.endValue = ((((vm.scroll + (vm.wheight - vm.height)) - vm.offset) / vm.distance));
                                        break;

                                    case 'end':
                                        vm.endValue = -((vm.documentHeight - (vm.scroll + vm.wheight)) / vm.distance);
                                        break;
                                }
                            } else {
                                vm.endValue = ((((vm.scroll + (vm.wheight / 100 * vm.defaulAlign)) - vm.offset) / vm.distance));
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


        setStyle(val) {
            const vm = this;
            let style = {};

            if (vm.reverse) {
                switch (vm.propierties) {
                    case 'opacity':
                        val = 1 - val;
                        break;

                    default:
                        val = -val;
                }
            }

            if (vm.fixedDistance == null) {
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
                        if (val > 1.999) val = 1.999
                        if (val < 0) val = -val;
                        if (val > 1) val = 1 - (val % 1);
                    }
                }
            }

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
        vm.documentHeight = 0
        vm.distance = 0
        vm.jsVelocity = 0
        vm.raf = null
    },

    mounted() {
        const vm = this;

        vm.$nextTick(() => {
            vm.distance = vm.normalizeDistance(vm.defaultDistance)
            vm.jsVelocity = vm.normalizeVelocity(vm.jsDelta)

            // if rerefer to other element computed function calc value
            if (vm.parentRef == null) vm.calcSizes()
            vm.rereshParallax()

            // Add watcher dynamically
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
