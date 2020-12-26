<template>
    <div class="shpere" :style="[setSize,style,setContainer,setX,setY]" ref="item">
        <div class="wire wire--1" :style="[getBorderColor,getColor]"></div>
        <div class="wire wire--2" :style="[getBorderColor,getColor]"></div>
        <div class="wire wire--3" :style="[getBorderColor,getColor]"></div>
        <div class="wire wire--4" :style="[getBorderColor,getColor]"></div>

        <!-- back -->
        <div class="face" v-for="(item, i) in rings" :key="'back' + i"
            :style="[{'transform': `translate(-50%, -50%)  translateZ(${-(((size/2)/rings) * (i + 1))}px)`,
            'height': `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`,
            'width':  `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`},
            getBorderColor,getColor]">
        </div>

        <!-- middle -->
        <div class="face face--1" :style="[getBorderColor,getColor]"/>

        <!-- front -->
        <div class="face" v-for="(item, i) in rings" :key="'front' + i"
            :style="[{'transform': `translate(-50%, -50%)  translateZ(${(((size/2)/rings) * (i + 1))}px)`,
            'height': `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`,
            'width':  `${ Math.sqrt(Math.pow(((size/2)), 2) - Math.pow(((((size/2)/rings) * (i + 1))), 2)) * 2}px`},
            getBorderColor,getColor]">
        </div>
    </div>
</template>

<script>
import { item3DMixin } from '@/mixin/item3D.js'

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
        edgeColor: {
            type: String,
            default: '#000',
        },
        color: {
            type: String,
            default: '#fff',
        }
    },
    computed: {
        setSize() {
            return {
                'width': `${this.size}px`,
                'height': `${this.size}px`
            }
        },
        getBorderColor() {
            return {'border-color': this.edgeColor}
        },
        getColor() {
            const rgba = this.hexToRGBA(this.color)
            console.log(rgba)
            return {'background-color': `${rgba}`}
        }
    },
    methods: {
        hexToRGBA(h) {
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
}

.wire {
    border: 1px $black solid;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    border-radius: 100%;


    &--1 {
        transform: translate(-50%, -50%) rotateX(90deg);
    }

    &--2 {
        transform: translate(-50%, -50%) rotateX(90deg) rotateY(135deg)
    }

    &--3 {
        transform: translate(-50%, -50%) rotateX(-90deg) rotateY(135deg)
    }

    &--4 {
        transform: translate(-50%, -50%) rotateY(90deg);
    }
}

.face {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px $black solid;
    border-radius: 100%;
    transform-style: preserve-3d;

    &--1 {
        width: 100%;
        height: 100%;
        transform: translate(-50%, -50%) translateZ(0);
    }
}


</style>
