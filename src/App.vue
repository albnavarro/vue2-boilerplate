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

export default {
    components: {
        Navigation,
        Footer
    },
    watch:{
        $route (){
            this.$nextTick(() => {
                // Refresh browser module
                this.$store.dispatch('browser/onRouteChange')
            });
        }
    } ,
    mounted() {
        // Inizialize browser module
        this.$store.dispatch('browser/inizialize')
    }
}
</script>

<style lang="scss">
@import '@/scss/common.scss';
@import '@/scss/abstrtact.scss';
</style>
