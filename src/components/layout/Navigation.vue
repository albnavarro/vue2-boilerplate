<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Animation">Scroll animation</router-link> |
      <router-link to="/ParallaxExample">Parallax Example</router-link> |
      <router-link to="/ParallaxTimeline">Parallax Timeline</router-link> |
      <router-link to="/Mouse">Mouse animation</router-link> |
      <router-link to="/Utils">Utils</router-link>
    </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style lang="scss" scoped>
    #nav {
        text-align: center;
        margin-bottom: 40px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-bottom: 1px $grey solid;
    }

    a {
        color: $black;
        text-decoration: none;
    }
</style>
