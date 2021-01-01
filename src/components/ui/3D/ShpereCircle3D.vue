<template>
    <svg :width="diameter" :heigth="diameter" :viewbox="'0 0 ' + diameter * 2  + ' ' + diameter * 2" class="item" :style="setStyle">

        <slot name="filter"></slot>

        <circle cx="50%" cy="50%" :r="getdiameter/2"
            :filter="filterId ? 'url(#' + filterId +')' : null"
            :stroke-dasharray="strokeDasharray"
            :fill="fill"
            :stroke-width="strokeWidth"
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
        isDiagonal: {
            type: Boolean,
            default: false
        },
        diameter: {
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
        strokeWidth: {
            type: String,
            default: '1'
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
        getdiameter() {
            const vm = this
            let index = 0;
            (vm.index < vm.rings/2) ? index = vm.rings - vm.index : index = vm.index
            index = index - (vm.rings - index)

            let val = 0
            if(vm.isDiagonal) {
                val = this.diameter
            } else {
                val = Math.sqrt(Math.pow(((vm.diameter/2)), 2) - Math.pow((((vm.diameter/2)/vm.rings) * (index)), 2)) * 2
            }

            return Math.floor(val)

        },
        setStyle() {
            const vm = this
            if(vm.isDiagonal) {
                return {
                    'transform': `rotateX(90deg) rotateY(${((180)/((vm.rings)) * (vm.index))}deg)`
                }
            } else {
                return {
                    'transform': `translateZ(${(((vm.diameter)/vm.rings) * (vm.index)) - vm.diameter/2}px)`
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
