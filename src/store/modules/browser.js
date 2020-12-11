import throttle from '@/utils/throttle.js'
import debounce from '@/utils/debounce.js'
import {loadImages} from '@/utils/loadImages.js'

// Add linstener once
let init = false

// Private var
let ticking = false;
let lastScrollTop = 0;
let isScrolling = false;

const refreshBasicSate = (_context) => {
    const context = _context
    const width = window.innerWidth
    const height = window.innerHeight
    const scroll =  window.pageYOffset
    const documentHeight = document.documentElement.scrollHeight

    context.commit('setWidth', width)
    context.commit('setHeight', height)
    context.commit('setScroll', scroll)
    context.commit('setScrollThrottle', scroll)
    context.commit('setDocumentHeight', documentHeight)
}

export default {
    namespaced: true,
    state: () => ({
        height: window.innerHeight,
        width: window.innerWidth,
        documentHeight: document.documentElement.scrollHeight,
        scroll: 0,
        scrollThrottle: 0,
        scrollDirection: 'UP',
        scrollStart: 0,
        scrollEnd: 0
    }),

    mutations: {
        setWidth(state, value) {
            state.width = value;
        },

        setHeight(state, value) {
            state.height = value;
        },

        setScroll(state, value) {
            state.scroll = value;
        },

        setScrollDirection(state, value) {
            state.scrollDirection = value;
        },

        setDocumentHeight(state, value) {
            state.documentHeight = value;
        },

        setScrollThrottle(state, value) {
            state.scrollThrottle = value;
        },

        setScrollStart(state) {
            state.scrollStart ++;
        },

        setScrollEnd(state) {
            state.scrollEnd ++;
        }
    },

    actions: {
        inizialize(context) {
            if (init) return;
            init = true

            const updateScroll = () => {
                const scroll = window.pageYOffset;
                context.commit('setScroll', scroll)
                ticking = false;
            }

            const requestTick = () => {
                if(!ticking) {
                  requestAnimationFrame(updateScroll)
                  ticking = true
                }
            }

            const onScroll = () => {
                let scrollDirection = 'up';
                if ( lastScrollTop > context.state.scroll ) {
                  scrollDirection = 'UP'
                } else {
                  scrollDirection = 'DOWN'
                }

                if (!isScrolling)  {
                    context.commit('setScrollStart')
                }

                isScrolling = true

                context.commit('setScrollDirection', scrollDirection)
                lastScrollTop = context.state.scroll

                requestTick()
            }

            const onScrollThrottle = () => {
                const scroll = window.pageYOffset;
                context.commit('setScrollThrottle', scroll)
            }

            const onScrollEnd = () => {
                isScrolling = false
                context.commit('setScrollEnd')
            }

            const onResize = () => {
                refreshBasicSate(context)
            };

            window.addEventListener('scroll', onScroll, false);
            window.addEventListener('resize', debounce(onResize, 200), false);
            window.addEventListener('scroll', throttle(onScrollThrottle, 200), false);
            window.addEventListener('scroll', debounce(onScrollEnd, 200), false);

            document.onreadystatechange = () => {
                if (document.readyState === "complete") {
                    refreshBasicSate(context)
                }
            }

            // First value check,
            // At the momenti si not necessay ( use document.onreadystatechange )
            // refreshBasicSate(context)
        },
        onRouteChange(context) {
            const imagesEl = document.querySelectorAll('img');
            const images = [ ... imagesEl].map(el => {
                return el.getAttribute('src')
            });

            if (images.length) {
                const imageLoader = new loadImages(images);
                imageLoader.init().then(() => {
                    refreshBasicSate(context)
                })
            } else {
                refreshBasicSate(context)
            }
        }
    },

    getters: {
        getHeight: state => state.height,
        getWidth: state => state.width,
        getDocumentHeight: state => state.documentHeight,
        getScroll: state => state.scroll,
        getScrollThrottle: state => state.scrollThrottle,
        getScrollDirection: state => state.scrollDirection,
        getScrollStart: state => state.scrollStart,
        getScrollEnd: state => state.scrollEnd
    }
}
