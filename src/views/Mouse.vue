<template>
    <div class="container container--mouse">
        <div class="item">
            <!-- Avendo solo solt di default possiamo passare le props
            direttamente dal componente v-slot="{delta,limit}"
            Senza dover definire un template:
            <template v-slot:default="slotProps">
                <Move3DItem ....
            </template>

            ...
            Destructuring Slot Props
            v-slot:default="slotProps" -> v-slot="{delta,limit}"
            :delta="slotProps.delta" -> :delta="delta"
            :delta="slotProps.limit" -> :limit="limit"
            -->
            <Move3D
                :xDepth="20"
                :yDepth="20"
                :xLimit="50"
                v-slot="{delta,limit}">
                <Move3DItem
                    :depth="0"
                    :isContainer="true"
                    :delta="delta"
                    :limit="limit">
                    <TestComponent
                        :width="300"
                        :height="300"/>
                </Move3DItem>
                <Move3DItem
                    :depth="500"
                    :x="20"
                    :y="80"
                    :delta="delta"
                    :limit="limit">
                    <TestComponent
                        :width="100"
                        :height="100"
                        color="#000"/>
                </Move3DItem>
                <Move3DItem
                    :depth="200"
                    :x="40"
                    :y="50"
                    :delta="delta"
                    :limit="limit">
                    <TestComponent
                        :width="100"
                        :height="100"
                        color="#eee"/>
                </Move3DItem>
                <Move3DItem
                    :depth="250"
                    :x="-40"
                    :y="-10"
                    :delta="delta"
                    :limit="limit">
                    <TestComponent
                        :width="150"
                        :height="150"
                        color="#999"/>
                </Move3DItem>
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
