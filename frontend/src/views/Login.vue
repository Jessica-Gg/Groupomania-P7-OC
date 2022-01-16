<template>
    <div class="login">
        {{mode}}
        <h1 class="title" v-if="mode == 'login'">Connexion</h1>
        <h1 class="title" v-else>Inscription</h1>
        <p class="subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action"><router-link to="/login?mode=create">Créer un compte</router-link></span></p>
        <p class="subtitle" v-else>Tu as déjà un compte ? <span class="card__action"><router-link to="/login?mode=login">Se connecter</router-link></span></p>
        <form method="post" id="formulaire" @submit.prevent="CreateAccount">
            <div class="rowForm" v-if="mode == 'create'">
                <label for='firstname'>Nom :</label><br>
                <input v-model="userInfos.firstname" id="firstname" required class="formInput" type="text" pattern="[A-Za-z]+" title="caractères alphabétiques uniquement" placeholder="Nom"/>
            </div>
            <div class="rowForm" v-if="mode == 'create'">  
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
             <div class="rowForm" v-if="mode == 'create'">
                <label for="confirmPassword">Confirmer le mot de passe :</label><br>
                <input v-model="userInfos.confirmPassword" required id="confirmPassword"  class="formInput" type="password" placeholder="Mot de passe"/>
            </div>
            <div class="rowForm">
                <button type="submit" @click.prevent="login()" class="btn btn-outline-primary"  v-if="mode == 'login'">
                    <span>Connexion</span>
                </button>
                <button type="submit" @click.prevent="createAccount()" class="btn btn-outline-primary" v-else>
                    <span>Créer mon compte</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    props: {
        mode: {
            type: String,
            default: "login"
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
            console.log('toto 1', this.userInfos)
            if (this.userInfos.password === this.userInfos.confirmPassword)
            {
                console.log('toto 2', this.userInfos)
                axios
                .post('/api/auth/signup', this.userInfos )
                .then(response=>{
                    console.log(response)
                    this.$router.push("/login?mode=login")
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
                .post('/api/auth/login', this.userInfos)
                .then(response => {
                    localStorage.setItem('userToken',response.data.token,)
                    localStorage.setItem('userId',response.data.id,)
                    this.$router.push("/profil")
                })
                 .catch(function (error) {
                    console.log(error)
                })
            } else {  
                console.log('echec de la connexion')
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
    margin-top: 1.5em;
}

.rowForm {
    margin: 1em;
}

.lastfirstnames{
    margin-right: 1em,
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

</style>