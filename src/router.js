import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/index'
import Home from './views/home'
import ArticleList from './views/articleList'
import Release from './views/release'
import Detail from './views/detail'
import Success from './views/success'
import UserList from './views/userList'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Index,
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'column/:type',
          component: ArticleList,
        },
        {
          path: 'skill/:type',
          component: ArticleList,
        },
        {
          path: 'life/:type',
          component: ArticleList,
        },
        {
          path: 'detail/:id',
          component: Detail,
        },
      ]
    },
    {
      path: '/release',
      component: Release,
    },
    {
      path: '/success',
      component: Success
    },
    {
      path: '/userlist',
      component: UserList
    }
  ],
})

export default router
