<template>
  <div class="player-box">
    <div class="mini-player">
      <div class="mini-play-item flex">
        <div class="song-box">
          <div class="song-img">
            <img :src="currentSong.image" width="100%">
          </div>
          <div class="song-detail">
            <div class="song-des">
              <span class="song-name">{{currentSong.name}}</span> -
              <span class="singer">{{currentSong.author}}</span>
            </div>
            <div class="song-duration">
              {{format(currentTime)}} / {{currentSong.duration}}
            </div>
          </div>
        </div>
      </div>
      <div class="mini-play-item width">
        <div class="control-box">
          <span class="like">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
          </span>
          <div class="icon-control-box">
            <span class="icon-left">
              <i class="fa fa-step-backward" aria-hidden="true"></i>
            </span>
            <span class="icon-center">
              <i class="fa fa-pause-circle-o" aria-hidden="true"></i>
            </span>
            <span class="icon-right">
              <i class="fa fa-step-forward" aria-hidden="true"></i>
            </span>
          </div>
          <span class="del">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div class="mini-play-item flex">
        <div class="player-icon">
          <span class="play-mode">
            <i class="fa fa-random" aria-hidden="true"></i>
          </span>
          <span class="play-list">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </span>
          <span class="play-sound">
            <i class="fa fa-volume-off" aria-hidden="true"></i>
          </span>
          <span class="screen">
            <i class="fa fa-arrows-alt" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
    <audio ref="audio" :src="playingUrl" @timeupdate="updateTime"></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { durationStamp } from 'common/js/util'

export default {
  name: 'player',
  data () {
    return {
      playingUrl: '',
      currentTime: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      this.asyncPlay()
      // this._getPlayUrls()
      // if (newSong.id === oldSong.id) {
      //   return
      // }
      // clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   console.log(2)
      //   if (this.playingUrl) {
      //     console.log(1)
      //     console.log(this.playingUrl)
      //     this.$refs.audio.play()
      //     // this.getLyric()
      //   }
      // }, 1000)
    }
  },
  created () {
  },
  components: {
  },
  methods: {
    _getPlayUrls () {
      this.currentSong._playUrl().then((res) => {
        this.playingUrl = res
        console.log(res)
      })
    },
    async asyncPlay () {
      console.log(0)
      await this._getPlayUrls()
      await clearTimeout(this.timer)
      this.timer = await setTimeout(() => {
        console.log(2)
        if (this.playingUrl) {
          console.log(1)
          console.log(this.playingUrl)
          this.$refs.audio.play()
          // this.getLyric()
        }
      }, 1000)
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    format (date) {
      return durationStamp(date, false)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .player-box
    .mini-player
      height: $player-height
      width: 100%
      display: flex
      align-items: center
      justify-content: space-between
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      padding: 10px
      box-sizing: border-box
      background: $index-background
      border-top: 2px solid #2b2b2b
      .mini-play-item
        &.flex
          flex: 1
        &.width
          width: 200px
        .song-box
          display: flex
          align-items: center
          .song-img
            width: 42px
            height: 42px
            border-radius: 5px
            overflow: hidden
          .song-detail
            margin-left : 10px
            .song-duration
              margin-top: 5px
            .singer,.song-duration
              font-size: $font-size-small
              color: $color-i
         .control-box
           display: flex
           align-items: center
           .icon-control-box
             margin: 0 35px
             display: flex
             align-items: center
             font-size: $font-size-medium
             color: $color-main
             span.icon-center
               margin: 0 25px
               font-size: $font-size-i-big
          .player-icon
            text-align: right
            span
              display: inline-block
              margin-left: 20px
</style>
