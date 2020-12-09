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
            isVisible: false
        }
    },
    props: {
        hiddenClass: {
            type: String,
            default: "fromBottom"
        },
        activeClass: {
            type: String,
            default: "fromBottom--visible"
        },
        once: {
            type: Boolean,
            default: true
        },
        gap: {
            type: Number,
            default: 20
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
            return vm.isVisible ? vm.activeClass : vm.hiddenClass
        }
    },
    watch: {
        getThrottleScroll() {
            this.setVisibility()
        },
        getWidth() {
            this.setOffset()
            this.setVisibility()
        }
    },
    methods: {
        setOffset() {
            const vm = this;
            vm.offsetTop = offset(vm.$refs.item).top;
        },
        setVisibility() {
            const vm = this;

            let isAble = true;
            if (vm.once && vm.firstActive) isAble = false;

            const windowsOffsetTop = this.$store.state.browser.scrollThrottle
            const windowsheight = this.$store.state.browser.height
            const postion = this.offsetTop - windowsheight + this.gap

            if (postion < windowsOffsetTop && vm.hide && isAble) {
                vm.isVisible = true;
                vm.hide = false;
                vm.firstActive = true;

            } else if (postion >= windowsOffsetTop && !vm.hide && isAble) {
                vm.isVisible = false;
                vm.hide = true
            }
        }
    },
    mounted() {
        const vm = this;
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

        &--visible {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .fromleft {
        transform: translateX(20%);
        opacity: 0;

        &--visible {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>
