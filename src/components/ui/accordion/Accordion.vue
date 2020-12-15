<template>
<div class="accordion">
    <AccordionItem
        v-for="(item, index) in items"
        :key = "index"
        :index = "index"
        :closed = "activeIndex !== index && !multiple"
        :content = "item"
        @onClick="onAccordionToggle"
    />
</div>
</template>

<script>

import AccordionItem from '@/components/ui/accordion/AccordionItem.vue'

export default {
    name: 'Accordion',
    components: {
        AccordionItem
    },
    data() {
        return {
            activeIndex: -1
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onAccordionToggle(index) {
            const vm = this
            vm.activeIndex = index
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
