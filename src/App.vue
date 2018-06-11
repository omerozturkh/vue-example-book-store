<template>
  <div id="app">
    <div v-if=user class="container">
      <button v-on:click="signOut">Sign Out</button>
      <div>{{ user.displayName }}</div>
      <div class="nav">
        <router-link class="button is-primary" to="/">List Category</router-link>
        <router-link class="button is-primary" to="/catAdd">Add Category</router-link>
        <router-link class="button is-primary" to="/listAuthor">List Author</router-link>
        <router-link class="button is-primary" to="/authorAdd">Add Author</router-link>
        <router-link class="button is-primary" to="/listBook">List Book</router-link>
        <router-link class="button is-primary" to="/addBook">Add Book</router-link>
      </div>

      <router-view/>
    </div>
    <div v-else>
      <button v-on:click="signInWithGoogle">Sign in with Google</button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import db from './components/firebaseInit'
  import { mapState } from 'vuex';

  export default {
    name: 'App',
    computed: {
      ...mapState(['user']),
    },
    created: function () {

      firebase.auth().onAuthStateChanged((user) => {
        this.user = user
        this.loading = true
        /*
        this.$store.commit('setUser', user || false);
        if (user && this.$route.path === '/login') {
          this.user = user
          this.loading = true
          this.$router.replace('/');
        } else if (!user && this.$route.path !== '/login') {
          this.$router.replace('/login');
        }
        */

      });

    },

    data() {
      return {
        loading: true,
        user: null,
      }
    },

    methods: {
      signInWithGoogle: function () {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.user = result.user
        }).catch(error => console.log(error.message))
      },
      signOut: function () {
        firebase.auth().signOut().then(() => {
          this.user = null
        }).catch(error => console.log(error.message))
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
