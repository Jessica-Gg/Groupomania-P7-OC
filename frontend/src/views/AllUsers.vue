<template>
  <div class="usersCards">
    <div class="cards" v-for="user in allUsers" :key="user.id">
      <div class="card m-3 cardIndex shadow">
        <div class="card-body" id="description">
          <h2 class="card-title text-info">
            {{ user.lastname }} {{ user.firstname }}
          </h2>
          <p class="font-weight-bold">Présentation :</p>
          <p>{{ user.description }}</p>
        </div>
        <div class="card-footer bg-white" v-if="verifIsAdmin">
          <button
            type="submit"
            class="btn btn-sm btn-outline-danger ml-3 mt-1"
            @click="deleteUser(user.id)"
          >
            <span class="font-weight-bold"
              >Supprimer le compte
              <v-icon class="icon" name="regular/trash-alt"
            /></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "AllUsers",
  data() {
    return {
      id: "",
      firstname: "",
      lastname: "",
      allUsers: [],
      verifIsAdmin: this.$store.state.user.admin,
      description: "",
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    // Récupérer tous les utilisateur'ices
    axios
      .get("/api/user/")
      .then((response) => {
        this.allUsers = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    ...mapActions(["me"]),

    //Supprimer le compte
    deleteUser(id) {
      if (confirm("Voulez-vous supprimer ce compte ?")) {
        axios
          .delete("/api/user/" + id)
          .then(() => {
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

.usersCards {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // padding-left: 10em;
  // padding-right: 10em ;
}
</style>
