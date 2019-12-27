<template>
  <div class="user-box">
    <scroll ref="scroll" :data="createdListres && otherLists" class="user-wrap">
      <div class="user-content">
        <div class="user-info">
          <div class="avatar-img">
            <img :src="userDetail.profile.avatarUrl" alt="" width="100%">
          </div>
          <div class="user-info-details">
            <div class="user-ifo-top">
              <span class="user-name">{{userDetail.profile.nickname}}</span>
              <span class="level">Lv.{{userDetail.level}}</span>
            </div>
            <div class="account-data">
              <account-data></account-data>
            </div>
            <div class="user-info-list">
              <ul>
                <li>所在地区:
                  <span v-if="district.province">{{district.province}}</span>
                  <span v-if="district.city">{{district.city}}</span>
                </li>
                <li>个人介绍: <span>{{detailDescription}}</span></li>
              </ul>
            </div>
          </div>
          <router-link to="/editUserInfo" tag="div" class="edit-user-info">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <span>编辑个人信息</span>
          </router-link>
        </div>
        <div class="user-musics-box">
          <music-list :musicList="createdListres" :musicTitle="createdTitle" :listNum="listNum"></music-list>
          <music-list :musicList="otherLists" :musicTitle="otherTitle" :listNum="listNum"></music-list>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import AccountData from 'base/account-data/account-data'
import MusicList from 'base/music-list/music-list'
import { userDetail } from 'api'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/Scroll'
import { musicListMixin, inquireDistrictMixin } from 'common/js/mixin'

export default {
  name: 'user',
  data () {
    return {
      userDetail: {
        profile: {}
      },
      listNum: 'playlist'
    }
  },
  mixins: [musicListMixin, inquireDistrictMixin],
  computed: {
    detailDescription () {
      return this.userDetail.profile.detailDescription ? this.userDetail.profile.detailDescription : '暂无介绍'
    },
    createdTitle () {
      return `我创建的歌单 (${this.createdListres.length})`
    },
    otherTitle () {
      return `我收藏的歌单 (${this.otherLists.length})`
    }
  },
  created () {
    if (this.user.length) {
      this._userDetail()
    }
  },
  components: {
    AccountData,
    MusicList,
    Scroll
  },
  methods: {
    _userDetail () {
      userDetail({uid: this.user[0].profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this.userDetail = res
          this.inquireDistrict(this.userDetail.profile.province)
          this.inquireDistrict(this.userDetail.profile.city)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .user-box
    padding-bottom: 15px
    width: 1140px
    position: fixed
    left: $aisde-width
    right: 0
    margin: auto
    bottom: 0
    top: 76px
    z-index: 1
    .user-wrap
      height: 100%
      overflow: hidden
      .user-content
        .user-info
          margin-bottom: 30px
          padding-top: 15px
          display: flex
          align-items: center
          font-size: $font-size-small
          .avatar-img
            width: 195px
            height: 195px
            border-radius: 50%
            overflow: hidden
            margin-right: 30px
          .user-info-details
            flex: 1
            margin-right: 30px
            .user-ifo-top
              .user-name
                font-size: $font-size-large-x
                margin-right: 15px
              .level
                color: #fff
            .account-data
              width: 190px
              margin: 15px 0
            .user-info-list
              ul
                li
                  margin-bottom: 10px
                  span
                    color: #7b7b7b
                    margin-right: 5px
          .edit-user-info
            height: 30px
            line-height: 30px
            padding: 0 10px
            border: 1px solid
            border-radius: 20px
            opacity: 0.7
            color: #fff
            cursor: pointer
            &:hover
              opacity: 1
              background: #2d2c2c
</style>
