<template>
    <div class="fixed container">
        <div class="fixed__container">
            <div class="fixed__content container">
                <ParallaxStrict
                    :range = "50"
                    :parentRef = "ref1"
                    :reverse = "true"
                    :inward = "true"
                    :renderAlways = "true">
                    <ParallaxStrict
                        :range = "50"
                        :responsive = "true"
                        :parentRef = "ref2"
                        propierties = "horizontal"
                        :renderAlways = "true">
                        <ParallaxStrict
                            propierties = "horizontal"
                            :range = "50"
                            :responsive = "true"
                            :parentRef = "ref3"
                            :reverse = "true"
                            :renderAlways = "true">
                            <ParallaxStrict
                                propierties = "scale"
                                :range = "100"
                                :parentRef = "ref4"
                                :renderAlways = "true">
                                <ParallaxStrict
                                    ease="smooth"
                                    propierties = "rotate"
                                    :range = "90"
                                    :parentRef = "ref5"
                                    :renderAlways = "true">
                                    <ParallaxStrict
                                        propierties = "border-width"
                                        :range = "90"
                                        :parentRef = "ref5"
                                        :targetRef = "target"
                                        :disableEnd = "true"
                                        :renderAlways = "true">
                                        <ParallaxStrict
                                            propierties = "border-width"
                                            :range = "90"
                                            :static = "true"
                                            :parentRef = "ref6"
                                            :targetRef = "target"
                                            :disableEnd = "true"
                                            :disableStart = "true"
                                            :renderAlways = "true">
                                            <ParallaxStrict
                                                propierties = "border-width"
                                                :range = "90"
                                                :disableStart = "true"
                                                :inward = "true"
                                                :renderAlways = "true"
                                                :parentRef = "ref7"
                                                :delay = "1"
                                                :targetRef = "target">
                                                <div class="target-container" ref="target"/>
                                            </ParallaxStrict>
                                        </ParallaxStrict>
                                    </ParallaxStrict>
                                </ParallaxStrict>
                            </ParallaxStrict>
                        </ParallaxStrict>
                    </ParallaxStrict>
                </ParallaxStrict>
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

import ParallaxStrict from '@/components/ui/parallax/ParallaxStrict.vue'

export default {
    name: 'ParallaxTimeline',
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
        ParallaxStrict
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
