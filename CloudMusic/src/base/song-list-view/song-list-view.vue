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
                评论<span>(0)</span>
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
        <song-list :songList="filteredSongList" :query="query" :thead="thead" :showLoading="showLoading" :enabled="false" ref="songLists"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { songlistView } from 'api'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/loading'
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
      thead: ''
    }
  },
  computed: {
    filteredSongList: function () {
      if (this.songList.datas) {
        return this.songList.datas.items.filter((list) => {
          // console.log(Object.values(list).includes(this.query))
          return list.name.match(this.query)
        })
      }
    }
  },
  created () {
    this._songlistView()
  },
  components: {
    Scroll,
    Loading,
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
          this.$refs.songLists.disable()
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
          author: item.ar[0].name,
          album: item.al.name,
          duration: durationStamp(item.dt)
        }))
      })
      return map
    },
    clear () {
      this.query = ''
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
