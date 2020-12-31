<template>
    <div>
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
                <Context3D>
                    <Move3D
                        :xDepth="20"
                        :yDepth="20"
                        :xLimit="30"
                        v-slot="{delta,limit,drag}">
                        <Move3DItem
                            :depth="0"
                            :isContainer="true"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                            <TestComponent
                                :width="300"
                                :height="300"/>
                        </Move3DItem>
                        <Move3DItem
                            :depth="500"
                            :x="20"
                            :y="80"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                            <h1>title</h1>
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
                            :limit="limit"
                            :drag="drag">
                            <TestComponent
                                :width="100"
                                :height="100"
                                color="#eee"/>
                            <p>Lorem ipsum</p>
                        </Move3DItem>
                        <Sphere3D
                            stroke="#fff"
                            :size="120"
                            :rings="5"
                            :wireFill="false"
                            :depth="240"
                            :animate="true"
                            :x="-35"
                            :y="-5"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                        </Sphere3D>
                        <Move3DItem
                            :depth="250"
                            :x="-40"
                            :y="-10"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                            <TestComponent
                                :width="150"
                                :height="150"
                                color="#999"/>
                        </Move3DItem>
                    </Move3D>
                </Context3D>
            </div>
        </div>
        <div class="container container--mouse">
            <div class="item">
                <Context3D>
                    <Move3D
                        :xDepth="20"
                        :yDepth="20"
                        :xLimit="90"
                        :drag="true"
                        v-slot="{delta,limit,drag}">
                        <Sphere3D
                            stroke="#ad8af3"
                            fill="#ff0"
                            :size="300"
                            :rings="8"
                            :wire="4"
                            :strokeDasharray="3"
                            :isContainer="true"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                        </Sphere3D>
                        <Sphere3D
                            fill="#fff"
                            :size="120"
                            :rings="5"
                            :depth="340"
                            :distorsion="true"
                            :animate="true"
                            :x="-50"
                            :y="30"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                        </Sphere3D>
                        <Sphere3D
                            fill="#fff"
                            :size="120"
                            :rings="5"
                            :depth="240"
                            :animate="true"
                            :x="-20"
                            :y="-30"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                        </Sphere3D>
                        <Sphere3D
                            stroke="#ad8af3"
                            fill="#BFCDE0"
                            :size="80"
                            :rings="5"
                            :depth="340"
                            :animate="true"
                            :x="110"
                            :y="30"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                        </Sphere3D>
                    </Move3D>
                </Context3D>
            </div>
        </div>
    </div>
</template>

<script>

import Context3D from '@/components/ui/3D/Context3D.vue'
import Move3D from '@/components/ui/3D/Move3D.vue'
import Move3DItem from '@/components/ui/3D/Move3DItem.vue'
import TestComponent from '@/components/TestComponent.vue'
import Sphere3D from '@/components/ui/3D/Sphere3D.vue'

export default {
    name: 'Mouse',
    components: {
        Context3D,
        Move3D,
        Move3DItem,
        Sphere3D,
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
