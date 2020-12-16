<template>
<div class="accordion__item" :class="isOpen">
    <div class="accordion__item__header" @click.prevent="onClick()">
        {{ content.title }}
    </div>
    <div class="accordion__item__content" ref="content" :style="setHeight">
        <div class="accordion__item__inner">
            <template v-if="haveContent">
                <div v-html="content.content" />
            </template>
            <template v-if="haveComponent">
                <component :is="haveComponent" @hook:mounted="componentMounted" />
            </template>
        </div>
    </div>
</div>
</template>

<script>
import { outerHeight } from '@/utils/vanillaFunction.js'
import ErrorComponent from '@/components/ErrorComponent.vue'
import WindowInstanceMap from '@/WindowInstanceMap.js'

export default {
    name: 'AccordionItem',
    data() {
        return {
            active: false
        }
    },
    props: {
        index: {
            type: Number,
            required: true
        },
        content: {
            type: Object,
            required: true
        },
        closed: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        wWidth() {
            return WindowInstanceMap.width
        },
        /*
        utility class
        */
        isOpen() {
            return this.active ? 'open' : '';
        },
        /*
        Slide up/down
        */
        setHeight() {
            const vm = this
            return (vm.active) ? `height:${vm.height}` : 'height:0';
        },
        /*
        Check if have simple content
        */
        haveContent() {
            return 'content' in this.content
        },
        /*
        Load async component
        */
        haveComponent() {
            if ('component' in this.content) {
                return () => ({
                    component: import(`@/${this.content.component.path}${this.content.component.name}.vue`),
                    error: ErrorComponent
                })
            } else {
                return null
            }
        }
    },
    watch: {
        /*
        Close item ( parent prop multiple = false)
        */
        closed() {
            const vm = this
            if (vm.closed) vm.active = false
        },
        /*
        Watch browser width
        */
        wWidth() {
            this.getheight()
        }
    },
    methods: {
        /*
        Refresh height on content component loaded
        */
        componentMounted() {
            this.getheight();
        },
        /*
        Open close and send to parent index
        */
        onClick() {
            const vm = this
            vm.active = !vm.active
            vm.$emit('onClick')
        },
        /*
        store item with on resize window or in mounted hook
        */
        getheight() {
            const vm = this
            const contentStyle = vm.$refs.content.style
            contentStyle.height = 'auto'
            vm.height = `${outerHeight(vm.$refs.content)}px`;
            vm.active ? contentStyle.height = vm.height : contentStyle.height = 0
        }
    },
    created() {
        this.height = 'auto'
    },
    mounted() {
        const vm = this
        vm.getheight()

        /*
        Refersh browser basic misure when accordion change layout
        */
        vm.$refs.content.addEventListener("transitionend", (e) => {
            if (e.propertyName === 'height') {
                WindowInstanceMap.refreshBasicSate()
            }
        }, false)
    }
}
</script>

<style lang="scss" scoped>
.accordion {
    &__item {
        &__header {
            background-color: $grey-light;
            border-bottom: 1px $black solid;
            cursor: pointer;
            position: relative;

            &:after {
                content: '';
                width: 10px;
                height: 10px;
                border-right: 3px $black solid;
                border-bottom: 3px $black solid;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%) rotate(45deg);
                transition: transform 0.55s;
            }
        }

        &__header,
        &__inner {
            padding: 20px;
        }

        &__content {
            overflow: hidden;
            transition: height 0.55s;
        }

        &__inner {
            border: 1px $grey-light solid;
        }

        &.open {
            .accordion__item__header {
                &:after {
                    transform: translateY(-50%) rotate(-135deg);
                }
            }
        }
    }
}
</style>
