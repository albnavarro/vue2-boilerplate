<template>
    <div class="testBrowser">
        <h1>
            {{ title }}
        </h1>
        <p>
            window width: {{ getWidth }}
        </p>
        <p>
            window height: {{ getHeight }}
        </p>
        <p>
            documentHeight: {{ getDocumentHeight }}
        </p>
        <p>
            scroll: {{ getScroll }}
        </p>
        <p>
            throttleScroll: {{ getThrottleScroll }}
        </p>
        <p>
            scrollDirection: {{ getScrollDirection }}
        </p>
        <p>
            scrollStart: {{ getScrollStart }}
        </p>
        <p>
            scrollEnd: {{ getScrollEnd }}
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

export default {
    name: 'TestBrowser',
    data() {
        return {
            title: myData.testBrowser.title
        }
    },
    computed: {
        getWidth() {
            return this.$store.state.browser.width;
        },
        getHeight() {
            return this.$store.state.browser.height;
        },
        getDocumentHeight() {
            return this.$store.state.browser.documentHeight;
        },
        getScroll() {
            return this.$store.state.browser.scroll;
        },
        getThrottleScroll() {
            return this.$store.state.browser.scrollThrottle;
        },
        getScrollDirection() {
            return this.$store.state.browser.scrollDirection;
        },
        getScrollStart() {
            return this.$store.state.browser.scrollStart;
        },
        getScrollEnd() {
            return this.$store.state.browser.scrollEnd;
        }
    }
}
</script>


<style scoped>

</style>
