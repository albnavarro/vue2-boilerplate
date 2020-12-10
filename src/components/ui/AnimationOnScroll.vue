<template>
    <div class="animation-on-scroll" :class="visibleClass" ref="item">
        <slot></slot>
    </div>
</template>

<script>

import { offset } from '@/utils/vanillaFunction.js'

export default {
    name: 'AnimationOnScroll',
    data() {
        return {
            offsetTop: 0,
            firstActive: false,
            hide: true,
            isVisible: false,
            classMap: {
                "fromBottom": {
                    "on": "fromBottom--on",
                    "off": "fromBottom",
                },
                "fromleft": {
                    "on": "fromleft--on",
                    "off": "fromleft",
                }
            }
        }
    },
    props: {
        type: {
            type: String,
            default: "fromBottom"
        },
        once: {
            type: Boolean,
            default: true
        },
        gap: {
            type: Number,
            default: 20
        },
        parentRef: {
            type: HTMLDivElement,
            default: null
        }
    },
    computed: {
        getThrottleScroll() {
            return this.$store.state.browser.scrollThrottle;
        },
        getWidth() {
            return this.$store.state.browser.width;
        },
        visibleClass() {
            const vm = this;
            return vm.isVisible ? vm.classMap[vm.type].on : vm.classMap[vm.type].off
        }
    },
    watch: {
        getThrottleScroll() {
            this.setVisibility()
        },
        getWidth() {
            this.setOffset()
            this.setVisibility()
        },
        parentRef() {
            this.setOffset();
            this.setVisibility()
        }
    },
    methods: {
        setOffset() {
            const vm = this;
            if (this.parentRef === null) {
                vm.offsetTop = offset(vm.$refs.item).top;
            } else {
                vm.offsetTop = offset(vm.parentRef).top;
            }
        },
        setVisibility() {
            const vm = this;

            let isDisabled = true;
            if (vm.once && vm.firstActive) isDisabled = false;

            const windowsOffsetTop = this.$store.state.browser.scrollThrottle
            const windowsheight = this.$store.state.browser.height
            const postion = this.offsetTop - windowsheight + this.gap

            if (postion < windowsOffsetTop && vm.hide && isDisabled) {
                vm.isVisible = true;
                vm.hide = false;
                vm.firstActive = true;

            } else if (postion >= windowsOffsetTop && !vm.hide && isDisabled) {
                vm.isVisible = false;
                vm.hide = true
            }
        }
    },
    mounted() {
        const vm = this;

        // use $nextTick for intercept the parentRefs on mounted
        vm.setOffset();
        vm.setVisibility();
    }
}

</script>

<style lang="scss" scoped>
    .animation-on-scroll {
        transition: transform .35s, opacity .35s;
    }

    .fromBottom {
        transform: translateY(20%);
        opacity: 0;

        &--on {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .fromleft {
        transform: translateX(20%);
        opacity: 0;

        &--on {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>
