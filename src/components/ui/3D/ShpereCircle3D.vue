<template>
    <svg :width="size" :heigth="size" :viewbox="'0 0 ' + size * 2  + ' ' + size * 2" class="item" :style="setStyle">

        <slot name="filter"></slot>

        <circle cx="50%" cy="50%" :r="getSize/2"
            :filter="filterId ? 'url(#' + filterId +')' : null"
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
        filterId: {
            type: String,
            default: null
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
                val = Math.sqrt(Math.pow(((vm.size/2)), 2) - Math.pow((((vm.size/2)/vm.rings) * (index)), 2)) * 2
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
