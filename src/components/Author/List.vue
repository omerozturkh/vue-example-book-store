<template>
  <section class="container">
    <div class="columns">
      <div class="column is-8">
        <h1>All Author</h1>

        <div class="loader-section" v-if="loading">
          <div class="user-list">
            <div class="columns">
              <div class="column is-8">
                <p class="user-list__header animated-background__header"></p>
                <p class="user-list__sub animated-background__sub"></p>
                <p class="user-list__sub animated-background__sub"></p>
              </div>
              <div class="column is-4 right">
              </div>
            </div>
          </div>
        </div>

        <div class="user-list" v-for="author in authors">
          <div class="columns">
            <div class="column is-8">
              <p class="user-list__header">{{author.name}}</p>
              <div class="inner">
                <div class="right">
                  <p class="user-list__sub"><strong>Create Date</strong>: {{author.createDate}}</p>
                </div>
              </div>
            </div>
            <div class="column is-4 right">
              <a @click.prevent="deleteMessage(author)">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  import db from '@/components/firebaseInit'
  import { mapState } from 'vuex';
  export default {
    name: 'list',
    computed: {
      ...mapState(['user']),
    },
    data () {
      return {
        authors: [],
        loading: true
      }
    },
    created () {
      db.collection('author').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((auth) => {
          let data = auth.data()
          this.authors.push( {
            'id': auth.id,
            'name': data.name,
            'createDate': data.createDate,
            'slug': data.slug,
          })
        })
      })
    },
    methods: {
      deleteMessage: function (person) {
        var self = this;
        db.collection('author').doc(person.id).delete()
          .then(function () {
            let i = self.authors.map(item => item.id).indexOf(person.id)
            self.authors.splice(i,1)
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 30px;
    margin: 30px 0;
  }
  .user-list {
    margin-top: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.05);
  .column {
    height: 120px;
  }
  .inner {
  .left {
    width: 50%;
    float: left;
    text-align: left;
  }
  .right {
    width: 50%;
    float: left;
    text-align: left;
  p {
    width: 100%;
    text-align: left;
  }
  }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  button {
    background: #4B75FF;
  }
  }
  .user-list__header {
    font-size: 20px;
    font-weight: 700;
  }
  .user-list__sub {
    font-size: 15px;
    margin-top: 10px;
  }
  }
  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }
  .animated-background__header {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: #eeeeee;
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
    background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    -webkit-background-size: 800px 104px;
    background-size: 800px 104px;
    height: 20px;
    width: 400px;
    position: relative;
  }
  .animated-background__sub {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: placeHolderShimmer;
    animation-name: placeHolderShimmer;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: #eeeeee;
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
    background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    -webkit-background-size: 800px 104px;
    background-size: 800px 104px;
    height: 20px;
    width: 200px;
    position: relative;
  }
</style>
