import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login'

import CategoryEdit from '../views/catagoryEdit.vue'
import CategoryList from '../views/categoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login,
    name:'login',
    meta:{isPublic:true}
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},
      {path:'/categories/list',component:CategoryList},

      {path:'/items/create',component:ItemEdit},
      {path:'/items/edit/:id',component:ItemEdit,props:true},
      {path:'/items/list',component:ItemList},

      {path:'/heros/create',component:HeroEdit},
      {path:'/heros/edit/:id',component:HeroEdit,props:true},
      {path:'/heros/list',component:HeroList},

      {path:'/articles/create',component:ArticleEdit},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      {path:'/articles/list',component:ArticleList},

      {path:'/ads/create',component:AdEdit},
      {path:'/ads/edit/:id',component:AdEdit,props:true},
      {path:'/ads/list',component:AdList},

      {path:'/admin_users/create',component:AdminUserEdit},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},
      {path:'/admin_users/list',component:AdminUserList,props:AdList}
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from,next) => {
  console.log(to.meta);
  // ????????????????????????meta????????????isPubulic??????????????????token?????????????????????url?????????????????????????????????
  if(!to.meta.isPublic&&!localStorage.token){
    return next('/login')
  }
  next()
})

export default router
