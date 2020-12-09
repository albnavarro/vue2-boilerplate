<template>
    <div class="animation">
        <div class="animation__item">
            <AnimationOnScroll>
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll
                hiddenClass = "fromleft"
                activeClass = "fromleft--visible">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll
                :once = "false">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll
                hiddenClass = "fromleft"
                activeClass = "fromleft--visible"
                :once = "false">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll>
                <TestComponent/>
            </AnimationOnScroll>
        </div>
    </div>
</template>

<script>

import AnimationOnScroll from '@/components/ui/AnimationOnScroll.vue'
import TestComponent from '@/components/TestComponent.vue'

export default {
    name: 'Animation',
    components: {
        AnimationOnScroll,
        TestComponent
    }
}
</script>

<style lang="scss" scoped>
    .animation {
        margin-top: 500px;
        overflow: hidden;

        &__item {
            margin-bottom: 100px;
        }
    }
</style>
