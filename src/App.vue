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
    mounted() {
        this.$store.dispatch('browser/inizialize')
    }
}
</script>

<style lang="scss">
@import '@/scss/vendor/_normalize.scss';
@import '@/scss/main.scss';
</style>
