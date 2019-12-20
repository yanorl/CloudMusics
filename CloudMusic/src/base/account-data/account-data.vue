<template>
  <div class="account-data-box">
    <div class="account-data-content" v-show="userEventNum && userFollowsNum && userFollowedsNum">
      <ul>
        <li>
          <div class="num">{{userEventNum}}</div>
          <div class="text">动态</div>
        </li>
        <li>
          <div class="num">{{userFollowsNum}}</div>
          <div class="text">关注</div>
        </li>
        <li>
          <div class="num">{{userFollowedsNum}}</div>
          <div class="text">粉丝</div>
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!userEventNum && !userFollowsNum && !userFollowedsNum">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { userEvent, userFollows, userFolloweds } from 'api'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'

export default {
  name: 'account-data',
  data () {
    return {
      userEventNum: 0,
      userFollowsNum: 0,
      userFollowedsNum: 0
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  components: {
    Loading
  },
  created () {
    this._userEvent()
    this._userFollows()
    this._userFolloweds()
  },
  methods: {
    _userEvent () {
      userEvent({uid: this.user[0].profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this.userEventNum = res.events.length
        }
      })
    },
    _userFollows () {
      userFollows({uid: this.user[0].profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this.userFollowsNum = res.follow.length
        }
      })
    },
    _userFolloweds () {
      userFolloweds({uid: this.user[0].profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this.userFollowedsNum = res.followeds.length
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .account-data-box
    ul
      display: flex
      align-items: center
      justify-content: space-around
      li
        opacity: 0.7
        cursor: pointer
        &:hover
          opacity: 1
        .num
          font-size: $font-size-big
          color: #fff
</style>
