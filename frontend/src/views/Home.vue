<template>
  <div class="hello">
    <Header/>
<!-- Option pour voir la liste des membres -->
    <div>
      <button type="button" class="btn btn-sm btn-outline-info mb-3 mt-3 btnListUser">
        <router-link class="linkListUsers" to="/allusers">
          <span class="font-weight-bold">Liste des membres <v-icon class="icon" name="users"/></span>
        </router-link>      
      </button>
    </div>
<!-- Affichage des publications par ordre de date décroissant + option pour créer une nouvelle publication -->  
    <h2>Publications</h2>
    <button type="submit" class="btn btn-outline-primary mb-3 mt-3 btnNewPost">
          <router-link class="linkNewPost" to="/newpost"><span class="font-weight-bold">Créer une nouvelle publication</span></router-link>
    </button>
    <Publications/>
    <Footer/>
  </div>
</template>

<script>
//Si l'utilisateur n'est pas connecté, il est renvoyé à la page de connexion
const userId = localStorage.getItem('userId')
if(userId == null ){
  this.$router.push('/login') 
}

import Publications from '@/components/Publications.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import {mapState} from 'vuex'


export default {
  name: 'Home',
  components: {
    Publications,
    Footer,
    Header,
  },
  data(){ 
        return{
            verifIsAdmin : this.$store.state.user.admin,
        }
    },  

    computed:{
        ...mapState(['user']),
    },

      mounted(){
      this.$store.dispatch('getUserInfos');
    },
}
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #151325;
  }
}

.btnNewPost, .btnListUser{
    background-color: white;
    color : $primary;

    &:hover{
      background-color: rgb(234, 255, 255);
    }

      .linkNewPost, .linkListUsers{
        color: $primary;
      }

      .linkNewPost:hover, .linkListUsers:hover{
        text-decoration: none;
      }
  }
</style>
