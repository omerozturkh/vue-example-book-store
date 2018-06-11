import Vue from 'vue'
import Router from 'vue-router'
import NewCategory from '@/components/Category/Add'
import ListCategory from '@/components/Category/List'
import NewAuthor from '@/components/Author/Add'
import ListAuthor from '@/components/Author/List'
import ListBook from '@/components/Books/List'
import AddBook from '@/components/Books/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'list',
      component: ListCategory
    },

    {
      path: '/catAdd',
      name: 'add',
      component: NewCategory
    },
    {
      path: '/listAuthor',
      name: 'list',
      component: ListAuthor
    },
    {
      path: '/authorAdd',
      name: 'add',
      component: NewAuthor
    },
    {
      path: '/listBook',
      name: 'list',
      component: ListBook
    },
    {
      path: '/addBook',
      name: 'add',
      component: AddBook
    },


  ]
})
