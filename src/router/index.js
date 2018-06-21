import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login'
import main from '../components/main'
import overview from '../components/overview'
import carousel from '../components/carousel'
import carouselAdd from '../components/carouselAdd'
import register from '../components/register'
import schoolAdd from '../components/schoolAdd'
import school from '../components/school'
import student from '../components/student'
import studentAdd from '../components/studentAdd'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: login },
    { path: '/register', name: '注册', component: register },
    { path: '/', name: '--', component: main ,children:[
      { path: '/overview', name: '概览', component: overview },
      { path: '/carousel', name: '广告', component: carousel },
      { path: '/carouselAdd', name: '新增广告', component: carouselAdd },
      { path: '/schoolAdd', name: '新增单位', component: schoolAdd },
      { path: '/school', name: '单位列表', component: school },
      { path: '/student', name: '学生列表', component: student },
      { path: '/studentAdd', name: '新增学生', component: studentAdd },
    ]}
  ]
})