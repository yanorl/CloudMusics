<template>
  <div class="aside-wrap">
    <div class="aside-top">
      <div class="avatar-box">
        <span class="avatar-wrap">
          <div class="login flex cursor" @click="changePersonalStatus" v-if="!user">
            <span class="avatar-img">
              <i class="fa fa-user-o" aria-hidden="true"></i>
            </span>
            <span class="avatar-name">
              未登录
            </span>
            <i class="fa fa-caret-right" aria-hidden="true"></i>
          </div>
          <div class="user-account flex" v-if="user">
            <router-link to="/user" class="avatar-img">
              <img :src="user.profile.avatarUrl" alt="" width="100%">
            </router-link>
            <span class="cursor" @click="accountInfo">
              <span class="avatar-name">
                {{user.profile.nickname}}
              </span>
              <i class="fa fa-caret-right" aria-hidden="true"></i>
              <user-account :showFlag="showFlag"></user-account>
            </span>
          </div>
        </span>
      </div>
    </div>
    <div class="aside-list">
      <dl>
        <router-link tag="dd" :to="item.link" :class="{'current': currentIndex === index}" v-for="(item, index) in asidList.datas" :key="index">
          <span class="icon">
            <i class="fa" :class="item.icon" aria-hidden="true"></i>
          </span>
          {{item.text}}
        </router-link>
      </dl>
      <dl>
        <dt>
          创建的歌单
          <span class="right">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </span>
        </dt>
        <dd>
          <span class="icon">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </span>
          我喜欢的音乐
        </dd>
        <dd v-for="item in createdListres" :key="item.id">
          <span class="icon">
            <i class="fa fa-music" aria-hidden="true"></i>
          </span>
          {{item.name}}
        </dd>
      </dl>
      <dl>
        <dt>
          收藏的歌单
          <span class="right">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </span>
        </dt>
        <dd v-for="item in otherLists" :key="item.id">
          <span class="icon">
            <i class="fa fa-music" aria-hidden="true"></i>
          </span>
          {{item.name}}
        </dd>
      </dl>
    </div>
    <personal-status ref="PersonalStatus"></personal-status>
  </div>
</template>

<script>
import { playlist } from 'api'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import PersonalStatus from 'base/personal-status/personal-status'
import UserAccount from 'components/user-account/user-account'

export default {
  name: 'aside-box',
  data () {
    return {
      showFlag: false,
      currentIndex: 0,
      asidList: {
        datas: [
          {
            icon: 'fa-music',
            text: '发现音乐',
            link: '/test'
          },
          {
            icon: 'fa-forumbee',
            text: '私人FM',
            link: '/test'
          },
          {
            icon: 'fa-music',
            text: '发现音乐',
            link: '/test'
          },
          {
            icon: 'fa-stop-circle-o',
            text: '视频',
            link: '/test'
          },
          {
            icon: 'fa-user',
            text: '朋友',
            link: '/test'
          }
        ]
      },
      createdListres: [],
      otherLists: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    if (this.user) {
      this._playlist()
    }
  },
  components: {
    PersonalStatus,
    UserAccount
  },
  mounted () {
    document.addEventListener('click', this.handleDocumentClick)
  },
  methods: {
    changePersonalStatus () {
      this.$refs.PersonalStatus.show()
    },
    _playlist () {
      playlist({uid: this.user.profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this._normalizeList(res.playlist)
        }
      })
    },
    _normalizeList (list) {
      list.forEach((item) => {
        let defaultAvatar = item.creator.defaultAvatar
        if (defaultAvatar) {
          this.createdListres.push(item)
        } else {
          this.otherLists.push(item)
        }
      })
    },
    accountInfo () {
      this.showFlag = true
    },
    handleDocumentClick (e) {
      if (this.showFlag && !this.$el.contains(e.target)) {
        this.showFlag = false
      }
    }
  },
  destroyed () {
    document.removeEventListener('click', this.handleDocumentClick)
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .aside-wrap
      padding: 0 14px 0 0
      box-sizing: border-box
      background: $asid-background
      height: 100%
      .aside-top
        padding: 20px
        position: relative
        .avatar-box .flex
          display: flex
          align-items: center
          .avatar-img
            img
              width: 40px
              height: 40px
              border-radius: 50%
            i
              font-size: $font-size-i-big
              display: inline-block
              vertical-align: middle
          .avatar-name
            margin: 0 10px 0 22px
      .aside-list
        height: 100%
        dl
          margin-bottom: 15px
          dt,dd
            padding-left: 25px
          dt
            color: $color-i
            height: 35px
            line-height: 35px
          dd
            color: #c4c4c4
            height: 46px
            line-height: 46px
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
            cursor: pointer
            &.current, &:hover
              background: #141414
              color: $color-main
              i
                color: $color-main
            i
              color: $color-i
              margin-right: 10px
</style>
