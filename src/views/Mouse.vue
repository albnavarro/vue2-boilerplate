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
                            <Sphere3D
                                class="test-sphere"
                                stroke="#fff"
                                :diameter="120"
                                :rings="5"/>
                        </Move3DItem>
                    </Move3D>
                </Context3D>
            </div>
        </div>
        <div class="container container--mouse cursor-move">
            <div class="item">
                <Context3D>
                    <Move3D
                        :xDepth="20"
                        :yDepth="20"
                        :xLimit="90"
                        :drag="true"
                        v-slot="{delta,limit,drag}">
                        <Move3DItem
                            :isContainer="true"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                            <Sphere3D
                                fill="#ff0"
                                stroke="#FF7400"
                                :diameter="500"
                                :rings="8"
                                :diagonal="4"
                                :strokeDasharray="5">
                            </Sphere3D>
                        </Move3DItem>
                        <Move3DItem
                            :x="-60"
                            :y="20"
                            :depth="340"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                            <Sphere3D
                                fill="#fff"
                                stroke="#949cdf"
                                :diameter="280">
                            </Sphere3D>
                        </Move3DItem>
                        <Move3DItem
                            :x="95"
                            :y="25"
                            :depth="240"
                            :delta="delta"
                            :limit="limit"
                            :drag="drag">
                            <Sphere3D
                                fill="#fff"
                                :diameter="220">
                            </Sphere3D>
                        </Move3DItem>
                    </Move3D>
                </Context3D>
            </div>
        </div>
        <div class="container container--mouse">
            <Context3D>
                <Sphere3D
                    class="sfere-static"
                    fill="#fff"
                    :diameter="500"
                    :rings="5"
                    filterId="distort"
                    :diagonal="2">
                    <template slot="filter">
                        <filter id="distort">
                            <feTurbulence type="turbulence" baseFrequency="0.15" numOctaves="10" result="fractalNoise"/>
                            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/>
                        </filter>
                    </template>
                </Sphere3D>
            </Context3D>
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

.cursor-move {
    cursor: move;
}

.item {
    margin: 200px 0;
}

.test-sphere {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3D(-50%, -50%, -10px);
}

.sfere-static {
    margin-bottom: 200px;
    transform: rotate3d(1, 1, 1, 45deg);
}
</style>
