<template>
  <div id="profil">
    <div class="infoProfil">
      <h1>Mon profil</h1>
        <div class="m-3 publications_card">
          <div class="card cardIndex shadow">
            <div class="card-header bg-white">
              <h2 class="card-title text-center text-info">{{ user.lastname }} {{ user.firstname }}</h2>
            </div>
            <div class="card-body" id="description">
              <form>
              <label for="changeDescription" class="font-weight-bold">Présentation : </label><br>
              <p>{{ user.description }} {{ description }}</p>
              <input id="changeDescription" type="text" v-model="description" placeholder="Entrez une description">
              <button type="submit" class="btn btn-outline-dark ml-3 mt-1" @click="newDescription()">Enregistrer</button>
              </form>
            </div>
            <div class="card-footer bg-white">
              <button type="submit" class="btn btn-outline-dark mt-1" @click="deconnectAccount()">
                <span class="font-weight-bold">Se déconnecter</span>
              </button> 
              <button type="submit" class="btn btn-outline-danger ml-3 mt-1" @click="deleteAccount()">
                <span class="font-weight-bold">Supprimer mon compte</span>
              </button>
            </div>
          </div>
        </div>
    </div>
    <div class="publicationSection">
      <h2>Mes publications</h2>
        <button type="submit" class="btn btn-outline-primary mb-3 mt-3 btnNewPost">
          <router-link class="linkNewPost" to="/newpost"><span class="font-weight-bold">Créer une nouvelle publication</span></router-link>
        </button>
        <Publications/>
    </div>  
  </div>
</template>

<script>
import Publications from '@/components/Publications.vue'
import axios from 'axios'
import {mapState, } from 'vuex'

const userInfos = localStorage.getItem('userInfos')
if(userInfos === null ){
  alert('Vous n\'êtes pas identifié')
  this.$router.push("/login?mode=connexion")
}

export default {
  name: 'Profil',
  components: {
    Publications
  },
    
    data() {
      return {
        description :'',
        firstname: '',
        lastname: '',
        userInfos: [],
      }
    },

    computed:{
      ...mapState(['user'])
    },

  methods: {
  //Récupérer les informations de l'utilisateur
    getUserInfos(){
       console.log('state get infos')
       const id = localStorage.getItem('userId')
       const token = localStorage.getItem('userToken')
       axios
       .get('/api/user/'+ id, {
         headers:{
             'Authorization': 'Bearer ' + token
        }
       })
       .then(response => {
         console.log(response)
        this.userInfos = response.data
       })
       .catch(error => {
         console.log(error); 
       });         
       },
  mounted(){
    console.log('mounted')
		this.getUserInfos();
  },
  //Supprimer le compte
    deleteAccount: function(){
      const id = localStorage.getItem('userId')
      const token = localStorage.getItem('userToken')
      if(confirm("Voulez-vous supprimer votre compte ? Toutes vos informations seront effacées")){
        axios
        .delete('/api/user/' + id, {
          headers: {
            'Authorization': 'Bearer' + token
          }
        })
        .then (()=>{
          localStorage.clear();
          alert('Votre comtpe a bien été supprimé')
          this.$router.push("/")
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  //Se déconnecter
    deconnectAccount() {
      localStorage.clear()
      this.$router.push("/login?mode=connexion")
    },

  //Changer la description
    newDescription : function() {
      const id = localStorage.getItem('userId')
      const token = localStorage.getItem('userToken')  
    //  console.log('description',this.description)  
      if(this.descrition !== null){
        axios
        .put('/api/user/' + id, 
        {
          description: this.description
        },
        {
          headers: {
            'Authorization': 'Bearer' + token
          }
        })
        .then(response =>{
          console.log(response)
        })
        .catch(function (error){
          console.log(error)
        })
      } else {
        alert('Veuillez remplir le champ')
      }
    },
  },

}

</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

#profil{
  .infoProfil, .publicationSection{
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .btnNewPost:hover{
    background-color: white;
    color : $primary;

      .linkNewPost:hover{
        text-decoration: none;
      }
  }

}
</style>