<template>
  <div class="hello">
    <Header/>
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
    Header
  },
  data(){
    return{
      allArticles: []
  }
  }
  
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

.btnNewPost:hover{
    background-color: white;
    color : $primary;

      .linkNewPost:hover{
        text-decoration: none;
      }
  }
</style>
