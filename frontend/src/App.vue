<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">Accueil |</router-link>
      <router-link to="/about"> A propos |</router-link>
      <router-link to="/login"> Se connecter |</router-link>
      <router-link to="/profil"> Mon Profil <v-icon name="regular/user"/></router-link>
    </header>
    <router-view/>
    <footer>
      <p>{{ copyright }}</p>
    </footer>
  </div>
</template>

<script>
export default{
    name: 'Main',
      data () {
        return {
          groupName : 'Groupomania',
        }
      },
      computed: {
        copyright() {
          const currentYear = new Date().getFullYear()
          return `Copyright ${this.groupName} ${currentYear}`
        }
      }
    }
</script>


<style scoped lang="scss">
@import "./scss/_variables_overrides.scss";

body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 2em;
  background-color: $primary;

  a {
    color: #ffffff;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
  
  v-icon{
    color:#ffffff;
  }
}

footer{
  background: $primary;
  bottom:0;
  width:100%;
  height:3.5em;

  p{
    padding-top: 1em;
    color:#ffffff; 
  }
}
</style>
