<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('browser/inizialize')
    }
}
</script>

<style lang="scss">
    @import '@/scss/main.scss';
</style>
