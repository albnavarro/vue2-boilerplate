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
import { mapState } from 'vuex'
import myData from '@/locales/data.json'
import { mq } from '@/utils/mq.js'

export default {
    name: 'TestBrowser',
    data() {
        return {
            title: myData.testBrowser.title,
            breackpoint: ''
        }
    },
    computed: {
        ...mapState('browser', {
            height: 'height',
            width: 'width',
            documentHeight: 'documentHeight',
            scroll: 'scroll',
            scrollThrottle: 'scrollThrottle',
            scrollDirection: 'scrollDirection',
            scrollStart: 'scrollStart',
            scrollEnd: 'scrollEnd'
        }),
    },
    watch: {
        getWidth() {
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
