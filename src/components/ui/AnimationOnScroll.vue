<template>
<div class="animation-on-scroll" :class="visibleClass" ref="item">
    <slot></slot>
</div>
</template>

<script>
import { offset } from '@/utils/vanillaFunction.js'
import WindowInstanceMap from '@/WindowInstanceMap.js'

export default {
    name: 'AnimationOnScroll',
    data() {
        return {
            isVisible: false
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
        wWidth() {
            return WindowInstanceMap.width
        },
        scrollTop() {
            return WindowInstanceMap.scroll
        },
        visibleClass() {
            const vm = this;
            return vm.isVisible ? vm.classMap[vm.type].on : vm.classMap[vm.type].off
        }
    },
    watch: {
        scrollTop() {
            this.setVisibility()
        },
        wWidth() {
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

            const wheight = WindowInstanceMap.height;
            const postion = this.offsetTop - wheight + this.gap

            if (postion < vm.scrollTop && vm.hide && isDisabled) {
                vm.isVisible = true;
                vm.hide = false;
                vm.firstActive = true;

            } else if (postion >= vm.scrollTop && !vm.hide && isDisabled) {
                vm.isVisible = false;
                vm.hide = true
            }
        }
    },
    created() {
        const vm = this;

        // Non reactive data
        vm.offsetTop = 0
        vm.firstActive = false
        vm.hide = true
        vm.classMap = {
            "fromBottom": {
                "on": "fromBottom--on",
                "off": "fromBottom",
            },
            "fromleft": {
                "on": "fromleft--on",
                "off": "fromleft",
            }
        }
    },
    mounted() {
        const vm = this;

        this.$nextTick(() => {
            vm.setOffset();
            vm.setVisibility();
        });
    }
}
</script>

<style lang="scss" scoped>
.animation-on-scroll {
    transition: transform 0.35s, opacity 0.35s;
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
