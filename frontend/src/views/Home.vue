<template>
  <div class="hello">
    <img alt="logo et nom de l'entreprise Groupomania" src="../assets/icon-name-blue.png"/>
    <h1>Bienvenu sur votre réseau social d'entreprise !</h1>
    <p>
      Discutez avec vos collègues, rencontrez de nouvelles personnes</p> 
    <h3>Publications</h3>
    <Publications/>
    <Footer/>
  </div>
</template>

<script>
import Publications from '@/components/Publications.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Publications,
    Footer,
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #151325;
}
</style>
