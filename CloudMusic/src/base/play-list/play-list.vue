<template>
  <div class="play-list-box">
    <div class="play-list-wrap">
      <div class="play-list-content">
        <div class="tab-list clearfix">
          <ul>
            <li class="active">播放列表</li>
            <li>历史记录</li>
          </ul>
        </div>
        <div class="tab-content">
          <table class="table-box">
            <thead>
              <tr>
                <th width="20"></th>
                <th class="gray">共 {{sequenceList.length}} 首</th>
                <th width="95" :class="grayClass">
                  <i aria-hidden="true" class="fa fa-calendar-plus-o"></i>
                  <span>收藏全部</span></th>
                <th width="30"></th>
                <th width="85" :class="grayClass">
                  <i class="fa fa-trash-o" aria-hidden="true"></i>
                  <span>清空</span></th>
              </tr>
            </thead>
            <div class="fixed">
              <scroll ref="scroll" :data="sequenceList" class="scrollTr">
                <tbody>
                  <tr v-for="(item, index) in sequenceList" :key="index" ref="trGroup">
                    <td>
                      <span class="status" v-if="currentIndex === index">
                        <i class="fa color-main" :class="playing ? 'fa-play' : 'fa-pause'" aria-hidden="true"></i>
                      </span></td>
                    <td v-if="item.name" class="name" :class="{'gray': item.st !== 0}" :title="titleDes(item.name, item.alia)">
                      <span :class="{'color-main': currentIndex === index}">{{item.name}}</span>
                      <span class="alia gray" v-if="item.alia">{{item.alia}}</span>
                      <span class="iconMv" v-if="item.mvId">
                        <i class="color-main fa fa-play-circle-o" aria-hidden="true"></i>
                      </span>
                    </td>
                    <td width="90" :title="item.author" :class="currentIndex === index ? 'color-main' : 'author'">{{item.author}}</td>
                    <td class="links" width="25">
                      <span class="link">
                        <i class="fa fa-link" aria-hidden="true"></i>
                      </span>
                    </td>
                    <td class="time" width="80" :title="item.duration">
                      {{item.duration}}
                    </td>
                  </tr>
                </tbody>
              </scroll>
            </div>
          </table>
          <div class="tips gray" v-if="!sequenceList.length">
            <p>你还没有添加任何歌曲！</p>
            <p>去首页 <router-link to="/recommend">发现音乐</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { playerMixin } from 'common/js/mixin'
import Scroll from 'base/scroll/Scroll'

export default {
  name: 'play-list-box',
  mixins: [playerMixin],
  props: {
    watchIndex: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    watchIndex (newdata) {
      if (newdata & this.currentIndex >= 9) {
        this.scrollElement(this.currentIndex - 6)
      }
    }
  },
  computed: {
    grayClass () {
      return !this.sequenceList.length ? 'gray' : ''
    }
  },
  components: {
    Scroll
  },
  methods: {
    scrollElement (index) {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollToElement(this.$refs.trGroup[index], 0)
    }
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
  .play-list-box
    .play-list-wrap
      .play-list-content
        .tab-list
          text-align: center
          ul
            border: 2px solid #535353
            border-radius: 22px
            display: inline-block
            margin: 20px 0
            li
              padding: 5px 25px
              border-radius: 20px
              float: left
              &.active
                background: #535353
                color: #fff
              &:hover:not(.active)
                background: #333333
                color: #fff
           .tab-tip
             display: flex
             justify-content: space-between
             margin: 0 20px
             padding-bottom: 10px
             font-size: $font-size-small
             border-bottom: 2px solid #313131
             i
               font-size: $font-size
             .subscribers
               width: 120px
               text-align: right
         .tab-content
           .tips
             text-align: center
             margin-top: 80px
             font-size: $font-size-small
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
