<template>
     <header>
        <img alt="logo et nom de l'entreprise Groupomania" src="../assets/icon-name-blue.png"/>
        <h1>Bienvenue sur votre réseau social d'entreprise !</h1>
     </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped lang="scss">
 
  /* ---------------------------------------------------------------- */
 /* ---------------------RESPONSIVE TEL.PORTABLES------------------- */
/* ---------------------------------------------------------------- */

@media screen and (max-width: 479px){
     img{
            width: 80%;
        }
    h1{
            font-size: 2em;
        }
}

</style>