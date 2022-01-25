<template>
    <div class="m-3 publications_card">
        <div class="card cardIndex shadow">
            <div class="card-header bg-white">
                <h2 class="card-title text-center">{{ user.lastname }} {{ user.firstname }}</h2>
                <p class="card-title text-center">{{ moment().format("DD/MM/YYYY") }}</p>
            </div>
            <div class="card-body">
                <div>image</div>
                <div>contenu</div>
            </div>
            <div class="card-footer bg-white"> 
                <button type="button" class="btn btn-secondary btn-sm mb-3">Voir la publication</button>
                <p>Commentaires (nb comments)</p>
                <input type="text" placeholder="Ajouter un commentaire"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

var moment = require('moment')

export default {
  name: 'Publications',
    data(){ 
        return{
            moment:moment,
        }
    },

    computed:{
        ...mapState(['user'])
    },

    methods: {
        ...mapActions(['getUserInfos'])
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
        
}
</style>