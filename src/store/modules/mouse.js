import Vue from 'vue'

// Add linstener once
let init = false

export default {
    namespaced: true,
    state: () => ({
        pointer: {
            x: 0,
            y: 0
        },
        move: 0,
        touchStart: 0,
        touchEnd: 0,
        isTouch: false

    }),

    mutations: {
        setPointer(state, coords) {
            // Replace obj with new one
            // use vue.set for modify obj
            Vue.set(state, 'pointer', coords)
        },

        setMove(state) {
            state.move ++;
        },

        setTouchStart(state) {
            state.touchStart ++;
        },

        setTouchEnd(state) {
            state.touchEnd ++;
        },

        setisTouch(state) {
            state.isTouch = true;
        }
    },

    actions: {
        inizialize(context) {
            if (init) return;
            init = true

            window.addEventListener('mousemove', (e) => {
                const { x, y } = e
                context.commit('setMove')
                context.commit('setPointer', { x, y })
            })

            window.addEventListener('touchmove', (e) => {
                const { clientX, clientY } = e.touches[0]
                let x = clientX
                let y = clientY

                context.commit('setMove')
                context.commit('setPointer', { x, y })


            })

            window.addEventListener('mosuemove', (e) => {
                const { pageX, pageY } = e.touches[0]
                let x = pageX
                let y = pageY

                context.commit('setMove')
                context.commit('setPointer', { x, y })


            })

            window.addEventListener('touchstart', () => {
                context.commit('setTouchStart')
            });

            window.addEventListener('mousedown', () => {
                context.commit('setTouchStart')
            });

            window.addEventListener('touchend', () => {
                context.commit('setTouchEnd')
            });

            window.addEventListener('mouseup', () => {
                context.commit('setTouchEnd')
            });

            if (('ontouchstart' in window)
              || (navigator.MaxTouchPoints > 0)
              || (navigator.msMaxTouchPoints > 0)) {
                context.commit('setisTouch')
            }
        }
    }
}
