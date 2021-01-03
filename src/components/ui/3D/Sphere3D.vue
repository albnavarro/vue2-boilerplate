<template>
    <div class="shpere" ref="item" :style="setdiameter">

        <ShpereCircle3D
            v-for="(item, i) in diagonal"
            :key="'diagonalFront' + i"
            :diameter = "diameter"
            :isDiagonal = "true"
            :rings = "diagonal"
            :index = "i"
            :fill = "getfill"
            :strokeWidth="strokeWidth"
            :strokeDasharray = "strokeDasharray"
            :filterId="filterId"
            :stroke="stroke">

            <!-- use filter slot once, id is univoque -->
            <template v-if="i == 0" slot="filter">
              <slot name="filter"></slot>
            </template>
        </ShpereCircle3D>

        <ShpereCircle3D
            v-for="(item, i) in rings"
            :key="'front' + i"
            :diameter = "diameter"
            :rings = "rings"
            :index = "i"
            :strokeDasharray = "strokeDasharray"
            :fill = "getfill"
            :strokeWidth="strokeWidth"
            :filterId="filterId"
            :stroke="stroke">

            <!-- use filter slot once, id is univoque -->
            <template v-if="i == 0" slot="filter">
              <slot name="filter"></slot>
            </template>
        </ShpereCircle3D>

    </div>
</template>

<script>
import ShpereCircle3D from '@/components/ui/3D/ShpereCircle3D.vue'

export default {
    name: 'Sphere3D',
    components: {
        ShpereCircle3D
    },
    props: {
        diameter: {
            type: Number,
            default: 200
        },
        rings: {
            type: Number,
            default: 5
        },
        diagonal: {
            type: Number,
            default: 4
        },
        stroke: {
            type: String,
            default: '#000',
        },
        strokeWidth: {
            type: String,
            default: '1'
        },
        fill: {
            type: String,
            default: null,
        },
        opacity: {
            type: Number,
            default: .5
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
        setdiameter() {
            return {
                'width': `${this.diameter + 50}px`,
                'height': `${this.diameter + 50}px`
            }
        },
        getfill() {
            const rgba = this.hexToRGBA(this.fill)
            return rgba
        },
        getdiagonalColor() {
            const rgba = this.hexToRGBA(this.diagonalColor)
            return rgba
        }
    },
    methods: {
        hexToRGBA(h) {
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

          return "rgba("+ +r + "," + +g + "," + +b + ", " + this.opacity + ")";
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

</style>
