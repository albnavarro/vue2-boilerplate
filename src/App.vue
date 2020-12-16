<template>
<div id="app">
    <Navigation />
    <router-view />
    <Footer/>
</div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'
import Footer from '@/components/layout/Footer.vue'
import WindowInstanceMap from '@/WindowInstanceMap.js'

export default {
    components: {
        Navigation,
        Footer
    },
    watch:{
        $route (){
            this.$nextTick(() => {
                WindowInstanceMap.onRouteChange()
            });
        }
    }
}
</script>

<style lang="scss">
@import '@/scss/common.scss';
@import '@/scss/abstrtact.scss';
</style>
