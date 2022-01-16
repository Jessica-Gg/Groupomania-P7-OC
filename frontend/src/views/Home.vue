<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/icon-left-font-monochrome-blue.png">
    <HelloWorld msg="Bienvenue sur votre réseau social d'entreprise !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
