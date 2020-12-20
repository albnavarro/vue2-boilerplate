<template>
    <div class="test-component" :style="style">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'TestComponent',
    data() {
        return {
            style: {}
        }
    },
    props: {
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        color: {
            type: String,
            default: '#ccc',
        }
    },
    watch: {
        width() {
            this.setSize()
        },
        height() {
            this.setSize()
        },
        color() {
            this.setSize()
        }
    },
    methods: {
        setSize() {
            this.style = {
                'width': `${this.width}px`,
                'height': `${this.height}px`,
                'background-color': this.color
            }
        }
    },
    mounted() {
        this.setSize()
    }
}

</script>

<style lang="scss" scoped>

</style>
