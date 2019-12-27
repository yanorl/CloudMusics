import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const user = (resolve) => {
  import('components/user/user').then((module) => {
    resolve(module)
  })
}

const userRecord = (resolve) => {
  import('components/user-record-list/user-record-list').then((module) => {
    resolve(module)
  })
}

const editUserInfo = (resolve) => {
  import('components/edit-user-info/edit-user-info').then((module) => {
    resolve(module)
  })
}

const songListView = (resolve) => {
  import('base/song-list-view/song-list-view').then((module) => {
    resolve(module)
  })
}

const test = (resolve) => {
  import('components/test').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/userRecord',
      component: userRecord
    },
    {
      path: '/editUserInfo',
      component: editUserInfo
    },
    {
      path: '/songListView',
      component: songListView
    },
    {
      path: '/test',
      component: test
    }
  ]
})
