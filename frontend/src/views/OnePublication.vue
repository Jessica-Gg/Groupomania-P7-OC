<template>
    <div class="m-3 publications_card" >
        <div class="card cardIndex shadow"  >
            <div class="card-header bg-white">
                <h2 class="card-title text-center">{{ user.lastname }} {{ user.firstname }}</h2>
                <p class="card-title text-center">{{ moment(article.date).format("DD/MM/YYYY") }}</p>
            </div>
            <div class="card-body">
                <div><img/></div>
                <div></div>
            </div>
            <div class="card-footer bg-white"> 
                <p>Commentaires (nb comments)</p>
                <input type="text" placeholder="Ajouter un commentaire"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import axios from 'axios';

var moment = require('moment')

export default {
  name: 'Publications',
    data(){ 
        return{
            moment:moment,
            articleData: [],
        }
    },

    computed:{
        ...mapState(['user']),
    },

    mounted(){
        const token = localStorage.getItem('userToken')
            axios
                .get('/api/posts/', {
                    headers: {Authorization : 'Bearer' + token},
                })
                .then((response) => {
                    this.articleData = response.data
                })
               .catch(error => {
                console.log('get post fail')
                console.log(error)
            })
    },

    methods: {
        ...mapActions(['getUserInfos'])
    }
}
</script>


<style scoped lang="scss">
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
        
}
</style>