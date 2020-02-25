<template>
  <transition name="slide">
    <div class="medium-screen-box" v-show="MScreen">
      <div class="medium-content">
        <div class="top">
          <div class="phonograph left">
            <div class="cd-wrapper" :class="playClass">
              <div class="arm"></div>
              <div class="cd">
                <img width="100%" height="100%" :src="currentSong.image">
              </div>
            </div>
          </div>
          <div class="lyrics-box left">
            <div class="title-box">
              <span class="title">{{currentSong.name}}</span>
              <span class="sound-quality">标准音质</span>
            </div>
            <div class="des">
              <p>专辑： <span>{{currentSong.album}}</span></p>
              <p>歌手： <span>{{currentSong.author}}</span></p>
              <p>来源： <span>{{currentSong.source}}</span></p>
            </div>
            <div class="lyric-wrapper">
              <scroll class="lyricScroll" ref="lyricList" :data="currentLyric && currentLyric.lines">
                <div class="lyric-content">
                  <div  v-if="currentLyric">
                    <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line, index) in currentLyric.lines" :key="index">{{line.txt}}</p>
                  </div>
                </div>
              </scroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from 'base/scroll/Scroll'

export default {
  name: 'medium-screen',
  props: {
    MScreen: {
      type: Boolean,
      default: false
    },
    currentLyric: {
      type: Object,
      default: () => {}
    },
    currentLineNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'playing'
    ]),
    playClass () {
      return this.playing ? 'play' : 'pause'
    }
  },
  created () {
  },
  components: {
    Scroll
  },
  methods: {
    lyricScrollEle () {
      let lineEl = this.$refs.lyricLine[this.currentLineNum - 5]
      this.$refs.lyricList.scrollToElement(lineEl, 1000)
    },
    lricScrollTo () {
      this.$refs.lyricList.scrollTo(0, 0, 1000)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  .slide-enter, .slide-leave-to
    transform: translate3d(0, 100%, 0)
  .medium-screen-box
   width: 100%
   height: 100%
   background: #202020
   position: absolute
   top: 0
   z-index: 2
   .medium-content
     width: 980px
     height: 100%
     margin: 0 auto
     .top
       margin: 50px 0
       overflow: hidden
       .phonograph
         margin: 0 50px
         .cd-wrapper
           background: url('images/turntable.png') no-repeat
           background-position-y: 85px
           width: 310px
           height: 395px
           position: relative
           &.play
             .arm
               transform: rotate(33deg)
               transform-origin: top left
               transition: transform 1s
             .cd
               animation: rotate 20s linear infinite
           &.pause
             .arm
               transition: all 1s
             .cd
               animation: rotate 20s linear infinite
               animation-play-state: paused
           .arm
             background: url('images/arm.png') no-repeat
             width: 166px
             height: 72px
             position: absolute
             right: 5px
           .cd
             position: absolute
             left: 50px
             top: 135px
             width: 210px
             height: 210px
             overflow: hidden
             border-radius: 50%
       .lyrics-box
         margin: 30px 35px 0 35px
         width: 470px
         box-sizing: content-box
         .title-box
           .title
             font-size: $font-size-large
           .sound-quality
             display: inline-block
             font-size: $font-size-small
             vertical-align: text-bottom
             border: 1px solid $color-main
             padding: 2px 3px
             margin-left: 5px
             border-radius: 3px
             color: $color-main
             position: relative
             &:before
               content: ''
               position: absolute
               width: 0
               height: 0
               border-left: 3px solid transparent
               border-right: 3px solid transparent
               border-bottom: 3px solid #c52526
               left: 50%
               transform: translate(-50%, 0)
               top: -4px
         .des
           margin: 30px 0 0
           width: 100%
           overflow: hidden
           white-space: nowrap
           p
             display: inline-block
             margin-right: 30px
             span
               color: #72ade7
               &:hover
                 color: #90bce6
             &:last-child
               margin-right: 0
         .lyric-wrapper
           font-size: $font-size-small
           padding: 10px 0
           overflow: hidden
           box-sizing: content-box
           position: fixed
           bottom: 180px
           top: 160px
           .lyricScroll
             height: 100%
             overflow: hidden
             p
               font-size: $font-size
               margin: 10px 0
               color: $color-i
               height: 20px
               &.current
                 color: $color-background
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
