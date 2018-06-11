<template>

  <section class="container">
    <h1>Add Author</h1>

    <form @submit.prevent="saveContact">

      <div class="field">
        <label class="label">Başlık</label>
        <div class="control">
          <input class="input" type="text" placeholder="First Name" v-model="vm.name" required>
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
          createDate: null,
        }
      }
    },
    methods: {
      saveContact() {
        let d = new Date().getTime()
        var self = this;
        db.collection('author').add({
          name: this.vm.name,
          createDate: d,
          slug: this.generateUUID()
        })
          .then(function (docRef) {
            alert("Kayıt Başarılı");
            self.vm.name = "";
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

</style>
