<template>
  <div class="song-list-box padding-bottom clearfix" v-show="songList.length > 0">
    <h3 class="title">{{songTitle}}<i class="fa fa-angle-right" aria-hidden="true"></i></h3>
    <div class="song-list-wrap">
      <ul>
        <li v-if="listNum === 'playlist'">
          <div class="item">
            <div class="img-box" @click="selectItemRecord">
                <img :src="require('common/image/record.jpg')">
                <span class="playIcon" v-if="listNum != 'mv'">
                  <i class="fa fa-caret-right" aria-hidden="true"></i>
                </span>
            </div>
            <p class="name" @click="selectItemRecord">我的听歌排行</p>
            <!-- <p class="artistName">累计听歌 390 首</p> -->
          </div>
        </li>
        <li :class="listNum" v-for="list in songList" :key="list.id">
          <div class="item">
            <div class="img-box">
              <template v-if="listNum === 'mv'">
                <div v-lazy-container="{ loading: require('common/image/default-w245.jpg') }">
                  <img :data-src="list.picUrl">
                </div>
              </template>
              <template v-else>
                 <template v-if="listNum === 'playlist'">
                <img v-lazy="list.coverImgUrl+ '?param=210y210'">
                </template>
              <template v-else>
                <img v-lazy="list.picUrl">
              </template>
              </template>
              <span class="number">
                <i class="fa fa-caret-right" aria-hidden="true"></i>
                <p>{{list.playCount | toNumber}}</p>
              </span>
              <span class="text" v-if="listNum === 'mv'">{{list.copywriter}}</span>
              <span class="playIcon" v-if="listNum != 'mv'">
                <i class="fa fa-caret-right" aria-hidden="true"></i>
              </span>
            </div>
            <p class="name">{{list.name}}</p>
            <p class="artistName" v-if="listNum">{{list.artistName}}</p>
            <p class="artistName" v-if="listNum">{{list.trackCount}} 首</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!songList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'

export default {
  name: 'song-list',
  props: {
    songList: {
      type: Array,
      default: () => []
    },
    songTitle: {
      type: String,
      default: '标题'
    },
    listNum: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  components: {
    Loading
  },
  mounted () {
  },
  methods: {
    selectItemRecord () {
      this.$router.push({
        path: '/userRecord'
      })
    }
  },
  filters: {
    toNumber (num) {
      let str = ''
      if (num < 10000) {
        str = num
      } else {
        num = Math.round(num / 10000)
        str = num + '万'
      }
      return str
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .song-list-wrap ul
    display: flex
    flex-flow: row wrap
    margin-left: -20px
    li
      flex: 0 0 20%
      &.mv
        flex: 0 0 25%
        &:hover
          .item
            .number
              display: none
            .text
              transform: translate3d(0, 0, 0)
        .item
            .text
              position: absolute
              left: 0
              top: 0
              padding: 10px
              display: block
              color: #fff
              background: rgba(0,0,0, 0.6)
              width: 100%
              box-sizing: border-box
              transform: translate3d(0, -100%, 0)
              transition: transform 0.6s
    .item
      padding: 20px 0 20px 20px
      .img-box
        position: relative
        overflow: hidden
        cursor: pointer
        &:hover .playIcon
          opacity: 0.6
        img
          width: 100%
          border-radius: 5px
          opacity: 0.8
        .number
          position: absolute
          right: 10px
          top: 5px
          color: #fff
          display: flex
          align-items: center
          i
            margin-right: 5px
            color: #eee
            font-size: $font-size-medium-x
        .playIcon
          position: absolute
          right: 10px
          bottom: 10px
          width: 30px
          height: 30px
          display: flex
          align-items: center
          justify-content: center
          background: #c5c5c5
          border-radius: 50%
          opacity: 0
          transition: opacity 0.8s
          i
            color: $color-main
            font-size: $font-size-large
      .name
        display: inline-block
        margin-top: 5px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        cursor: pointer
      .artistName
        font-size: $font-size-small
        color: #7b7b7b
</style>
