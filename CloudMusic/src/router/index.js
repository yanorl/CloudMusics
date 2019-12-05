import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Hello = (resolve) => {
  import('components/HelloWorld').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/hello',
      component: Hello
    }
  ]
})
