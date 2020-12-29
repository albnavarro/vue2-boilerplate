<template>
    <div class="shpere" :style="[setSize,style,setContainer,setX,setY]" ref="item">

        <div class="wire" v-for="(item, i) in wire" :key="'wireFront' + i">
            <svg height="100%" width="100%" preserveAspectRatio="xMinYMin meet"
                :style="[{'transform': `translate(-50%, -50%)  rotateX(90deg) rotateY(${((180)/((wire)) * (i + 1))}deg)`}]">
                <circle cx="50%" cy="50%" r="49%"
                    fill="transparent"
                    :stroke="edgeColor"/>
            </svg>
        </div>

        <!-- back -->
        <div class="face" v-for="(item, i) in rings" :key="'back' + i">
            <svg preserveAspectRatio="xMinYMin meet"
                :style="[{'transform': `translate(-50%, -50%)  translateZ(${-(((size/2)/rings) * (i + 1))}px)`,
                'height': `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`,
                'width':  `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`},
                ]">
                <circle cx="50%" cy="50%" r="49%"
                    :fill="getRingColor"
                    :stroke="edgeColor"/>
            </svg>
        </div>

        <!-- middle -->
        <div class="face face--1" v-if="rings > 0">
            <svg height="100%" width="100%" preserveAspectRatio="xMinYMin meet">
                <circle cx="50%" cy="50%" r="49%"
                    :fill="getRingColor"
                    :stroke="edgeColor"/>
            </svg>
        </div>

        <!-- front -->
        <div class="face" v-for="(item, i) in rings" :key="'front' + i">
            <svg preserveAspectRatio="xMinYMin meet"
                :style="[{'transform': `translate(-50%, -50%)  translateZ(${(((size/2)/rings) * (i + 1))}px)`,
                'height': `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`,
                'width':  `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`},
                ]">
                <circle cx="50%" cy="50%" r="49%"
                    :fill="getRingColor"
                    :stroke="edgeColor"/>
            </svg>
        </div>
    </div>
</template>

<script>
import { item3DMixin } from '@/mixin/item3DMixin.js'

export default {
    name: 'Sphere3D',
    mixins: [item3DMixin],
    props: {
        size: {
            type: Number,
            default: 200
        },
        rings: {
            type: Number,
            default: 5
        },
        wire: {
            type: Number,
            default: 4
        },
        edgeColor: {
            type: String,
            default: '#000',
        },
        ringColor: {
            type: String,
            default: null,
        }
    },
    computed: {
        setSize() {
            return {
                'width': `${this.size}px`,
                'height': `${this.size}px`
            }
        },
        getRingColor() {
            const rgba = this.hexToRGBA(this.ringColor)
            return rgba
        },
        getWireColor() {
            const rgba = this.hexToRGBA(this.wireColor)
            return rgba
        }
    },
    methods: {
        hexToRGBA(h) {
          console.log(h)
          if(h == null) return "rgba(255, 255, 255, 0)";

          let r = 0, g = 0, b = 0;

          // 3 digits
          if (h.length == 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3];

          // 6 digits
          } else if (h.length == 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
          }

          return "rgba("+ +r + "," + +g + "," + +b + ", .5)";
        }
    }
}
</script>


<style lang="scss" scoped>
.shpere {
    position: relative;
    top: -1px;
    left: -1px;
    transform-style: preserve-3d;
    transform: rotateY(-180deg) rotateX(180deg);
    user-select: none;
}

.wire {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    user-select: none;
}

.face {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    user-select: none;

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &--1 {
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%) translateZ(0);
    }
}


</style>
