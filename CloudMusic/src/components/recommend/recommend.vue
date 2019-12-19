<template>
  <div class="recommend-box">
    <scroll ref="scroll" :data="songList && videoList && newSongList && recommendMvList && recommendDjList" class="recommend-wrap">
      <div class="recommend-content">
        <banner></banner>
        <song-list :songList="songList" :songTitle="songTitle"></song-list>
        <video-list :videoList="videoList" :videoTitle="videoTitle"></video-list>
        <new-song-list :newSongList="newSongList" :newSongTitle="newSongTitle"></new-song-list>
        <song-list :songList="recommendMvList" :songTitle="recommendMvTitle" :listNum="listNum"></song-list>
        <new-song-list :newSongList="recommendDjList" :newSongTitle="recommendDjTitle" :listType="listType"></new-song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import { personalized, privatecontent, newsong, recommendMv, recommendDj } from 'api'
import { ERR_OK } from 'api/config'
import Banner from 'base/banner/banner'
import SongList from 'base/song-list/song-list'
import VideoList from 'base/video-list/video-list'
import NewSongList from 'base/new-song-list/new-song-list'
import Scroll from 'base/scroll/Scroll'

export default {
  name: 'recommend',
  data () {
    return {
      songList: [],
      songTitle: '推荐歌单',
      videoList: [],
      videoTitle: '',
      newSongList: [],
      newSongTitle: '最新音乐',
      recommendMvList: [],
      recommendMvTitle: '推荐MV',
      listNum: 'mv',
      recommendDjList: [],
      recommendDjTitle: '推荐电台',
      listType: 'dj'
    }
  },
  created () {
    this._personalized()
    this._privatecontent()
    this._newsong()
    this._recommendMv()
    this._recommendDj()
  },
  components: {
    Banner,
    SongList,
    VideoList,
    NewSongList,
    Scroll
  },
  methods: {
    _personalized () {
      personalized({ limit: 10 }).then((res) => {
        if (res.code === ERR_OK) {
          this.songList = res.result
        }
      })
    },
    _privatecontent () {
      privatecontent().then((res) => {
        if (res.code === ERR_OK) {
          this.videoTitle = res.name
          this.videoList = res.result
        }
      })
    },
    _newsong () {
      newsong().then((res) => {
        if (res.code === ERR_OK) {
          this.newSongList = res.result
        }
      })
    },
    _recommendMv () {
      recommendMv().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendMvList = res.result
        }
      })
    },
    _recommendDj () {
      recommendDj().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendDjList = res.djRadios
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend-box
    width: 1040px
    position: fixed
    left: $aisde-width
    right: 0
    margin: auto
    bottom: 0
    top: 76px
    z-index: 1
    .recommend-wrap
      height: 100%
      .recommend-content
        margin-top: 15px
        padding-bottom: 80px
</style>
