<template>
  <div id="profil">
    <div class="infoProfil">
      <h1>Mon profil</h1>
        <div class="m-3 publications_card">
          <div class="card cardIndex shadow">
            <div class="card-header bg-white">
              <h2 class="card-title text-info">{{ user.lastname }} {{ user.firstname }}</h2>
            </div>
            <div class="card-body" id="description">
              <p class="font-weight-bold">Présentation : </p><p>{{ user.description }}</p>
              <button type="submit" v-if="mode=='read'" class="btn btn-sm btn-outline-dark mt-1" @click="modifyDescription()">
                <span class="font-weight-bold">Modifier la description</span>
              </button> 
              <div v-if="mode=='modify'" >
                <textarea v-model="description" id="changeDescription" class="textZone" placeholder="Nouvelle description"></textarea><br>
                <button type="submit" class="btn btn-sm btn-outline-dark ml-3 mt-1" @click="newDescription()">Enregistrer</button>
                <button type="submit" class="btn btn-sm btn-outline-dark ml-3 mt-1" @click="switchToRead()">Annuler</button>
              </div>
            </div>
            <div class="card-footer bg-white">
              <button type="submit" class="btn btn-sm btn-outline-dark mt-1" @click="deconnectAccount()">
                <span class="font-weight-bold">Se déconnecter</span>
              </button> 
              <button type="submit" class="btn btn-sm btn-outline-danger ml-3 mt-1" @click="deleteAccount()">
                <span class="font-weight-bold">Supprimer mon compte <v-icon class="icon" name="regular/trash-alt"/></span>
              </button>
            </div>
          </div>
        </div>
    </div>
        <button type="submit" class="btn btn-outline-primary mb-3 mt-3 btnNewPost">
          <router-link class="linkNewPost" to="/newpost"><span class="font-weight-bold">Créer une nouvelle publication</span></router-link>
        </button> 
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, } from 'vuex'

//Si l'utilisateur n'est pas connecté, il est renvoyé à la page de connexion
const userInfos = localStorage.getItem('userInfos')
if(userInfos === null ){
  alert('Vous n\'êtes pas identifié')
  this.$router.push("/login?mode=connexion")
}

export default {
  name: 'Profil',
    
    data() {
      return {
        token:'',
        id:'',
        firstname: '',
        lastname: '',
        description :'', 
        mode: 'read',
        admin:"",    
      }
    },

    computed:{
      ...mapState(['user'])
    },

  methods: {
  //Passer en mode modification du compte
    modifyDescription(){
      this.mode = 'modify'
    },

  //Changer de mode pour afficher le profil
    switchToRead(){
      this.mode = 'read'
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
          console.log(response);
          this.switchToRead();
          location.reload();    
        })
        .catch(function (error){
          console.log(error)
        })
      } else {
        alert('Veuillez remplir le champ')
      }
    },
    
  //fin methods
  },

  //Chargement de la fonction qui fait l'appel à l'API pour récupérer les informations de l'utilisateur
  mounted(){
      this.$store.dispatch('getUserInfos');
    },

//fin export
}
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

#profil{
  .infoProfil{
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

 .card-header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.5em
  }
  
  #description{
    font-size: 1.5em;
  }
 

}
</style>