<template>
  <div class="home">
    <Header />
    <h2 class="hello">Bonjour {{ user.lastname }} !</h2>
    <!-- Option pour voir la liste des membres -->
    <div>
      <button
        type="button"
        class="btn btn-sm btn-outline-info mb-3 mt-3 btnListUser"
      >
        <router-link class="linkListUsers" to="/allusers">
          <span class="font-weight-bold"
            >Liste des membres <v-icon class="icon" name="users"
          /></span>
        </router-link>
      </button>
    </div>
    <!-- Affichage des publications par ordre de date décroissant + option pour créer une nouvelle publication -->
    <h2>Publications</h2>
    <button type="submit" class="btn btn-outline-primary mb-3 mt-3 btnNewPost">
      <router-link class="linkNewPost" to="/newpost"
        ><span class="font-weight-bold"
          >Créer une nouvelle publication</span
        ></router-link
      >
    </button>
    <Publications />
    <Footer />
  </div>
</template>

<script>
import Publications from "@/components/Publications.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Publications,
    Footer,
    Header,
  },

  computed: {
    ...mapState(["user", "userId"]),
  },
};
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";
.hello {
  color: rgb(15, 133, 141);
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #151325;
  }
}

.btnNewPost,
.btnListUser {
  background-color: white;
  color: $primary;

  &:hover {
    background-color: rgb(234, 255, 255);
  }

  .linkNewPost,
  .linkListUsers {
    color: $primary;
  }

  .linkNewPost:hover,
  .linkListUsers:hover {
    text-decoration: none;
  }
}
</style>
