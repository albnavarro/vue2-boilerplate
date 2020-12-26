<template>
<div class="move3D__item" :style="[style,setContainer,setX,setY]">
    <slot></slot>
</div>
</template>

<script>
import { item3DMixin } from '@/mixin/item3D.js'

export default {
    name: 'Move3DItem',
    mixins: [item3DMixin]
}
</script>

<style lang="scss" scoped>
.move3D {
    &__item {
        position: relative;
    }
}
</style>
