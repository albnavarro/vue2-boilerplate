<template>
    <div class="parallax-default">
        <div>
            <div class="parallax-default__item">
                <ParallaxClassic
                    :range = "9"
                    breackpointType="min"
                    breackpoint="x-small"
                    propierties = "horizontal"
                    align="start" >
                    <TestComponent/>
                </ParallaxClassic>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxClassic
                    propierties = "rotate"
                    breackpointType="min"
                    breackpoint="x-small"
                    align="start"
                    ease="smooth">
                    <TestComponent/>
                </ParallaxClassic>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxClassic
                    :reverse="true"
                    propierties = "rotate"
                    align="start">
                    <TestComponent/>
                </ParallaxClassic>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Context3D :depth="400">
                    <ParallaxClassic
                        :reverse="true"
                        :range = "6"
                        ease="smooth"
                        propierties = "rotateY"
                        align="center">
                        <ParallaxClassic
                            :range = "4"
                            ease="smooth"
                            propierties = "rotateZ"
                            align="center">
                            <TestComponent color="#000"/>
                        </ParallaxClassic>
                    </ParallaxClassic>
                </Context3D>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Context3D :depth="400">
                    <ParallaxClassic
                        :reverse="true"
                        :range = "6"
                        propierties = "rotateX"
                        align="top">
                        <TestComponent/>
                    </ParallaxClassic>
                </Context3D>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxClassic
                    :alignVh="40"
                    :range="9.2"
                    propierties = "scale"
                    onSwitch="back">
                    <TestComponent/>
                </ParallaxClassic>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxOpacity
                    :startPoint="80"
                    :endPoint="30"
                    :reverse = "false"
                    onSwitch="back">
                    <TestComponent/>
                </ParallaxOpacity>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxOpacity>
                    <TestComponent/>
                </ParallaxOpacity>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <div class="dummy-item" ref="dummy"/>
                <div class="dummy-item dummy-item-2" ref="dummy2"/>
                <ParallaxStrict
                    :range = "50"
                    :shiftOffset = "20"
                    :parentRef = "dummy"
                    propierties = "horizontal">
                    <ParallaxStrict
                        :range = "50"
                        :shiftOffset = "20"
                        :parentRef = "dummy2"
                        :reverse = "true"
                        propierties = "horizontal">
                        <TestComponent/>
                    </ParallaxStrict>
                </ParallaxStrict>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxStrict
                    :range = "90"
                    :shiftOffset = "40"
                    :inward = "true"
                    propierties = "rotate">
                    <TestComponent/>
                </ParallaxStrict>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxOpacity
                    :startPoint="80"
                    :endPoint="20">
                    <TestComponent/>
                </ParallaxOpacity>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <ParallaxClassic
                    :range="9.3"
                    :jsDelta="9"
                    :reverse="true"
                    align="end"
                    ease="smooth"
                    smoothType="js">
                    <TestComponent/>
                </ParallaxClassic>
            </div>
        </div>

    </div>
</template>

<script>

import Context3D from '@/components/ui/3D/Context3D.vue'
import ParallaxClassic from '@/components/ui/parallax/ParallaxClassic.vue'
import ParallaxOpacity from '@/components/ui/parallax/ParallaxOpacity.vue'
import ParallaxStrict from '@/components/ui/parallax/ParallaxStrict.vue'
import TestComponent from '@/components/TestComponent.vue'

export default {
    name: 'ParallaxExample',
    data() {
        return {
            dummy: null,
            dummy2: null
        }
    },
    components: {
        Context3D,
        ParallaxClassic,
        ParallaxOpacity,
        ParallaxStrict,
        TestComponent
    },
    mounted() {
        this.dummy = this.$refs.dummy,
        this.dummy2 = this.$refs.dummy2
    }
}
</script>

<style lang="scss" scoped>
    .parallax-default {
        text-align: center;
        overflow: hidden;

        &__item {
            margin-bottom: 40px;
            display: inline-block;
            position: relative;
        }
    }

    .dummy-item {
        width: 50vw;
        height: 50vh;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        border: 1px $grey solid;

        &-2 {
            top: 50vh;
            height: 30vh;
        }
    }
</style>
