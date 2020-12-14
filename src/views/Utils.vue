<template>
    <div class="container utils">
        <div class="utils__col">
            <h2>Accordion</h2>
            <button class="accordion-style" type="button"
                    @click.prevent="onMuliple()"
                    :class="multiple ? 'selected' : ''">
                muliple
            </button>
            <button class="accordion-style" type="button"
                    @click.prevent="onSingle()"
                    :class="!multiple ? 'selected' : ''">
                single
            </button>
            <Accordion
                :items = "accordionData"
                :multiple = "multiple"
            />
        </div>
    </div>
</template>

<script>

import Accordion from '@/components/ui/accordion/Accordion.vue'
import data from '@/locales/data.json'

export default {
    name: 'Utils',
    components: {
        Accordion
    },
    data() {
        return {
            accordionData: data.accordion,
            multiple: false
        }
    },
    methods: {
        onSingle() {
            this.multiple = false
        },

        onMuliple() {
            this.multiple = true
        }
    }
}
</script>

<style lang="scss" scoped>
.utils {
    display: flex;
    flex-wrap: wrap;

    &__col {
        flex: span(6);
        max-width: span(6);
    }

    .accordion-style {
        border: 2px transparent solid;

        &.selected {
            border: 2px $black solid;
        }
    }

}
</style>
