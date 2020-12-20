<template>
    <div class="animation">
        <div class="animation__item">
            <AnimationOnScroll>
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll type="fromleft">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll :once="false">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item" ref="ref1">
            <AnimationOnScroll type="fromleft" :once="false">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item">
            <AnimationOnScroll :once="false">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
        <div class="animation__item animation__item--fixed">
            <AnimationOnScroll :parentRef="ref1" :once="false">
                <TestComponent/>
            </AnimationOnScroll>
        </div>
    </div>
</template>

<script>

import AnimationOnScroll from '@/components/ui/animationOnScroll/AnimationOnScroll.vue'
import TestComponent from '@/components/TestComponent.vue'

export default {
    name: 'Animation',
    data() {
        return {
            ref1 : null
        }
    },
    components: {
        AnimationOnScroll,
        TestComponent
    },
    mounted() {
        this.ref1 = this.$refs.ref1
    }
}
</script>

<style lang="scss" scoped>
    .animation {
        margin-top: 200px;
        overflow: hidden;

        &__item {
            margin-bottom: 100px;

            &--fixed {
                position: fixed;
                top: 200px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

    }
</style>
