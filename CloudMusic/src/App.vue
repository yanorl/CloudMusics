<template>
  <div id="app" @click="changeSearchStatus">
    <my-header></my-header>
    <div class="wrap-box">
      <div class="aside-box">
        <my-aside></my-aside>
      </div>
      <div class="wrap-content">
        <router-view/>
      </div>
    </div>
    <my-play></my-play>
  </div>
</template>

<script>
import MyHeader from 'components/header/header'
import MyAside from 'components/aside/aside'
import MyPlay from 'components/player/player'
import { checkPhone } from 'api'
import { ERR_OK } from 'api/config'
import { mapMutations, mapGetters } from 'vuex'

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
    MyPlay
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
    ...mapMutations({
      searchFlag: 'SET_SEARCH_STATUS'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
#app
  overflow: hidden
#app,.wrap-box,.aside-box
  height: 100%
.wrap-box
  display: flex
  .aside-box
    width: $aisde-width
  .wrap-content
    flex: 1
</style>
