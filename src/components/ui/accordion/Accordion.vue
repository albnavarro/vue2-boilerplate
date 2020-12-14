<template>
<div class="accordion">
    <AccordionItem
        v-for="(item, index) in items"
        :key = "index"
        :index = "index"
        :activeId = "activeId"
        :content = "item"
        :multiple = "multiple"
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
            activeId: -1
        }
    },
    methods: {
        onAccordionToggle(index) {
            const vm = this
            vm.activeId = index
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
    }
}
</script>

<style lang="scss" scoped>

</style>
