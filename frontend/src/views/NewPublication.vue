<template>
    <div class="m-3 publications_card">
        <div class="card cardIndex shadow">
            <div class="card-header bg-white">
                <h2 class="card-title text-center">Créer une nouvelle publication</h2>
                <p class="card-title text-center">{{ moment().format("DD/MM/YYYY") }} </p>
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

var moment = require('moment')

export default {
  name: 'Publications',
    data(){ 
        return{
            moment:moment,
            postContent:{
                image:'',
                contenu:'',
                uploadedFile: '',
            }
        }
    },

    computed:{
        ...mapState(['user']),
        infosUser(){
            return this.$store.state.user
        },

        currentdate() {
            const currentdate = new Date()
            return currentdate 
        }
    },

    methods: {
        ...mapActions(['getUserInfos']),

        publier() {
            const fd = new FormData();
            if((this.postContent.contenu !== null ) || (this.postContent.image !== null)){
                fd.append('image', this.postContent.image)
                fd.append('contenu', this.postContent.contenu)
                fd.append('auteur', this.$store.user.lastname)
            } else {
                fd.append('contenu', this.postContent.contenu)
                fd.append('auteur', this.$store.user.lastname)
            }
            axios
            .post('/api/article', fd, {
                headers:{
                     'Authorization': 'Bearer ' + localStorage.getItem('userInfo')
                }
            })
            .then((response) => {
                console.log(response)
                this.$router.push('/profil')
            })
            .catch(error => {
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
	justify-content: space-between;
	
    .card-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

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