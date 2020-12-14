<template>
    <div class="fixed container">
        <div class="fixed__container">
            <div class="fixed__content container">
                <Parallax
                    computationType = "fixed"
                    :fixedDistance = "50"
                    :parentRef = "ref1"
                    :reverse = "true"
                    :fixedStartFromEnd = "true"
                    :renderAlways = "true">
                    <Parallax
                        computationType = "fixed"
                        :fixedDistance = "50"
                        :responsive = "true"
                        :parentRef = "ref2"
                        propierties = "horizontal"
                        :renderAlways = "true">
                        <Parallax
                            computationType = "fixed"
                            :fixedDistance = "50"
                            :responsive = "true"
                            :parentRef = "ref3"
                            :reverse = "true"
                            propierties = "horizontal"
                            :renderAlways = "true">
                            <Parallax
                                computationType = "fixed"
                                :fixedDistance = "100"
                                :parentRef = "ref4"
                                propierties = "scale"
                                :renderAlways = "true">
                                <Parallax
                                    computationType = "fixed"
                                    ease="smooth"
                                    :fixedDistance = "90"
                                    :parentRef = "ref5"
                                    propierties = "rotate"
                                    :renderAlways = "true">
                                    <Parallax
                                        computationType = "fixed"
                                        :fixedDistance = "90"
                                        :parentRef = "ref5"
                                        :targetRef = "target"
                                        :fixedStopAfterEnd = "true"
                                        propierties = "border-width"
                                        :renderAlways = "true">
                                        <Parallax
                                            computationType = "fixed"
                                            :fixedDistance = "90"
                                            :fixedDistanceImmutable = "true"
                                            :parentRef = "ref6"
                                            :targetRef = "target"
                                            :fixedStopAfterEnd = "true"
                                            :fixedStopBeforeStart = "true"
                                            propierties = "border-width"
                                            :renderAlways = "true">
                                            <Parallax
                                                computationType = "fixed"
                                                :fixedDistance = "90"
                                                :fixedStopBeforeStart = "true"
                                                :fixedStartFromEnd = "true"
                                                :renderAlways = "true"
                                                propierties = "border-width"
                                                :parentRef = "ref7"
                                                :delay = "1"
                                                :targetRef = "target">
                                                <div class="target-container" ref="target"/>
                                            </Parallax>
                                        </Parallax>
                                    </Parallax>
                                </Parallax>
                            </Parallax>
                        </Parallax>
                    </Parallax>
                </Parallax>
            </div>
            <div class="fixed__dummy fixed__dummy--1" ref="ref1"/>
            <div class="fixed__dummy fixed__dummy--2" ref="ref2"/>
            <div class="fixed__dummy fixed__dummy--3" ref="ref3"/>
            <div class="fixed__dummy fixed__dummy--4" ref="ref4"/>
            <div class="fixed__dummy fixed__dummy--5" ref="ref5"/>
            <div class="fixed__dummy fixed__dummy--6" ref="ref6"/>
            <div class="fixed__dummy fixed__dummy--7" ref="ref7"/>
        </div>
    </div>
</template>

<script>

import Parallax from '@/components/ui/parallax/Parallax.vue'

export default {
    name: 'ParallaxFixed',
    data() {
        return {
            ref1: null,
            ref2: null,
            ref3: null,
            ref4: null,
            ref5: null,
            ref6: null,
            ref7: null,
            target: null
        }
    },
    components: {
        Parallax
    },
    mounted() {
        const vm = this
        vm.ref1 = vm.$refs.ref1
        vm.ref2 = vm.$refs.ref2
        vm.ref3 = vm.$refs.ref3
        vm.ref4 = vm.$refs.ref4
        vm.ref5 = vm.$refs.ref5
        vm.ref6 = vm.$refs.ref6
        vm.ref7 = vm.$refs.ref7
        vm.target = vm.$refs.target
    }
}
</script>

<style lang="scss" scoped>
.fixed {
    &__content {
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%
    }

    &__dummy {
        height: 60vh;
        border: 1px $black solid;

        &--3 {
            height: 30vh;
        }

        &--3 {
            height: 20vh;
        }
    }

    .target-container {
        width: 200px;
        height: 200px;
        background-color: #ccc;
        border: 0 $black solid;
    }
}
</style>
