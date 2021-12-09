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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
