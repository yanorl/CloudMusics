<template>
  <div class="song-list-view-box">
    <scroll ref="scroll" :data="creator && songList.items" class="song-list-view-wrap">
      <div class="song-list-view-content">
       <song-list-view-info :songlistViewArray="songlistViewArray" :creator="creator"></song-list-view-info>
        <div class="tab-box clearfix">
          <ul>
            <li class="current">
              <div class="tab-wrap">歌曲列表</div>
            </li>
            <li>
              <div class="tab-wrap">
                评论 <span>({{commentsData.total}})</span>
              </div>
            </li>
            <li>
              <div class="tab-wrap">收藏</div>
            </li>
            <li class="right">
              <div class="search-wrap-box">
                <label>
                  <div class="search-wrap">
                    <i class="fa fa-search" aria-hidden="true" v-show="!query"></i>
                    <input type="text" class="search" v-model="query" placeholder="搜索歌单音乐">
                    <span class="clear">
                      <i class="fa fa-times-circle" aria-hidden="true" @click="clear" v-show="query"></i>
                    </span>
                  </div>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <song-list v-if="tabSongList" :songList="filteredSongList" :query="query" :thead="thead" :showLoading="showLoading" :enabled="false" ref="songLists"></song-list>
        <review :commentsData="commentsData" @scrollTop="scrollTop" @update="update"></review>
      </div>
    </scroll>
  </div>
</template>

<script>
import { songlistView, commentPlayList } from 'api'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/loading'
import Review from 'base/review/review'
import { durationStamp } from 'common/js/util'
import SongListViewInfo from 'base/song-list-view/song-list-view-info/song-list-view-info'
import SongList from 'base/song-list/song-list'
import SongListClass from 'common/js/songListClass'

export default {
  name: 'song-list-view',
  data () {
    return {
      songlistViewArray: {},
      creator: {},
      songList: {},
      showLoading: true,
      query: '',
      thead: '',
      tabSongList: false,
      commentsData: {}
    }
  },
  computed: {
    filteredSongList: function () { // 筛选数组里面的对象的值是否与搜索框输入的值相等，相等就返回该对象
      if (this.songList.datas) {
        return this.songList.datas.items.filter((list) => {
          var array = Object.values(list)
          var boolean = array.some((d, i) => {
            if (array[i] && array[i].toString().match(this.query)) {
              return true
            }
          })
          return boolean
          // return list.author.match(this.query)
        })
      }
    }
  },
  created () {
    this._songlistView()
    this._commentPlayList()
  },
  components: {
    Scroll,
    Loading,
    Review,
    SongList,
    SongListViewInfo
  },
  methods: {
    _songlistView () {
      songlistView({id: this.$route.query.id}).then((res) => {
        if (res.code === ERR_OK) {
          this.songlistViewArray = res.playlist
          this.creator = res.playlist.creator
          this.songList = this._normalizeSongList(res.playlist.tracks)
          if (this.$refs.songLists) {
            this.$refs.songLists.disable()
          }
          if (this.songList.datas) {
            this.thead = this.songList.datas.thead
          }
        }
      })
    },
    _normalizeSongList (list) {
      let map = {
        datas: {
          thead: true, // thead: false 表示不需要表头 true表示需要表头
          items: []
        }
      }
      list.forEach((item, index) => {
        map.datas.items.push(new SongListClass({
          id: item.id,
          mvId: item.mv,
          name: item.name,
          alia: item.alia[0],
          author: this.forArray(item.ar),
          album: item.al.name,
          duration: durationStamp(item.dt)
        }))
      })
      return map
    },
    forArray (array) {
      let other = array.map((d, i) => {
        return d.name
      })
      return other.join(' / ')
    },
    clear () {
      this.query = ''
    },
    _commentPlayList () {
      commentPlayList({id: this.$route.query.id, limit: 30}).then((res) => {
        if (res.code === ERR_OK) {
          this.commentsData = res
        }
      })
    },
    scrollTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    update () {
      this._commentPlayList()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .song-list-view-box
    position: fixed
    left: $aisde-width
    width: 1200px
    bottom: 0
    top: 76px
    z-index: 1
    .song-list-view-wrap
      height: 100%
      overflow: hidden
      .tab-box
        border-bottom: 1px solid #262626
        margin:  35px 34px 0
        ul
          li
            display: inline-block
            margin-right: 30px
            padding: 10px 0
            span
              font-size: $font-size-small
            &.current
              border-bottom: 1px solid $color-main
              color: $color-main
            &:last-child
              margin-right: 0
            .search-wrap-box
              input
                border: none
                background: none
                width: 90px
</style>
