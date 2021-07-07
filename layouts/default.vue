<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; Vedofair {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Rosarivo&display=swap');

  html::-webkit-scrollbar-track, .v-dialog--fullscreen::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 1px;
    background-color: #1e1e1e;
  }
  html::-webkit-scrollbar, .v-dialog--fullscreen::-webkit-scrollbar
  {
    width: 12px;
    background-color: #1e1e1e;
  }
  html::-webkit-scrollbar-thumb, .v-dialog--fullscreen::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #2196f3;
  }
  .v-main__wrap > .container > .container > .container{
    &::-webkit-scrollbar-track
    {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 1px;
      background-color: #1e1e1e;
    }
    &::-webkit-scrollbar
    {
      width: 12px;
      background-color: #1e1e1e;
    }
    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #97ae4a;
    }
  }
  .v-parallax__image {
    max-width: 100vw;
    opacity: 0.2 !important;
  }
  .v-main__wrap > .container{
    max-width: 100% !important;
  }
</style>
