<template>
  <div id="profil">
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
            <input id="changeDescription" type="text" v-model="description" placeholder="Entrer une description">
            <button type="submit" class="btn btn-outline-dark ml-3 mt-1" @click="newDescription()">Enregistrer</button>
            </form>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-outline-dark mt-1" @click="deconnectAccount()">
              <span class="font-weight-bold">Se déconnecter</span>
            </button> 
            <button type="submit" class="btn btn-outline-danger ml-3 mt-1" @click="deleteAccount()">
              <span class="font-weight-bold">Supprimer mon compte</span>
            </button>
          </div>
        </div>
      </div>
    <h2>Mes publications 🖋</h2>
      <Publications/>
  </div>
</template>

<script>
import Publications from '@/components/Publications.vue'
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

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
      }
    },

    computed:{
      ...mapState(['user'])
    },

  methods: {
  //Récupérer les infos de l'utilisateur
    ...mapActions(['getUserInfos']),

  //Supprimer le compte
    deleteAccount(){
      const confirmDeleteAccount = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irreversible. Toutes vos données seront effacées.")
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('userToken')
      if(confirmDeleteAccount == true){
        console.log('userToken')
        axios
        .delete('/api/user/' + userId, {
          headers: {
            'Authorization': 'Bearer' + token
          }
        })
        .then (()=>{
          localStorage.clear();
          this.$router.push("/Home")
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
    newDescription() {
      const userId = localStorage.getItem('userId')
      if(this.descrition !== null){
        axios
        .put('api/user/', userId)
        .then(response =>{
          console.log(response)
        })
        .catch(function (error){
          console.log(error)
        })
      } else {
        alert('la descrpition n\'a pas pu être enregistrée')
      }
    }
  }

}

</script>

<style scoped lang="scss">
#profil{
  margin-top: 1.5em;
}
</style>