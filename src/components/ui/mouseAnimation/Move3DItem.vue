<template>
<div class="move3D__item" :style="getDepth">
    <slot></slot>
</div>
</template>

<script>


export default {
    name: 'Move3DItem',
    props: {
        depth: {
            type: Number,
            default: 100
        }
    },
    computed: {
        getDepth() {
            return {
                'transform': `translateZ(${this.depth}px)`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.move3D {
    &__item {
        position: relative;
    }
}
</style>
