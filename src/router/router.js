import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
      },
      {
        path: 'column/:type',
        name: '专栏',
        component: () => import(/* webpackChunkName: "articleList" */ '../views/articleList.vue')
      },
      {
        path: 'skill/:type',
        name: '技术',
        component: () => import(/* webpackChunkName: "articleList" */ '../views/articleList.vue')
      },
      {
        path: 'life/:type',
        name: '生活',
        component: () => import(/* webpackChunkName: "articleList" */ '../views/articleList.vue')
      },
      {
        path: 'detail/:id',
        name: '文章详情',
        component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue')
      },
    ]
  },
  {
    path: '/release',
    name: '写文章',
    component: () => import(/* webpackChunkName: "release" */ '../views/release.vue')
  },
  {
    path: '/success',
    name: '发布成功',
    component: () => import(/* webpackChunkName: "success" */ '../views/success.vue')
  },
  {
    path: '/userlist',
    name: '用户',
    component: () => import(/* webpackChunkName: "userList" */ '../views/userList.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: '注册',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('setTitle',to.name)
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    let title = store.state.pageTitle
    window.document.title = title? title : 'my home' 
  }, 0)
 })

export default router
