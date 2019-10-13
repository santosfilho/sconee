<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo SCONE.png">
    <HelloWorld msg="Sistema de controle de equipamentos elétricos"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style>
.home {
  text-align: center;
}
</style>
