import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login'
import main from '../components/main'
import overview from '../components/overview'
import carousel from '../components/carousel'
import carouselAdd from '../components/carouselAdd'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: login },
    { path: '/', name: '--', component: main ,children:[
      { path: '/overview', name: '概览', component: overview },
      { path: '/carousel', name: '广告', component: carousel },
      { path: '/carouselAdd', name: '新增广告', component: carouselAdd },
    ]}
  ]
})
