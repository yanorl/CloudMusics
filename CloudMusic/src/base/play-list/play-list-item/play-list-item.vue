<template>
  <div class="play-list-item-box">
    <table class="table-box">
      <thead>
        <tr>
          <th width="20"></th>
          <th class="gray">共 {{switchesData.length}} 首</th>
          <th width="95" :class="grayClass">
            <div v-if="playList">
              <i aria-hidden="true" class="fa fa-calendar-plus-o"></i>
              <span>收藏全部</span>
            </div>
          </th>
          <th width="30"></th>
          <th width="85" :class="grayClass">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span>清空</span></th>
        </tr>
      </thead>
      <div class="fixed">
        <scroll ref="scroll" :data="switchesData" class="scrollTr">
          <tbody>
            <tr v-for="(item, index) in switchesData" :key="index" ref="trGroup" @click="clickItem(index)" @dblclick="selectItem(item, index)">
              <td width="15">
                <span class="status" v-if="currentIndex === index && playList">
                  <i class="fa color-main" :class="playing ? 'fa-play' : 'fa-pause'" aria-hidden="true"></i>
                </span></td>
              <td v-if="item.name" class="name" :class="{'gray': item.st !== 0}" :title="titleDes(item.name, item.alia)">
                <div class="table-name">
                  <span :class="{'color-main': currentIndex === index && playList}">{{item.name}}</span>
                  <span class="alia gray" v-if="item.alia">{{item.alia}}</span>
                  <span class="iconMv" v-if="item.mvId">
                    <i class="color-main fa fa-play-circle-o" aria-hidden="true"></i>
                  </span>
                </div>
              </td>
              <td :title="item.author" :class="currentIndex === index && playList ? 'color-main' : 'author'">
                <div class="author-name">{{item.author}}</div>
              </td>
              <td class="links" width="25">
                <span class="link">
                  <i class="fa fa-link" aria-hidden="true"></i>
                </span>
              </td>
              <td class="time" :title="item.duration">
                {{format(item.duration)}}
              </td>
            </tr>
          </tbody>
        </scroll>
      </div>
    </table>
    <div class="tips gray" v-if="!switchesData.length">
      <p>你还没有{{tipText}}任何歌曲！</p>
      <p>去首页 <router-link to="/recommend">发现音乐</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
import { mapActions } from 'vuex'
import SongListClass from 'common/js/songListClass'
import { durationStamp } from 'common/js/util'

export default {
  name: 'play-list-item',
  props: {
    switchesData: {
      types: Array,
      default: () => []
    },
    currentIndex: {
      types: Number,
      default: -1
    },
    playing: {
      types: Boolean,
      default: false
    },
    playList: {
      types: Boolean,
      default: false
    },
    tipText: {
      types: String,
      default: '播放'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    grayClass () {
      return !this.switchesData.length ? 'gray' : ''
    }
  },
  created () {
  },
  components: {
    Scroll
  },
  methods: {
    titleDes (name, alia) {
      if (alia) {
        return name + '' + alia
      } else {
        return name
      }
    },
    clickItem (index) {
      this.currentClick = index
    },
    selectItem (song, index) {
      if (this.playList) {
        this.selectPlay({
          list: this.switchesData,
          index
        })
      } else {
        console.log(song)
        this.insertSong(new SongListClass(song))
      }
      this.scrollTop()
    },
    scrollElement () {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollToElement(this.$refs.trGroup[this.currentIndex - 6], 0)
    },
    scrollTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    format (date) {
      return durationStamp(date)
    },
    ...mapActions([
      'selectPlay',
      'insertSong'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .fixed
    position: fixed
    top: 189px
    bottom: $player-height
    .scrollTr
      height: 100%
      overflow: hidden
      position: relative
.play-list-item-box
  .tips
    text-align: center
    margin-top: 80px
    font-size: $font-size-small
  table.table-box
    border: none
    border-collapse: collapse
    width: 100%
    max-width: 100%
    text-align: left
    font-size: $font-size-small
    table-layout:fixed
    word-break:break-all
    tr
      height: 35px
      line-height: 35px
    thead
      th
        border-bottom: 2px solid #313131
    tbody
      tr
        &.clickIndex
          background: #3e3d3d !important
        &:nth-child(even)
          background: #2d2d2d
        &:hover
          td
            background: #333
            color: #fff
            &.author, &.links, &.time
              color: #fff
        td
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          padding-right: 5px
          .table-name
            width: 185px
            text-overflow: ellipsis
            overflow: hidden
          .author-name
            width: 90px
            text-overflow: ellipsis
            overflow: hidden
          &.author
            color: $color-gray
          &.links, &.time
            color: #4e4e4e
          .status
            text-align: center
            display: block
            padding-left: 5px
            i
              transform: scale(0.6)
</style>
