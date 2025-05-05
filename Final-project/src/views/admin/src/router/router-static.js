import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import yonghu from '@/views/modules/yonghu/list'
    import shangpinfenlei from '@/views/modules/shangpinfenlei/list'
    import discussshangpinxinxi from '@/views/modules/discussshangpinxinxi/list'
    import shangpinxinxi from '@/views/modules/shangpinxinxi/list'
    import orders from '@/views/modules/orders/list'
    import config from '@/views/modules/config/list'


//2.配置路由   注意：名字
const routes = [{
    path: '/index',
    name: 'System Home',
    component: Index,
    children: [{
      // 这里不设置Picture，yes把main作为Default页面
      path: '/',
      name: 'System Home',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: '/updatePassword',
      name: 'modification Password',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: 'Pay',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: 'personal information',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: 'News',
        component: news
      }
      ,{
	path: '/yonghu',
        name: 'user',
        component: yonghu
      }
      ,{
	path: '/shangpinfenlei',
        name: 'Commodity classification',
        component: shangpinfenlei
      }
      ,{
	path: '/discussshangpinxinxi',
        name: 'Commodity informationComment',
        component: discussshangpinxinxi
      }
      ,{
	path: '/shangpinxinxi',
        name: 'Commodity information',
        component: shangpinxinxi
      }
      ,{
        path: '/orders/:status',
        name: 'OrderManagement',
        component: orders
      }
      ,{
	path: '/config',
        name: 'Carousel image Management',
        component: config
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: 'System Home',
    redirect: '/index'
  }, /*Default跳转路由*/
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//modification 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
