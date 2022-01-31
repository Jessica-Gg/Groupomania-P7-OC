<template>
    <div class="m-3 publications_card">
        <div class="card cardIndex shadow">
            <div class="card-header bg-white">
                <h2 class="card-title text-center">Créer une nouvelle publication</h2>
            </div>
            <div class="card-body">
                <form method="post" id="formulairePost">
                    <div class="rowForm">
                        <label for='image' class="font-weight-bold">Partager une image : </label><br>
                        <input id="image" type="file" name="image" accept="image/*"  placeholder="Télécharger un fichier" @click="uploadFile()"/>
                    </div>
                    <div class="rowForm mt-3">  
                        <label for="contenu" class="font-weight-bold">Partager un nouveau contenu :</label><br>
                        <textarea v-model="postContent.contenu" id="contenu" class="textZone" placeholder="Quoi de neuf ?"></textarea>
                    </div>
                    <button type="submit" class="btn btn-outline-primary ml-3 mt-1" @click="publier()">
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
            postContent:{
                image:'',
                contenu:'',
            }
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
            console.log('token publier',token)
            const userData = {
                contenu: this.contenu,
                image: this.image,
                user_id: userId
            }
            axios
            .post('/api/posts/', userData, {
                headers:{
                     'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                console.log('post test')
                console.log(response)
                this.$emit("Publications");
                this.contenu = "";
                this.image= "";
                this.$router.push('/profil')
            })
            .catch(error => {
                console.log('post test fail')
                console.log(error)
            })
        },

        uploadFile (event) {
            console.log(event)
            this.selectedFile = event.target.files[0]
            console.log(this.selectedFile.name)
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