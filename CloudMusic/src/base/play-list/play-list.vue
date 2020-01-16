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
          <play-list-item ref="scrollPlayList" :switchesData="sequenceList" :currentIndex="currentIndex" :currentSong="currentSong" :playing="playing" v-if="currentTabIndex === 0" type="sequence" @selectItem="selectItem" @clearAll="clearAll" ></play-list-item>
          <play-list-item ref="scrollPlayList" :switchesData="playHistory" :currentIndex="currentIndex" :currentSong="currentSong" :playing="playing" v-if="currentTabIndex === 1" type="history" @selectItem="selectItem" @clearAll="clearAll" ></play-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { playerMixin } from 'common/js/mixin'
import PlayListItem from 'base/play-list/play-list-item/play-list-item'
import SongListClass from 'common/js/songListClass'
import { mapActions } from 'vuex'

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
    },
    currentIndex (newIndex) {
      if (newIndex >= 9) {
        this.$nextTick(() => {
          this.$refs.scrollPlayList.scrollElement()
        })
      }
    }
  },
  computed: {
  },
  components: {
    PlayListItem
  },
  methods: {
    selectItem (type, song, index) {
      if (type === 'sequence') {
        this.selectPlay({
          list: this.switchesData,
          index
        })
      } else if (type === 'history') {
        this.insertSong(new SongListClass(song))
      }
    },
    clearAll (type) {
      if (type === 'sequence') {
        this.deleteSongList()
      } else if (type === 'history') {
        this.clearPlayHistory()
      }
    },
    clickTab (index) {
      this.currentTabIndex = index
      if (index === 1) {
        this.$refs.scrollPlayList.scrollTop()
      } else if (index === 0) {
        this.$refs.scrollPlayList.scrollElement()
      }
    },
    ...mapActions([
      'selectPlay',
      'insertSong',
      'clearPlayHistory',
      'deleteSongList'
    ])
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
