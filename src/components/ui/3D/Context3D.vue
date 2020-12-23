<template>
    <div class="context3D" :style="setDeth">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'Context3D',
    props: {
        depth: {
            type: Number,
            default: 1000
        }
    },
    computed: {
        setDeth() {
            return {'perspective' : `${this.depth}px`}
        }
    }
}
</script>


<style lang="scss" scoped>

.context3D {
    transform-style: preserve-3d;

    * {
        transform-style: inherit;
    }
}

</style>
