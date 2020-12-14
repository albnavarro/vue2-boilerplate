<template>
    <div class="parallax-default">
        <div>
            <div class="parallax-default__item">
                <Parallax
                    :defaultDistance = "3"
                    :responsive = "true"
                    breackpointType="min"
                    breackpoint="x-small"
                    responsiveBreackpoint = "infinite"
                    propierties = "horizontal"
                    defaultAlign="start" >
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties = "rotate"
                    breackpointType="min"
                    breackpoint="x-small"
                    defaultAlign="start"
                    ease="smooth"
                    smoothType="css">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties = "rotate"
                    defaultAlign="start"
                    :reverse="true">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties = "scale"
                    defaultAlign="40"
                    :defaultDistance="9.2"
                    defaultStopBack="toBack">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties="opacity"
                    :defaultOpacityStart="100"
                    :defaultOpacityEnd="50"
                    :reverse = "false"
                    defaultStopBack="toBack">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <div class="dummy-item" ref="dummy"/>
                <Parallax
                    computationType = "fixed"
                    propierties = "horizontal"
                    :fixedDistance = "50"
                    :fixedOffset = "40"
                    :parentRef = "dummy"
                    :reverse = "true"
                    :fixedStartFromEnd = "true">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    computationType = "fixed"
                    :fixedDistance = "90"
                    :fixedOffset = "40"
                    propierties = "rotate"
                    :fixedStartFromEnd = "true" >
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties="opacity"
                    :defaultOpacityStart="80"
                    :defaultOpacityEnd="20"
                    defaultStopBack="toStop">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    defaultAlign="end"
                    :defaultDistance="9.3"
                    :jsDelta="9"
                    :reverse="true"
                    ease="smooth">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>

    </div>
</template>

<script>

import Parallax from '@/components/ui/parallax/Parallax.vue'
import TestComponent from '@/components/TestComponent.vue'

export default {
    name: 'ParallaxDefault',
    data() {
        return {
            dummy: null
        }
    },
    components: {
        Parallax,
        TestComponent
    },
    mounted() {
        this.dummy = this.$refs.dummy
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
    }
</style>
