<template>
  <div class="about">
    <h1>A propos de Groupomania</h1><br>
    <img alt="Groupomania : notre entreprise, spécialisée dans la grande distribution, est en pleine expansion.
    Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années.
    Nous étions uniquement 300 il y a 3 ans." src="../assets/about.png">
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'About',
  components: {
    Footer
  }
}
</script>

<style scoped lang="scss">
.about{
  margin-top: 1.5em;
}

/* ---------------------------------------------------------------- */
 /* ---------------------RESPONSIVE TEL.PORTABLES------------------- */
/* ---------------------------------------------------------------- */

@media screen and (max-width: 479px){
    img{
      width: 85%
    }

    h1{
      font-size: 2em;
    }
}


</style>
