<template>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Animation">Animation</router-link>
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
    }
</style>
