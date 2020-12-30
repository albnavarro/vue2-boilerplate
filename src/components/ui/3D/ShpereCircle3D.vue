<template>
    <svg height="100%" width="100%" class="item" preserveAspectRatio="xMinYMin meet"
        :style="setStyle">
        <circle cx="50%" cy="50%" r="49%"
            :fill="fill"
            :stroke="stroke"/>
    </svg>
</template>


<script>
export default {
    name: 'ShpereCircle3D',
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
            default: '#fff'
        },
        stroke: {
            type: String,
            default: '#000'
        }
    },
    computed: {
        setStyle() {
            const vm = this
            if(vm.isWire) {
                return {
                    'transform': `translate(-50%, -50%)  rotateX(90deg) rotateY(${((180)/((vm.rings)) * (vm.index))}deg)`
                }
            } else {
                const invert = (this.zNegative) ? -1 : 1
                return {
                    'transform': `translate(-50%, -50%)  translateZ(${(((vm.size/2)/vm.rings) * (vm.index)) * invert}px)`,
                    'height': `${ Math.sqrt(Math.pow(((vm.size/2)), 2) - Math.pow(((((vm.size/2)/vm.rings) * (vm.index))), 2)) * 2}px`,
                    'width':  `${ Math.sqrt(Math.pow(((vm.size/2)), 2) - Math.pow(((((vm.size/2)/vm.rings) * (vm.index))), 2)) * 2}px`
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
