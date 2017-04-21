import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import me from '@/components/me'
import life from '@/components/life'
import study from '@/components/study'
import discuss from '@/components/discuss'
import music from '@/components/music'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: '/home',
      component: home   //首页
    },
    {
      path: '/me',
      component: me   //关于我
    },
    {
      path: '/life',
      component: life   //生活
    },
    {
      path: '/study',
      component: study   //学无止境
    },
    {
      path: '/discuss',
      component: discuss   //留言板
    },
    {
      path: '/music',
      component: music   //音乐
    }
  ],
  scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
	      return savedPosition
	    } else {
	      return { x: 0, y: 0 }
	    }
	}
})

