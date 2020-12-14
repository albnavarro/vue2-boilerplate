<template>
<div class="accordion__item" :class="isOpen">
    <div class="accordion__item__header">
        {{ content.title }}
        <button type="button" @click.prevent="onClick()">
            open close
        </button>
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
            opened: false
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
        closeItem: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        isOpen() {
            return this.opened ? 'open' : '';
        }
    },
    watch: {
        opened() {
            const vm = this;
            (vm.opened) ? vm.open() : vm.close()
        },
        closeItem() {
            const vm = this
            if(vm.closeItem) vm.opened = false
        }
    },
    methods: {
        onClick() {
            const vm = this
            vm.opened = !vm.opened
            vm.$emit('onClick', this.index)
        },
        open() {
            slideDown(this.$refs.content).then(() => {
                const documentHeight = document.documentElement.scrollHeight
                this.$store.commit('browser/setDocumentHeight', documentHeight);
            })
        },
        close() {
            slideUp(this.$refs.content).then(() => {
                const documentHeight = document.documentElement.scrollHeight
                this.$store.commit('browser/setDocumentHeight', documentHeight);
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
        &__header,
        &__inner {
            padding: 20px;
            border: 1px $grey solid;
        }

        &__inner {

        }
    }
}
</style>
