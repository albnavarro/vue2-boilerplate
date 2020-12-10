<template>
<div id="app">
    <Navigation />
    <router-view />
</div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'

export default {
    components: {
        Navigation
    },
    watch:{
        $route (){
            this.$nextTick(() => {
                // Refresh browser module
                this.$store.dispatch('browser/refreshOnRouteChange')
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
@import '@/scss/vendor/_normalize.scss';
@import '@/scss/main.scss';
</style>
