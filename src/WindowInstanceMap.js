import Vue from 'vue'
import throttle from '@/utils/throttle.js'
import debounce from '@/utils/debounce.js'
import {
    loadImages
} from '@/utils/loadImages.js'

const WindowInstanceMap = new Vue({
    data() {
        return {
            height: window.innerHeight,
            width: window.innerWidth,
            documentHeight: document.documentElement.scrollHeight,
            scroll: 0,
            scrollThrottle: 0,
            scrollDirection: 'UP',
            scrollStart: 0,
            scrollEnd: 0
        }
    },
    methods: {
        updateScroll() {
            this.scroll = window.pageYOffset;
            this.ticking = false;
        },

        requestTick() {
            if (!this.ticking) {
                requestAnimationFrame(this.updateScroll)
                this.ticking = true
            }
        },

        onScroll() {
            if (this.lastScrollTop > this.scroll) {
                this.scrollDirection = 'UP'
            } else {
                this.scrollDirection = 'DOWN'
            }

            if (!this.isScrolling) {
                this.scrollStart++
            }

            this.isScrolling = true
            this.lastScrollTop = this.scroll

            this.requestTick()
        },

        onScrollThrottle() {
            this.scrollThrottle = window.pageYOffset;
        },

        onScrollEnd() {
            this.isScrolling = false
            this.scrollEnd++;
        },

        refreshBasicSate() {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.scroll = window.pageYOffset
            this.documentHeight = document.documentElement.scrollHeight
        },

        onRouteChange() {
            const imagesEl = document.querySelectorAll('img');
            const images = [...imagesEl].map(el => {
                return el.getAttribute('src')
            });

            if (images.length) {
                const imageLoader = new loadImages(images);
                imageLoader.init().then(() => {
                    this.refreshBasicSate()
                })
            } else {
                this.refreshBasicSate()
            }
        }
    },

    created() {
        this.ticking = false;
        this.lastScrollTop = 0;
        this.isScrolling = false;

        window.addEventListener('scroll', this.onScroll, false);
        window.addEventListener('resize', debounce(this.refreshBasicSate, 200), false);
        window.addEventListener('scroll', throttle(this.onScrollThrottle, 200), false);
        window.addEventListener('scroll', debounce(this.onScrollEnd, 200), false);

        document.onreadystatechange = () => {
            if (document.readyState === "complete") {
                this.refreshBasicSate()
            }
        }
    }
})

export default WindowInstanceMap


/*

NUXT:

https://blog.usejournal.com/reactive-window-parameters-in-vuejs-fc5de75d7ab5

Let’s create WindowInstanceMap.js in the “plugins” folder.

// WindowInstanceMap.js
import Vue from 'vue'
const WindowInstanceMap = new Vue({
  data() {
    ....
  },
created() {
    ....
  }
})

// Inject plugin as Vue.prototype.$window
export default (context, inject) => {
  inject('window', EventBus)
}

// nuxt.config.js
plugins: [
  { src: '~/plugins/WindowInstanceMap', ssr: false }
]
*/
