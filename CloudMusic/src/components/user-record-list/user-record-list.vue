<template>
  <div class="user-record-list-box">
    <div class="user-record-list-wrap">
      <div class="user-record-list-content">
        <div class="tab-box clearfix">
          <ul>
            <li @click="clickItem(1)" :class="{'acitve': index === 1 }">最近一周</li>
            <li @click="clickItem(0)" :class="{'acitve': index === 0 }">所有时间</li>
          </ul>
        </div>
        <div class="user-record-list" v-show="userRecord.length > 0 && !showLoading">
          <scroll ref="scroll" :data="userRecord" class="list-box">
            <ul>
              <li v-for="(item, index) in userRecord" :key="index">
                <span class="index-box">{{index | plusZero}}</span>
                <div class="icon-box">
                  <i class="fa" aria-hidden="true" :class="className(item.like)"></i>
                </div>
                <div class="song-name">{{item.name}} <span class="alia" v-if="item.alia">({{item.alia}})</span></div>
                <span class="num">{{item.playCount}} 次</span>
              </li>
            </ul>
          </scroll>
        </div>
        <div class="loading-container" v-show="!userRecord.length && showLoading">
          <loading></loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userRecord, likeSong } from 'api'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import Record from 'common/js/userRecord'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/loading'

export default {
  name: 'user-record-list',
  data () {
    return {
      userRecord: [],
      index: 1,
      showLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    this._userRecord(1)
  },
  components: {
    Scroll,
    Loading
  },
  methods: {
    _userRecord (types) {
      this.showLoading = true
      userRecord({uid: this.user[0].profile.userId, type: types}).then((res) => {
        if (res.code === ERR_OK) {
          if (types === 1) {
            this.showLoading = false
            this.userRecord = this._normalizeRecord(res.weekData)
          } else {
            this.showLoading = false
            this.userRecord = this._normalizeRecord(res.allData)
          }
        }
      })
    },
    _normalizeRecord (list) {
      let map = []
      list.forEach((item, index) => {
        map.push(new Record({
          name: item.song.name,
          alia: item.song.alia[0],
          playCount: item.playCount
        }))
        this._likeSong(item.song.id).then((res) => {
          map[index].like = res
        })
      })
      return map
    },
    async _likeSong (value) {
      var like = ''
      await likeSong({id: value, timestamp: (new Date()).valueOf()}).then((res) => {
        if (res.code === ERR_OK) {
          like = 1
        } else {
          like = 0
        }
      })
      return like
    },
    className (name) {
      return name ? 'love fa-heart' : 'fa-heart-o'
    },
    clickItem (num) {
      this._userRecord(num)
      this.index = num
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .user-record-list-content
    margin-top: 10px
    .tab-box
      border-bottom: 2px solid #262626
      ul
        li
          padding: 10px 0 10px 30px
          float: left
          cursor: pointer
          &.acitve
            font-weight: bold
            color: #fff
     .user-record-list
       position: fixed
       left: $aisde-width
       width: 1200px
       bottom: 0
       top: 135px
       z-index: 1
       .list-box
         height: 100%
         overflow: hidden
         ul
           li
             padding-left: 30px
             display: flex
             height: 30px
             line-height: 30px
             &:nth-child(even)
               background: #202020
             &:hover
               background: #292929
             .index-box,.icon-box
               margin-right: 15px
               font-size: $font-size-small
               color: #7b7b7b
              .icon-box
                i
                  margin-right: 10px
                  &.love
                    color: $color-main
              .song-name
                flex: 1
                .alia
                  font-size: $font-size-small
                  color: #7b7b7b
              .num
                width: 160px
                color: #4b4b4b
                font-size: $font-size-small
</style>
