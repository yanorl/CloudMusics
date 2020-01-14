<template>
  <div class="play-list-box">
    <div class="play-list-wrap">
      <div class="play-list-content">
        <div class="tab-list clearfix">
          <ul>
            <li :class="{'active': currentTabIndex === index}" v-for="(item, index) in switches" :key="index" @click="clickTab(index)">{{item.name}}</li>
          </ul>
        </div>
        <div class="tab-content">
          <play-list-item ref="scrollPlayList" :switchesData="sequenceList" :currentIndex="currentIndex" :playing="playing" v-if="currentTabIndex === 0" :personal="true" tipText="播放"></play-list-item>
          <play-list-item ref="scrollPlayList" :switchesData="playHistory" :currentIndex="currentIndex" :playing="playing" v-if="currentTabIndex === 1" tipText="添加"></play-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { playerMixin } from 'common/js/mixin'
import PlayListItem from 'base/play-list/play-list-item/play-list-item'

export default {
  name: 'play-list-box',
  mixins: [playerMixin],
  data () {
    return {
      currentTabIndex: 0,
      switches: [
        {name: '播放列表'},
        {name: '历史记录'}
      ]
    }
  },
  props: {
    watchIndex: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    watchIndex (newdata) {
      if (newdata & this.currentIndex >= 9 & this.currentTabIndex === 0) {
        this.$refs.scrollPlayList.scrollElement()
      }
    }
  },
  computed: {
  },
  components: {
    PlayListItem
  },
  methods: {
    clickTab (index) {
      this.currentTabIndex = index
      if (index === 1) {
        this.$refs.scrollPlayList.scrollTop()
      } else {
        this.$refs.scrollPlayList.scrollElement()
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
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
</style>
