<template>
  <div id="profil">
    <div class="infoProfil">
      <h1>Mon profil</h1>
      <div class="m-3 publications_card">
        <div class="card cardIndex shadow">
          <!-- Header avec le nom et le prénom -->
          <div class="card-header bg-white">
            <h2 class="card-title text-info">
              {{ user.lastname }} {{ user.firstname }}
            </h2>
          </div>
          <!-- Présentation/Description -->
          <div class="card-body" id="description">
            <h3 class="font-weight-bold">Présentation :</h3>
            <h4>{{ user.description }}</h4>
            <!-- Modification de la description -->
            <button
              type="submit"
              v-if="mode == 'read'"
              class="btn btn-sm btn-outline-dark mt-1"
              @click="switchToModifyDescription()"
            >
              <span class="font-weight-bold">Modifier la description</span>
            </button>
            <div v-if="mode == 'modify'">
              <textarea
                v-model="description"
                id="changeDescription"
                class="textZone"
                placeholder="Nouvelle description"
              ></textarea
              ><br />
              <button
                type="submit"
                class="btn btn-sm btn-outline-dark ml-3 mt-1"
                @click="sendNewDescription()"
              >
                Enregistrer
              </button>
              <button
                type="submit"
                class="btn btn-sm btn-outline-dark ml-3 mt-1"
                @click="switchToRead()"
              >
                Annuler
              </button>
            </div>
          </div>
          <!-- Option de déconnexion et de suppression de compte -->
          <div class="card-footer bg-white">
            <button
              type="submit"
              class="btn btn-sm btn-outline-dark mt-1"
              @click="deconnectAccount()"
            >
              <span class="font-weight-bold">Se déconnecter</span>
            </button>
            <button
              type="submit"
              class="btn btn-sm btn-outline-danger ml-3 mt-1"
              @click="deleteAccount(user.userId)"
            >
              <span class="font-weight-bold"
                >Supprimer mon compte
                <v-icon class="icon" name="regular/trash-alt"
              /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Accès direct pour créer une nouvelle publication -->
    <button type="submit" class="btn btn-outline-primary mb-3 mt-3 btnNewPost">
      <router-link class="linkNewPost" to="/newpost"
        ><span class="font-weight-bold"
          >Créer une nouvelle publication</span
        ></router-link
      >
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Profil",

  data() {
    return {
      token: "",
      userId: "",
      firstname: "",
      lastname: "",
      description: "",
      mode: "read",
      admin: "",
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    //Passer en mode modification du compte
    switchToModifyDescription() {
      this.mode = "modify";
    },

    //Changer de mode pour afficher le profil
    switchToRead() {
      this.mode = "read";
    },

    //Supprimer le compte
    deleteAccount(id) {
      //const id = this.$store.state.userId;
      if (
        confirm(
          "Voulez-vous supprimer votre compte ? Toutes vos informations seront effacées"
        )
      ) {
        axios
          .delete("/api/user/" + id)
          .then(() => {
            localStorage.clear();
            alert("Votre comtpe a bien été supprimé");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //Se déconnecter
    deconnectAccount() {
      localStorage.clear();
      this.$router.push("/login?mode=connexion");
    },

    //Changer la description
    sendNewDescription() {
      const id = this.$store.state.userId;
      if (this.descrition !== null) {
        axios
          .put("/api/user/" + id, {
            description: this.description,
          })
          .then((response) => {
            console.log(response);
            this.switchToRead();
            this.$router.go();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Veuillez remplir le champ");
      }
    },
  },

  mounted() {
    this.$store.dispatch("me");
  },

  //fin export
};
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

#profil {
  .infoProfil {
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .btnNewPost:hover {
    color: white;

    .linkNewPost:hover {
      text-decoration: none;
      color: white;
    }
  }

  .card-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.5em;
  }

  #description {
    font-size: 1.5em;

    textarea {
      width: 50%;
    }
  }
}
</style>