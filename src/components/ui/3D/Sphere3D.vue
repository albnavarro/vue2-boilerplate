<template>
    <div class="shpere" :style="[setSize,style,setContainer,setX,setY]" ref="item">

        <ShpereCircle3D
            v-for="(item, i) in wire"
            :key="'wireFront' + i"
            :size = "size"
            :isWire = "true"
            :rings = "wire"
            :index = "i"
            :fill = "wireFill ? getfill : 'transparent'"
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
            :size = "size"
            :rings = "rings"
            :index = "i"
            :strokeDasharray = "strokeDasharray"
            :fill = "getfill"
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
import { item3DMixin } from '@/components/ui/3D/mixin/item3DMixin.js'
import ShpereCircle3D from '@/components/ui/3D/ShpereCircle3D.vue'

export default {
    name: 'Sphere3D',
    mixins: [item3DMixin],
    components: {
        ShpereCircle3D
    },
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
        stroke: {
            type: String,
            default: '#000',
        },
        fill: {
            type: String,
            default: null,
        },
        wireFill: {
            type: Boolean,
            default: true
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
        setSize() {
            return {
                'width': `${this.size + 50}px`,
                'height': `${this.size + 50}px`
            }
        },
        getfill() {
            const rgba = this.hexToRGBA(this.fill)
            return rgba
        },
        getWireColor() {
            const rgba = this.hexToRGBA(this.wireColor)
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

</style>
