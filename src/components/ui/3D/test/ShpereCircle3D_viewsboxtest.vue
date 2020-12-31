<template>
    <svg :width="getSize" :heigth="getSize" :viewbox="'0 0 ' + size  + ' ' + size" class="item" :style="setStyle">

        <filter v-if="distorsion" :id="'distortion' + random">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"/>
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="10" xChannelSelector="R" yChannelSelector="G"/>
        </filter>

        <circle cx="50%" cy="50%" :r="getSize/2"
            :filter="distorsion ? 'url(#distortion' + random +')' : null"
            :stroke-dasharray="strokeDasharray"
            :fill="fill"
            :stroke="stroke"/>

    </svg>
</template>


<script>
export default {
    name: 'ShpereCircle3D',
    data() {
        return {
            random: Math.floor(Math.random() * 1000)
        }
    },
    props: {
        isWire: {
            type: Boolean,
            default: false
        },
        size: {
            type: Number,
            default: 100
        },
        rings: {
            type: Number,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        zNegative: {
            type: Boolean,
            default: false
        },
        fill: {
            type: String,
            default: 'transparent'
        },
        stroke: {
            type: String,
            default: '#000'
        },
        strokeDasharray: {
            type: Number,
            default: 0
        },
        distorsion: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        getSize() {
            const vm = this
            let index = 0;
            (vm.index < vm.rings/2) ? index = vm.rings - vm.index : index = vm.index
            index = index - (vm.rings - index)

            let val = 0
            if(vm.isWire) {
                val = this.size
            } else {
                val = Math.sqrt(Math.pow(((vm.size/2)), 2) - Math.pow(((((vm.size/2)/vm.rings) * (index))), 2)) * 2
            }

            return Math.floor(val)

        },
        setStyle() {
            const vm = this
            if(vm.isWire) {
                return {
                    'transform': `rotateX(90deg) rotateY(${((180)/((vm.rings)) * (vm.index))}deg)`
                }
            } else {
                return {
                    'transform': `translateZ(${(((vm.size)/vm.rings) * (vm.index)) - vm.size/2}px)`
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .item {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
</style>
