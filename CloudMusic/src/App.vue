<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/hello"><i class="fa fa-music" aria-hidden="true"></i>hello</router-link>
    <router-view/>
  </div>
</template>

<script>

import { checkPhone } from 'api'
import { ERR_OK } from 'api/config'

export default {
  name: 'App',
  created () {
    this._checkPhone()
  },
  components: {
  },
  methods: {
    _checkPhone () {
      checkPhone({phone: 15920142495}).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>

</style>
