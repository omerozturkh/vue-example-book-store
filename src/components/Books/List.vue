<template>
  <section class="container">
    <div class="columns">
      <div class="column is-8">
        <h1>All Books</h1>

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


        <div class="user-list" v-for="book in books">
          <div class="columns">
            <div class="column is-8">
              <p class="user-list__header">{{book.name}}</p>
              <div class="inner">
                <div class="left">
                  <p>Yazar : {{ book.author.name }}</p>
                  <p>{{ book.content }}</p>
                  <p>Category:
                    <span class="label label-info" v-for="catName in book.categories">
                    {{ catName }}
                  </span>
                  </p>
                </div>
                <div class="right">
                  <p class="user-list__sub"><strong>Create Date</strong>: {{book.createDate}}</p>

                </div>
              </div>
            </div>
            <div class="column is-4 right">
              <a @click.prevent="deleteMessage(book)">Delete</a>
            </div>

          </div>
        </div>
        -

      </div>
    </div>
  </section>

</template>

<script>
  import db from '@/components/firebaseInit'
  import {mapState} from 'vuex';


  export default {
    name: 'list',
    computed: {
      ...mapState(['user']),
    },
    data() {
      return {
        books: [],
        loading: true
      }
    },
    created() {
      const cats = [];
      const catRef = db.collection('category');
      catRef.get().then((catSnapshot) => {
        catSnapshot.forEach((result) => {
          let data = result.data();
          cats.push({
            id: result.id,
            name: data.name,
          })
        });

        const bookRef = db.collection('books');
        bookRef.get().then((onSnapshot) => {
          let promises = [];
          let promisesCategory = [];
          onSnapshot.forEach((result) => {
            const data = result.data();

            this.books.push({
              'id': result.id,
              'name': data.name,
              'author': data.author,
              'category': data.category,
              'categories': [],
              'content': data.content,
              'createDate': data.createDate,
              'slug': data.slug,
            });

            promises.push(data.author);
            promisesCategory.push(data.category);


          });


          promisesCategory = _.uniq(promisesCategory).map(catId => cats);
          promises = _.uniq(promises).map(authorId => db.collection('author').doc(authorId).get());

          const authorObjects = {};
          Promise.all(promises).then((authors) => {
            authors.forEach(author => {
              authorObjects[author.id] = author.data()
            });
            this.books = this.books.map(book => {
              book.author = authorObjects[book.author];
              return book;
            });

            this.loading = false
          });

          const catObjects = {};
          Promise.all(promisesCategory).then((cats) => {
            cats[0].forEach(cat =>{

              catObjects[cat.id] = cat.name
            });


            this.books = this.books.map(book => {
              book.category.forEach((result) => {

                book.categories.push(catObjects[result]);
              });

              return book;
            });
console.log(this.books);
            this.loading = false
          });
        });

        //console.log(this.books)
      }).catch((e) => {
        console.log(e)
      })
    },
    methods: {
      deleteMessage: function (person) {
        var self = this;
        db.collection('book').doc(person.id).delete()
          .then(function () {
            let i = self.books.map(item => item.id).indexOf(person.id)
            self.books.splice(i, 1)
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
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
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

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0
    }
    100% {
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
  .label-info{
    padding: 5px;
    display: inline-block;
    background: #dbdbdb;
    margin-right: 2px;
    font-size: 12px;
  }
</style>
