<template>
  <div class="song-list-box">
    <div class="song-list-wrap" :class="{'fixed': enabled}">
      <scroll ref="scroll" :data="songList" class="list-box">
        <table class="table-box">
          <thead v-if="thead">
            <tr>
                <th width="125"></th>
                <th>音乐标题</th>
                <th width="215">歌手</th>
                <th width="285">专辑</th>
                <th width="130">时长</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in songList" :key="index">
              <td class="gray" width="100">
                <span class="index-box">
                {{index | plusZero}}
                </span>
                <span class="icon-box">
                  <i class="fa" aria-hidden="true" :class="className(item.id)"></i>
                </span>
              </td>
              <td v-if="item.name" class="name" :title="item.name + '' + item.alia">
                <span v-html="changeColor(item.name)"></span>
                <span class="alia gray" v-if="item.alia" v-html="changeColor(item.alia)"></span>
                <span class="iconMv" v-if="item.mvId">
                  <i class="active fa fa-play-circle-o" aria-hidden="true"></i>
                </span>
              </td>
              <td v-if="item.author" v-html="changeColor(item.author)" :title="item.author"></td>
              <td v-if="item.album" v-html="changeColor(item.album)" :title="item.album"></td>
              <td class="gray" v-if="item.duration" :title="item.duration">{{item.duration}}</td>
              <td v-if="item.playCount" class="gray" width="130">{{item.playCount}} 次</td>
            </tr>
          </tbody>
        </table>
        <div class="no-result-wrapper" v-if="thead && query && songList.length === 0">
          <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
        <div class="loading-container-other" v-show="!songList.length && showLoading && !query">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { mapGetters } from 'vuex'
import { likeList } from 'api'
import { ERR_OK } from 'api/config'

export default {
  name: 'song-list',
  props: {
    songList: {
      type: Array,
      default: () => []
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    enabled: {
      type: Boolean,
      default: true
    },
    thead: {
      type: Boolean,
      default: false
    },
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      likeList: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    changeColor () {
      return function (value) {
        if (this.query && this.query.length > 0) {
          const result = value.replace(new RegExp(this.query, 'g'), `<p style="display: inline-block; color: #94d9ff;">${this.query}</p>`)
          return result
        } else {
          return value
        }
      }
    }
  },
  created () {
    this._likeList()
  },
  components: {
    Scroll,
    Loading,
    NoResult
  },
  methods: {
    _likeList () {
      likeList({uid: this.user[0].profile.userId}).then((res) => {
        if (res.code === ERR_OK) {
          this.likeList = res.ids
        }
      })
    },
    className (id) {
      return this.likeList.includes(id) ? 'active fa-heart' : 'fa-heart-o'
    },
    disable () {
      this.$refs.scroll.disable()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .song-list-box
    .fixed
       position: fixed
       left: $aisde-width
       width: 1200px
       bottom: 0
       top: 135px
       z-index: 1
    .song-list-wrap
       .list-box
         height: 100%
         overflow: hidden
         .no-result-wrapper,.loading-container-other
           position: absolute
           bottom: 0
           left: 50%
           transform: translate(-50%, -50%)
          .loading-container-other
            bottom: 20%
         table.table-box
           border: none
           border-collapse: collapse
           width: 100%
           max-width: 100%
           white-space: nowrap
           text-align: left
           font-size: $font-size-small
           tr
             height: 35px
             line-height: 35px
           thead
             th
               font-weight: normal
               color: #6e6e6e
           tbody
             tr
               &:nth-child(even)
                 background: #202020
               &:hover
                 background: #292929
               .index-box,.icon-box
                 margin-right: 15px
                 font-size: $font-size-small
                 color: #7b7b7b
                .icon-box,.iconMv
                  i
                    margin-right: 10px
                    cursor: pointer
                    &.active
                      color: $color-main
               td
                 text-overflow: ellipsis
                 overflow: hidden
                 white-space: nowrap
                 padding-right: 20px
                 &.name span
                   display: inline-block
                   margin-left: 5px
                 &:first-child
                   padding-left: 34px
</style>
