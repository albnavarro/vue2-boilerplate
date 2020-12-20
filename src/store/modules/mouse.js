import Vue from 'vue'
import throttle from '@/utils/throttle.js'

// Add linstener once
let init = false
let initThottle = false

export default {
    namespaced: true,
    state: () => ({
        pointer: {
            x: 0,
            y: 0
        },
        move: 0,
        moveThrottle: 0
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

        setMoveThrottle(state) {
            state.moveThrottle ++;
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
        },

        inizializeThottle(context) {
            if (initThottle) return;
            initThottle = true

            window.addEventListener('mousemove', throttle((e) => {
                context.commit('setMoveThrottle')
                const { x, y } = e
                context.commit('setPointer', { x, y })
            }, 150), false);
        },
    }
}
