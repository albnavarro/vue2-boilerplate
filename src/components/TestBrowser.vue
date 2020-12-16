<template>
    <div class="testBrowser">
        <h1>
            {{ title }}
        </h1>
        <p>
            window width: {{ width }}
        </p>
        <p>
            window height: {{ height }}
        </p>
        <p>
            documentHeight: {{ documentHeight }}
        </p>
        <p>
            scroll: {{ scroll }}
        </p>
        <p>
            throttleScroll: {{ scrollThrottle }}
        </p>
        <p>
            scrollDirection: {{ scrollDirection }}
        </p>
        <p>
            scrollStart: {{ scrollStart }}
        </p>
        <p>
            scrollEnd: {{ scrollEnd }}
        </p>
        <p>
            check desktop: {{ breackpoint }}
        </p>
        <svg v-svg
            symbol="arrowup"
            size="0 0 24 24"
            role="presentation"
            class="icon--inline" >
        </svg>
    </div>
</template>

<script>
import myData from '@/locales/data.json'
import { mq } from '@/utils/mq.js'
import WindowInstanceMap from '@/WindowInstanceMap.js'

export default {
    name: 'TestBrowser',
    data() {
        return {
            title: myData.testBrowser.title,
            breackpoint: ''
        }
    },
    computed: {
        height() {
            return WindowInstanceMap.height
        },
        width() {
            return WindowInstanceMap.width
        },
        documentHeight() {
            return WindowInstanceMap.documentHeight
        },
        scroll() {
            return WindowInstanceMap.scroll
        },
        scrollThrottle() {
            return WindowInstanceMap.scrollThrottle
        },
        scrollDirection() {
            return WindowInstanceMap.scrollDirection
        },
        scrollStart() {
            return WindowInstanceMap.scrollStart
        },
        scrollEnd() {
            return WindowInstanceMap.scrollEnd
        }
    },
    watch: {
        width() {
            this.checkBreakPoint();
        }
    },
    methods: {
        checkBreakPoint() {
            mq.min('desktop') ? this.breackpoint = 'desktop' : this.breackpoint = 'mobile'
        }
    },
    mounted() {
        this.checkBreakPoint();
    }

}
</script>


<style lang="scss" scoped>
    .testBrowser {
        text-align: center;
        height: 2000px;
    }
</style>
