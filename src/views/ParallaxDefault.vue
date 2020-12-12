<template>
    <div class="parallax-default">
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties = "horizontal"
                    :distanceValue="9"
                    align="start" >
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties = "rotate"
                    queryType="min"
                    breackpoint="x-small"
                    align="start"
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
                    align="start"
                    :reverse="true">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    propierties = "scale"
                    align="center"
                    :distanceValue="9"
                    oneDirection="toBack">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    align="center"
                    propierties="opacity"
                    :opacityStart="80"
                    :opacityEnd="20"
                    oneDirection="toStop">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
        <div>
            <div class="parallax-default__item">
                <Parallax
                    align="center"
                    :distanceValue="9"
                    :jsVelocityValue="8"
                    :reverse="true"
                    oneDirection="toStop"
                    ease="smooth">
                    <TestComponent/>
                </Parallax>
            </div>
        </div>
    </div>
</template>

<script>

import Parallax from '@/components/ui/Parallax.vue'
import TestComponent from '@/components/TestComponent.vue'

export default {
    name: 'ParallaxDefault',
    components: {
        Parallax,
        TestComponent
    }
}
</script>

<style lang="scss" scoped>
    .parallax-default {
        min-height: 2000px;
        text-align: center;

        &__item {
            margin-bottom: 40px;
            display: inline-block;
        }
    }

    .dummy-item {
        transform-origin: center center;
    }
</style>
