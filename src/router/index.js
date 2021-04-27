import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
// 此处配置路由信息
const router = new VueRouter ({
  routes: [
    {
      // 这是路由重定向
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
  //挂载路由导航守卫
  router.beforeEach((to,from,next) => {
    // to是将要访问的路径 
    //from代表从哪个路径跳转而来
    //next()是一个函数，表示放行
    //next('/login')表示强制跳转
    if(to.path === '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
  })
  
export default router
