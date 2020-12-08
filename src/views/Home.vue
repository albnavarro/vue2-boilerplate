<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
