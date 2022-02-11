<template>
<div>
    <div class="introduction" >
        <Header/>
    </div>
    <div class="login border rounded shadow-sm bg-light">
        <h1 class="title" v-if="mode == 'connexion'"> {{mode}}</h1>
        <h1 class="title" v-else>{{mode}}</h1>
        <p class="subtitle" v-if="mode == 'connexion'">Vous n'avez pas encore de compte ? <span class="card__action"><router-link to="/login?mode=inscription">Créer un compte</router-link></span></p>
        <p class="subtitle" v-else>Vous avez déjà un compte ? <span class="card__action"><router-link to="/login?mode=connexion">Se connecter</router-link></span></p>
        <form method="post" id="formulaire">
            <div class="rowForm" v-if="mode == 'inscription'">
                <label for='firstname'>Nom :</label><br>
                <input v-model="userInfos.firstname" id="firstname" required class="formInput" type="text" pattern="[A-Za-z]+" title="caractères alphabétiques uniquement" placeholder="Nom"/>
            </div>
            <div class="rowForm" v-if="mode == 'inscription'">  
                <label for="lastname">Prénom :</label><br>
                <input v-model="userInfos.lastname" id="lastname" required class="formInput" type="text" pattern="[A-Za-z]+" title="caractères alphabétiques uniquement" placeholder="Prénom"/>
            </div>
            <div class="rowForm">
                <label for="email">Adresse mail :</label><br>
                <input v-model="userInfos.email" id="email" required class="formInput" type="text"  placeholder="Adresse mail"/>
            </div>
            <div class="rowForm">
                <label for="password">Mot de passe :</label><br>
                <input v-model="userInfos.password" id="password" required class="formInput" type="password" placeholder="Mot de passe"/>
            </div>
             <div class="rowForm" v-if="mode == 'inscription'">
                <label for="confirmPassword">Confirmer le mot de passe :</label><br>
                <input v-model="userInfos.confirmPassword" required id="confirmPassword"  class="formInput" type="password" placeholder="Mot de passe"/>
            </div>
            <div class="rowForm">
                <button type="submit" @click.prevent="login()" class="btn btn-outline-primary"  v-if="mode == 'connexion'">
                    <span>Connexion</span>
                </button>
                <button type="submit" @click.prevent="createAccount()" class="btn btn-outline-primary" v-else>
                    <span>Créer mon compte</span>
                </button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue'

export default {
    name: 'Login',
    components: {
        Header
    },
    props: {
        mode: {
            type: String,
            default: "connexion"
        }
    },
    data() {
        return {
            userInfos:{ 
                firstname: null,
                lastname: null,
                email: null,
                password: null, 
            },
            confirmPassword: null,
        }
    },

    methods: {
        createAccount: function () {
            //console.log('toto', this.userInfos)
            if (this.userInfos.password === this.userInfos.confirmPassword)
            {
                axios
                .post('/api/user/signup', this.userInfos )
                .then(response=>{
                    console.log(response)
                    this.$router.push("/login?mode=connexion")
                })
                .catch(function (error) {
                    console.log(error)
                })
            } else {     
               alert('Les mots de passe ne concordent pas')
            }
        },
        
        login: function() {
            if((this.userInfos.email !== null) && (this.userInfos.password !== null)){
                axios
                .post('/api/user/login', this.userInfos)
                .then(response => {
                    localStorage.setItem('userToken',response.data.token)
                    this.$router.push("/profil")
                })
                 .catch(function (error) {
                    console.log(error)
                })
            } else {  
                console.log('Les informations entrées ne sont pas correctes')
                console.log(this.error)
            }
        }   
    }
}
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

.login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 2em;
    margin-bottom: 2em;
    //border : thick double $primary;
    width : 50%;

    .introduction{
        margin-bottom: 2em;
        align-items: center;
    }
}

#formulaire{  
    .rowForm {
        margin: 1em;
    }

    .formInput {
        padding:0.5em;
        border-radius: 0.5em;
        background: #FFFF;
        font-weight: 500;
        font-size: 1em;
        flex:1;
        min-width: 7em;
        color: $primary;
    }

    .form-row__input::placeholder {
        color:#aaaaaa;
    }

    .lastfirstnames{
        margin-right: 1em,
    }
}

/* ---------------------RESPONSIVE------------------------- */
//Responsive tel. portable
@media screen and (max-width: 479px){
    .login{
        width: 90%
    }
}

</style>