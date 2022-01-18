<template>
  <div class="container profil">
    <h1>Mon profil</h1>
      <div class="m-3 publications_card">
        <div class="card cardIndex shadow">
          <div class="card-header bg-white">
            <h2 class="card-title text-center">lastname firstname</h2>
          </div>
          <div class="card-body description">
            <label for="changeDescription">Description : </label>
            <p>{{ description }}</p>
            <input id="changeDescription" type="text" v-model="description" placeholder="Entrer une description">
          </div>
          <div class="card-footer"> 
            <button type="submit" class="btn btn-outline-danger" @click="deleteAccount()">
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
const userInfos = localStorage.getItem('userInfos')
if(userInfos === null ){
  alert('Vous n\'êtes pas identifié')
  this.$router.push("/login")
}

import Publications from '@/components/Publications.vue'
import axios from 'axios'

export default {
  name: 'Profil',
  components: {
    Publications
  },
    data() {
      return {

      }
    },

  methods: {
    deleteAccount(){
      const confirmDeleteAccount = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irreversible. Toutes vos données seront effacées.")
      const userId = localStorage.getItem('userId')
      if(confirmDeleteAccount == true){
        console.log('toto')
        axios
        .delete('/api/auth/delete' + userId, {
          headers: {
            'Authorization': 'Bearer' + localStorage.getItem('userToken')
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
    }
  }

}

</script>

<style scoped lang="scss">
.profil{
  margin-top: 1.5em;
}
</style>