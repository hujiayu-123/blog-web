import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/index'
import ArticleList from './views/articleList'
import Release from './views/release'
import Detail from './views/detail'

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
    },
    {
      path: '/home',
      component: Index,
    },
    {
      path: '/column/:type',
      component: ArticleList,
    },
    {
      path: '/skill/:type',
      component: ArticleList,
    },
    {
      path: '/life/:type',
      component: ArticleList,
    },
    {
      path: '/release',
      component: Release,
    },
    {
      path: '/detail/:id',
      component: Detail,
    },
  ],
})

export default router
