<template>

  <section class="container">
    <h1>Add New Book</h1>

    <form @submit.prevent="saveContact">

      <div class="field">
        <label class="label">Başlık</label>
        <div class="control">
          <input class="input" type="text" placeholder="" v-model="vm.name" required>
        </div>
      </div>

      <div class="field">
        <label class="label">Açıklama</label>
        <div class="control">
          <textarea v-model="vm.content"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Kategori</label>
        <div class="control">
          <select v-model="vm.category" multiple>
            <option v-for="item in category" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Yazar</label>
        <div class="control">
          <select v-model="vm.author">
            <option v-for="item in author" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button type="submit" class="button is-link">Submit</button>
        </div>
      </div>

    </form>
  </section>

</template>
<script>
  import db from '@/components/firebaseInit'
  import { mapState } from 'vuex';
  export default {
    name: 'add',
    computed: {
      ...mapState(['user']),
    },
    data() {
      return {
        vm: {
          name: null,
          content: null,
          category: null,
          author: null,
          userId: null,
          createDate: null,
        },
        category: [],
        author: []
      }
    },
    created () {
      db.collection('category').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((cat) => {
          let data = cat.data();
          this.category.push({
            'id': cat.id,
            'name': data.name,
            'slug': data.slug
          })
        })
      })

      db.collection('author').get().then((querySnapshot) => {
        this.loading = false
        querySnapshot.forEach((auth) => {
          let data = auth.data();
          this.author.push({
            'id': auth.id,
            'name': data.name,
            'slug': data.slug
          })
        })
      })

    },
    methods: {
      saveContact() {
        let d = new Date().getTime()
        var self = this;
        db.collection('books').add({
          name: this.vm.name,
          content: this.vm.content,
          category: this.vm.category,
          author: this.vm.author,
          userId: '',
          createDate: d,
          slug: this.generateUUID()
        })
          .then(function (docRef) {
            alert("Kayıt Başarılı");
            self.vm.name = "";
            self.vm.content = "";
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })

      },
      generateUUID() {
        let d = new Date().getTime()
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
      }
    }
  }
</script>


<style scoped>

  section {
    height: 100vh;
  }

  h1 {
    font-size: 30px;
    margin: 30px 0;
  }

  .input {
    height: 40px;
  }
  select{
    width: 100%;
  }

</style>
