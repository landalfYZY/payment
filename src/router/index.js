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
import own from '../components/own'
import wxuser from '../components/wxuser'
import payAdd from '../components/payAdd'
import payFilter from '../components/payFilter'
import bankCard from '../components/bankCard'
import payList from '../components/payList'
import orderlist from '../components/orderlist'
import bankCardAdd from '../components/bankCardAdd'
import bankCardUpdate from '../components/bankCardUpdate'

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
      { path: '/own', name: '个人设置', component: own },
      { path: '/wxuser', name: '微信用户', component: wxuser },
      { path: '/payAdd', name: '新增缴费项', component: payAdd },
      { path: '/payFilter', name: '缴费项过滤', component: payFilter },
      { path: '/bankCard', name: '银行卡列表', component: bankCard },
      { path: '/payList', name: '缴费项列表', component: payList },
      { path: '/orderlist', name: '订单列表', component: orderlist },
      { path: '/bankCardAdd', name: '添加银行卡', component: bankCardAdd },
      { path: '/bankCardUpdate', name: '更新银行卡', component: bankCardUpdate },
    ]}
  ]
})
