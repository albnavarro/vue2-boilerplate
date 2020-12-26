<template>
    <div class="shpere" :style="[setSize,style,setContainer,setX,setY]" ref="item">
        <div class="wire wire--1" :style="[getBorderColor,getColor]"></div>
        <div class="wire wire--2" :style="[getBorderColor,getColor]"></div>
        <div class="wire wire--3" :style="[getBorderColor,getColor]"></div>
        <div class="wire wire--4" :style="[getBorderColor,getColor]"></div>
        <!-- <div class="face" v-for="(item, index) in rings" :key="index" :data-id="index"
            :style="[{'transform': `translate(-50%, -50%)  translateZ(${(((size/2)/rings) * (index + 1))}px)`,
            'height': `50px`,
            'width':  `50px`},
            getBorderColor,getColor]">
        </div> -->
        <div class="face face--1" :style="[getBorderColor,getColor]"></div>
        <div class="face face--2" :style="[getDepth25back,getBorderColor,getColor]"></div>
        <div class="face face--3" :style="[getDepth50back,getBorderColor,getColor]"></div>
        <div class="face face--4" :style="[getDepth80back,getBorderColor,getColor]"></div>
        <div class="face face--5" :style="[getDepth100back,getBorderColor,getColor]"></div>
        <div class="face face--2" :style="[getDepth25,getBorderColor,getColor]"></div>
        <div class="face face--3" :style="[getDepth50,getBorderColor,getColor]"></div>
        <div class="face face--4" :style="[getDepth80,getBorderColor,getColor]"></div>
        <div class="face face--5" :style="[getDepth100,getBorderColor,getColor]"></div>
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
        // rings: {
        //     type: Number,
        //     default: 5
        // },
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
        },
        getDepth25back() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(-${this.size/6}px)`
            }
        },
        getDepth50back() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(-${this.size/3.5}px)`
            }
        },
        getDepth80back() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(-${this.size/2.5}px)`
            }
        },
        getDepth100back() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(-${this.size/2.1}px)`
            }
        },
        getDepth25() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(${this.size/6}px)`
            }
        },
        getDepth50() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(${this.size/3.5}px)`
            }
        },
        getDepth80() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(${this.size/2.5}px)`
            }
        },
        getDepth100() {
            return {
                'transform': `translate(-50%, -50%)  translateZ(${this.size/2.1}px)`
            }
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

    &--2 {
        width: 95%;
        height: 95%;
    }

    &--3 {
        width: 80%;
        height: 80%;
    }

    &--4 {
        width: 60%;
        height: 60%;
    }

    &--5 {
        width: 25%;
        height: 25%;
    }
}


</style>
