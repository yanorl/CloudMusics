import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const recommend = (resolve) => {
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

const artist = (resolve) => {
  import('components/artist/artist').then((module) => {
    resolve(module)
  })
}

const album = (resolve) => {
  import('components/album/album').then((module) => {
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
      component: recommend
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: user
    },
    {
      path: '/userRecord/:userId',
      name: 'userRecord',
      component: userRecord
    },
    {
      path: '/editUserInfo',
      component: editUserInfo
    },
    {
      path: '/songListView/:id',
      name: 'songListView',
      component: songListView
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: artist
    },
    {
      path: '/album/:id',
      name: 'album',
      component: album
    },
    {
      path: '/test',
      component: test
    }
  ]
})
