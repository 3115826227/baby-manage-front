import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
    {
      path: '/index',
      name: '首页',
      component: () => import('@/components/Index'),
      children: [
          {
              path: '/user',
              index: 1,
              name: '用户管理',
              component: () => import('@/components/Main/user.vue'),
              children: [
                  {
                      path: '/user/info',
                      index: 101,
                      name: '用户信息',
                      component: () => import('@/components/Main/userinfo.vue')
                  },
                  {
                      path: '/user/coin',
                      index: 101,
                      name: '用户积分',
                      component: () => import('@/components/Main/usercoin.vue')
                  },
                  {
                      path: '/user/login/log',
                      index: 102,
                      name: '用户登录日志',
                      component: () => import('@/components/Main/userloginlog.vue')
                  }
              ]
          }, 
          {
            path: '/commodity',
            index: 2,
            name: '商品管理',
            component: () => import('@/components/Main/commodity.vue')
          },
          {
            path: '/order',
            index: 3,
            name: '订单管理',
            component: () => import('@/components/Main/order.vue')
          },
          {
            path: '/system',
            index: 4,
            name: '系统管理',
            component: () => import('@/components/Main/system.vue')
          }
      ]
     }, {
        path: '/',
        component: () => import('@/components/Login'),
        hidden: true
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()


export default router