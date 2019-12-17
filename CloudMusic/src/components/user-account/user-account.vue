<template>
  <transition name="user-status-fade">
    <div class="user-account-box" v-show="showFlag">
      <div class="user-account-wrap">
        <div class="list-border account-data">
          <ul>
            <li>
              <div class="num">9</div>
              <div class="text">动态</div>
            </li>
            <li>
              <div class="num">20</div>
              <div class="text">关注</div>
            </li>
            <li>
              <div class="num">4</div>
              <div class="text">粉丝</div>
            </li>
          </ul>
          <div class="attendance">
            <span class="attendance-content">
              <i class="fa fa-database" aria-hidden="true"></i>
              签到
            </span>
          </div>
        </div>
        <div class="user-account-list list-border">
          <ul>
            <li>
              <div class="left">
                <span class="icon">
                  <i class="fa fa-vimeo" aria-hidden="true"></i>
                </span>
                <span>会员中心</span>
              </div>
              <div class="right">
                未订购
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </li>
            <li>
              <div class="left">
                <span class="icon">
                  <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                </span>
                <span>等级</span>
              </div>
              <div class="right">
                LV8
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </li>
            <li>
              <div class="left">
                <span class="icon">
                  <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                </span>
                <span>商城</span>
              </div>
              <div class="right">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="user-account-list list-border">
          <ul>
            <li>
              <div class="left">
                <span class="icon">
                  <i class="fa fa-cog" aria-hidden="true"></i>
                </span>
                <span>个人信息设置</span>
              </div>
              <div class="right">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </li>
            <li>
              <div class="left">
                <span class="icon">
                  <i class="fa fa-tablet" aria-hidden="true"></i>
                </span>
                <span>绑定社交账号</span>
              </div>
              <div class="right">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="user-account-list item">
          <ul>
            <li @click="_signOut">
              <div class="left">
                <span class="icon">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                </span>
                <span>退出登录</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { signOut } from 'api'
import { ERR_OK } from 'api/config'
import { mapActions } from 'vuex'

export default {
  name: 'user-account',
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created () {
  },
  components: {
  },
  methods: {
    _signOut () {
      signOut().then((res) => {
        if (res.code === ERR_OK) {
          this.clearUser()
          if (this.$route.path === '/recommend') {
            this.$router.go(0)
          }
          this.$router.push({ path: '/recommend' })
        }
      })
    },
    ...mapActions([
      'clearUser'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .user-account-box
    position: absolute
    top: 10px
    right: -310px
    z-index: 998
    &.user-fade-enter-active
      animation: user-fadein 0.3s
    .user-account-wrap
      width: 315px
      min-height: 390px
      background: #292929
      animation: user-zoom 0.3s
      .list-border
        border-bottom: 1px solid #353535
      .user-account-list
        padding: 5px 0
        ul
          li
            padding: 10px
            overflow: hidden
            cursor: pointer
            &:hover
              background: #444
            .left
              .icon
                margin: 0 10px 0 10px
                text-align: center
                width: 18px
                display: inline-block
            .right
              font-size: $font-size-small
              color: #7b7b7b
              i
                margin-left: 5px
      .account-data
        padding-top: 25px
        text-align: center
        .attendance
          margin: 20px 0 10px
          .attendance-content
            display: inline-block
            padding: 8px 25px
            border: 1px solid
            border-radius: 20px
            opacity: 0.7
            background: #696767
            color: #fff
            cursor: pointer
            &:hover
              opacity: 1
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
  @keyframes user-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes user-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
