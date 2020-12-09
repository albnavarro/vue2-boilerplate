<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo.png">
    <TestBrowser/>
  </div>
</template>

<script>
// @ is an alias to /src
import TestBrowser from '@/components/TestBrowser.vue'

export default {
  name: 'Home',
  components: {
    TestBrowser
  }
}
</script>

<style scoped>
    .logo {
        margin: auto;
        display: block;
    }
</style>
