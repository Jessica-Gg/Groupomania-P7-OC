<template>
  <div class="comment template" v-if="afficher">
    <div
      class="comment_card m-1"
      v-for="commentaire in allComments"
      :key="commentaire.id"
    >
      <div class="card shadow">
        <div class="cardComment">
          <div class="dataComment">
            <p class="font-weight-bold">
              <v-icon class="icon" name="regular/user-circle" />
              {{ commentaire.lastname }} {{ commentaire.firstname }},
              {{ moment(commentaire.date).format("DD-MM-YYYY HH:MM") }} :
            </p>
            <p>{{ commentaire.contenu }}</p>
          </div>
          <div
            class="buttonsActions"
            v-if="user.userId == commentaire.user_id || verifIsAdmin"
          >
            <button
              @click="deleteComment(commentaire.id)"
              class="btn btn-sm btn-outline-danger ml-3"
            >
              <span
                >Supprimer <v-icon class="icon" name="regular/trash-alt"
              /></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

var moment = require("moment");

export default {
  name: "Comments",
  props: {
    articleId: Number,
  },
  data() {
    return {
      moment: moment,
      allComments: [],
      contenu: "",
      date: "",
      firstname: "",
      lastname: "",
      mode: "read",
      article_id: this.articleId,
      verifIsAdmin: this.$store.state.user.admin,
      userId: this.$store.state.userId,
      afficher: false,
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    ...mapActions(["me"]),

    //Supprimer un commentaire
    deleteComment(id) {
      if (confirm("Voulez-vous supprimer ce commentaire ?")) {
        axios
          .delete("/api/comment/" + id)
          .then(() => {
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    //Récupérer les commentaires
    seeComments(id) {
      axios
        .get("/api/comment/" + id)
        .then((response) => {
          this.allComments = response.data;
          this.afficher = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }, //fin methods

  mounted() {
    this.$store.dispatch("me");
    this.seeComments(this.article_id);
  },

  created() {
    this.$parent.$on("afficheComment" + this.article_id, () => {
      this.afficher = true;
    });

    this.$parent.$on("cacheComment", this.article_id, () => {
      this.afficher = false;
    });
  },
}; //fin export
</script>

<style scoped lang="scss">
@import "../scss/_variables_overrides.scss";

.cardComment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: start;
  padding: 0.5em;

  .dataComment {
    width: 80%;

    p {
      font-size: 0.9em;
    }
  }
}

.modifyMode {
  padding: 0.5em;

  textarea {
    width: 80%;
  }
}
</style>