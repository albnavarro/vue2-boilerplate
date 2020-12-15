<template>
<div class="accordion__item" :class="isOpen">
    <div class="accordion__item__header" @click.prevent="onClick()">
        {{ content.title }}
    </div>
    <div class="accordion__item__content" ref="content">
        <div class="accordion__item__inner">
            {{ content.content }}
        </div>
    </div>
</div>
</template>

<script>
import { slideUpDownReset, slideUp, slideDown } from '@/utils/animation.js'

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
        isOpen() {
            return this.active ? 'open' : '';
        }
    },
    watch: {
        active() {
            const vm = this;
            (vm.active) ? vm.open() : vm.close()
        },
        closed() {
            const vm = this
            if(vm.closed) vm.active = false
        }
    },
    methods: {
        onClick() {
            const vm = this
            vm.active = !vm.active
            vm.$emit('onClick', this.index)
        },
        open() {
            slideDown(this.$refs.content).then(() => {
                this.$store.commit('browser/afterConstrain');
            })
        },
        close() {
            slideUp(this.$refs.content).then(() => {
                this.$store.commit('browser/afterConstrain');
            })
        }
    },
    mounted() {
        slideUpDownReset(this.$refs.content)
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
                transition: transform .55s;
            }
        }

        &__header,
        &__inner {
            padding: 20px;
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
