import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
import Login from '../components/Login.vue'
import AppIndex from '../components/home/AppIndex.vue'
import Register from '../components/Register.vue'
import Home from '../components/home/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/admin/user/User.vue'
import Role from '../components/admin/user/Role.vue'

import Power from '../components/admin/user/Power.vue'
import Word from '../components/admin/content/Word.vue'
import Listen from '../components/admin/content/Listen.vue'
import Book from '../components/admin/content/Book.vue'
import Article from '../components/admin/content/Article.vue'
import TestResult from '../components/admin/test/TestResult.vue'
import TestAnalysis from '../components/admin/test/TestAnalysis.vue'
import Message from '../components/admin/message/Message.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'AppIndex',
    component: AppIndex
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/role',
        name: 'Role',
        component: Role
      },
      {
        path: '/power',
        name: 'Power',
        component: Power
      },
      {
        path: '/word',
        name: 'Word',
        component: Word
      },
      {
        path: '/listen',
        name: 'Listen',
        component: Listen
      },
      {
        path: '/book',
        name: 'Book',
        component: Book
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/testResult',
        name: 'TestResult',
        component: TestResult
      },
      {
        path: '/testAnalysis',
        name: 'TestAnalysis',
        component: TestAnalysis
      },
      {
        path: '/message',
        name: 'Message',
        component: Message
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
