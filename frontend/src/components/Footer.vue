<template>
  <footer>
    <p>{{ copyright }}</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      groupName: "Groupomania",
    };
  },

  computed: {
    copyright() {
      const currentYear = new Date().getFullYear();
      return `Copyright ${this.groupName} © ${currentYear}`;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/_variables_overrides.scss";

footer {
  background: $primary;
  width: 100%;
  height: 3.5em;
  margin-top: 2em;

  p {
    padding-top: 1em;
    color: #ffffff;
  }
}
</style>