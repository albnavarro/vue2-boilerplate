import Vue from 'vue'
import Vuex from 'vuex'
import browserModule from "./modules/browser.js";
import mouseModule from "./modules/mouse.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        browser: browserModule,
        mouse: mouseModule
    }
})
