<template>
  <div id="app" @click="changeSearchStatus">
    <my-header></my-header>
    <div class="wrap-box">
      <div class="aside-box">
        <my-aside></my-aside>
      </div>
      <div class="wrap-content">
        <recommend></recommend>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from 'components/header/header'
import MyAside from 'components/aside/aside'
import Recommend from 'components/recommend/recommend'
import { checkPhone } from 'api'
import { ERR_OK } from 'api/config'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  created () {
    // this._checkPhone()
  },
  computed: {
    ...mapGetters([
      'searchStatus'
    ])
  },
  components: {
    MyHeader,
    MyAside,
    Recommend
  },
  methods: {
    _checkPhone () {
      checkPhone({phone: 15920142495}).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    },
    changeSearchStatus () {
      if (this.searchStatus === true) {
        this.searchFlag(false)
      }
    },
    ...mapActions([
      'searchFlag'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
#app,.wrap-box,.aside-box
  height: 100%
.wrap-box
  display: flex
  .aside-box
    width: $aisde-width
  .wrap-content
    flex: 1
</style>
