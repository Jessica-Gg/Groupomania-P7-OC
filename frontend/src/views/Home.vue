<template>
  <div class="hello">
    <Header/>
    <div>
      <button type="button" class="btn btn-sm btn-outline-info mb-3 mt-3 btnListUser">
        <router-link class="linkListUsers" to="/allusers">
          <span class="font-weight-bold">Liste des membres <v-icon class="icon" name="users"/></span>
        </router-link>      
      </button>
    </div>
    
    <h3>Publications</h3>
    <p id="textConnect"></p>
    <button type="submit" class="btn btn-outline-primary mb-3 mt-3 btnNewPost">
          <router-link class="linkNewPost" to="/newpost"><span class="font-weight-bold">Créer une nouvelle publication</span></router-link>
    </button>
    <Publications/>
    <Footer/>
  </div>
</template>

<script>
const userInfos = localStorage.getItem('userInfos')
if(userInfos === null ){
  alert('Veuillez vous identifier pour partager et interagir avec des publications') 
}

import Publications from '@/components/Publications.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

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

.btnNewPost:hover, .btnListUser:hover{
    background-color: white;
    color : $primary;

      .linkNewPost, .linkListUsers{
        color: $primary;
      }

      .linkNewPost:hover, .linkListUsers:hover{
        text-decoration: none;
      }
  }
</style>
