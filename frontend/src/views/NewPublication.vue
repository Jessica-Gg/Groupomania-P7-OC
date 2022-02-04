<template>
    <div class="m-3 publications_card">
        <div class="card cardIndex shadow">
            <div class="card-header bg-white">
                <h2 class="card-title text-center">Créer une nouvelle publication</h2>
            </div>
            <div class="card-body">
                <form id="formulairePost">
                    <div class="rowForm">
                        <label for='image' class="font-weight-bold">Partager une image : </label><br>
                        <input id="image" type="file" name="image" placeholder="Télécharger un fichier" @change="prepareFile"/>
                    </div>
                    <div class="rowForm mt-3">  
                        <label for="contenu" class="font-weight-bold">Partager un nouveau contenu :</label><br>
                        <textarea v-model="contenu" id="contenu" class="textZone" placeholder="Quoi de neuf ?"></textarea>
                    </div>
                    <button class="btn btn-outline-primary ml-3 mt-1" @click="publier()">
                        <span class="font-weight-bold">Publier</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Publications',
    data(){ 
        return{
            image:'',
            imageName:'',
            contenu:'',
        }
    },

    computed:{
        ...mapState(['user']),
        infosUser(){
            return this.$store.state.user
        },
    },

    methods: {
        ...mapActions(['getUserInfos']),

        publier() {
            const token = localStorage.getItem('userToken');
            const userId = localStorage.getItem('userId')
            console.log(this.imageName)
            let userData = new FormData();
            
            userData.append("contenu", this.contenu);
            userData.append("filename", this.imageName);
            userData.append("imageUrl", this.image);
            userData.append("user_id", userId);
            
            console.log(userData)


        axios
        .post('/api/posts/', userData, {
            headers:{
                 'Authorization': 'Bearer' + token,
                 'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log('post test')
            console.log(response)
        //    this.$emit("Publications");
        //    this.$router.push('/profil')
        })
        .catch(error => {
            console.log('post test fail')
            console.log(error)
        })
        },

        prepareFile (event) {
            console.log('event',event)
            this.image = event.target.files[0]
            this.imageName = event.target.files[0].name
            console.log(this.image.name)
        },
    }
}
</script>


<style lang="scss">
.publications_card{
    padding-left: 10em;
    padding-right: 10em ;
	display: flex;
    flex-direction: column;
	
    .card-header{
        h2, h3{
            font-size: 1.5em;
        }
    }

.textZone{
    width: 75%;
    height: 5em;
}
        
}
</style>