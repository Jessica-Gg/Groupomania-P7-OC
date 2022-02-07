<template>
    <div class="comment template">
        <div class="comment_card m-1" v-for="commentaire in allComments" :key="commentaire.id">
            <div class="card shadow" v-if="article.id == commentaire.article_id">
                <div class="cardComment" v-if="mode=='read'">
                    <div class="dataComment">
                        <p class="font-weight-bold"><v-icon class="icon" name="regular/user-circle"/> {{ commentaire.auteuriceLastname }} {{ commentaire.auteuriceFirstname }}, {{ moment(commentaire.date).fromNow()}} :</p>
                        <p>{{ commentaire.contenu }}</p>
                    </div>
                    <div class="buttonsActions" v-if="user.id == commentaire.user_id || verifIsAdmin > 0">
                        <button @click="switchToModifyComment(commentaire.id)" class="btn btn-sm btn-outline-info ml-3"><v-icon class="icon" name="pencil-alt"/></button>
                        <button @click="deleteComment(commentaire.id)" class="btn btn-sm btn-outline-danger ml-3"><v-icon class="icon" name="regular/trash-alt"/></button>
                    </div>
                </div>
                <div class="modifyMode" v-if="mode=='modify'" >
                    <textarea v-model="contenu" id="changeComment" class="textZone" placeholder="Nouveau commentaire"></textarea><br>
                    <button type="submit" class="btn btn-sm btn-outline-dark ml-3 mt-1" @click="sendModifyComment(commentaire.id)">Enregistrer</button>
                    <button type="submit" class="btn btn-sm btn-outline-dark ml-3 mt-1" @click="switchToRead()">Annuler</button>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

var moment = require('moment')

export default {
  name: 'Comments',
    data(){ 
        return{
            moment:moment,
            allComments: [],
            contenu: "",
            date: "",
            id:"",
            firstname: "",
            lastname: "",
            mode: "read",
            article_id:"",
            verifIsAdmin : this.$store.state.user.admin,
        }
    },

    computed:{
        ...mapState(['user']),
    },

    methods: {
        ...mapActions(['getUserInfos']),

 //  //Changer de mode pour afficher le commentaire
 //  switchToRead(){
 //    this.mode = 'read'
 //  },
 //  
 //  //Passer en mode modification du commentaire
 //  switchToModifyComment(){
 //    this.mode = 'modify'
 //  },

    //Supprimer une publication
    deleteComment: function(id){
        console.log(id)
        const token = localStorage.getItem('userToken')
        if(confirm("Voulez-vous supprimer ce commentaire ?")){
            axios
            .delete('/api/comment/' + id, {
                headers: { 'Authorization': 'Bearer' + token }
            })
            .then (()=>{
               location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        }
    },

  // //Modifier un commentaire
  // sendModifyComment : function(id) {
  //   const token = localStorage.getItem('userToken')  
  //   if(this.contenu !== null){
  //     axios
  //     .put('/api/user/' + id, 
  //     {
  //       contenu: this.contenu
  //     },
  //     {
  //       headers: {
  //         'Authorization': 'Bearer' + token
  //       }
  //     })
  //     .then(response =>{
  //       console.log(response);
  //       location.reload();    
  //     })
  //     .catch(function (error){
  //       console.log(error)
  //     })
  //   } else {
  //     alert('Veuillez remplir le champ')
  //   }
  // },

    }, //fin methods

      mounted(){
      this.$store.dispatch('getUserInfos');
    //Récupèrer tous les commentaires
     const token = localStorage.getItem('userToken')
            axios
                .get('/api/comment/', {
                    headers: {Authorization : 'Bearer' + token},
                })
                .then((response) => {
                    this.allComments = response.data
                    console.log('get all comment ok')
                })
               .catch(error => {
                console.log('get all comment fail')
                console.log(error)
            })
    },


//fin export
}

</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

.cardComment{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    padding: 0.5em;

    .dataComment{
        width: 80%;

        p{
            font-size: 0.9em;
        }
    }
}

.modifyMode{
    padding: 0.5em;

    textarea{
        width: 80%;
    }
}



</style>