<template>
    <div class="container container--mouse">
        <div class="item">
            <Move3D :xDelta="10" :yDelta="10">
                <TestComponent :width="300" :height="300">
                    <Move3DItem :depth="200">
                        <TestComponent :width="100" :height="100" color="#666"/>
                    </Move3DItem>
                    <Move3DItem :depth="100">
                        <TestComponent :width="100" :height="100" color="#eee"/>
                    </Move3DItem>
                    <Move3DItem :depth="150">
                        <TestComponent :width="150" :height="150" color="#999"/>
                    </Move3DItem>
                </TestComponent>
            </Move3D>
        </div>
    </div>
</template>

<script>


import Move3D from '@/components/ui/mouseAnimation/Move3D.vue'
import Move3DItem from '@/components/ui/mouseAnimation/Move3DItem.vue'
import TestComponent from '@/components/TestComponent.vue'

export default {
    name: 'Mouse',
    components: {
        Move3D,
        Move3DItem,
        TestComponent
    }
}
</script>

<style lang="scss" scoped>
.container--mouse {
    display: flex;
    justify-content: center;
}

.item {
    margin: 200px 0;
}
</style>
