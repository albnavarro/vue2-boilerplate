import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgSprite from 'vue-svg-sprite'

Vue.config.productionTip = false
Vue.use(SvgSprite, {
  url: require('./assets/svg/sprite.svg'),
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
