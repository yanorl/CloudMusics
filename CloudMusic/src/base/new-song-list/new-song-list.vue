<template>
  <div class="new-song-list-box padding-bottom clearfix" v-if="newSongList.length > 0">
    <h3 class="title">{{newSongTitle}}<i class="fa fa-angle-right" aria-hidden="true"></i></h3>
    <div class="new-song-list-wrap">
      <ul>
        <li v-for="(item, index) in newSongList" :key="item.id">
          <div class="item-list" v-if="!listType">
            <div class="img-box">
              <img v-lazy="item.picUrl" width="80">
              <span class="playIcon">
                <i class="fa fa-caret-right" aria-hidden="true"></i>
              </span>
            </div>
            <div class="content">
              <span class="num">{{index | plusZero}}</span>
              <span class="desc">
                <div class="song-name">{{item.song.name}}</div>
                <div class="artist-name">{{item.song.artists[0].name}}</div>
              </span>
              <span class="icon" v-if="item.song.mvid">
                <i class="fa fa-play-circle-o" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div class="item-list" v-if="listType">
            <div class="img-box">
              <img v-lazy="item.picUrl" width="100">
            </div>
            <div class="content">
              <span class="desc">
                <div class="song-name">{{item.rcmdtext}}</div>
                <div class="category-name">{{item.category}}</div>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'new-song-list',
  props: {
    newSongList: {
      type: Array,
      default: () => []
    },
    newSongTitle: {
      type: String,
      default: '标题'
    },
    listType: {
      type: String,
      defalut: ''
    }
  },
  data () {
    return {}
  },
  created () {},
  components: {},
  methods: {}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .new-song-list-wrap
    ul
      display: flex
      flex-flow: row wrap
      margin-left: -10px
      li
        flex: 0 0 50%
        &:hover .item-list
          background: #444
          border-radius: 5px
        .item-list
          padding: 10px
          margin-top: 20px
          display: flex
          align-items: center
          .img-box
            position: relative
            img
              border-radius: 5px
              margin-right: 20px
            .playIcon
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
              background: rgba(255,255,255,0.7)
              border-radius: 50%
              text-align: center
              width: 30px
              height: 30px
              line-height: 30px
              i
                color: $color-main
                font-size: $font-size-large
                line-height: 30px
          .content
            display: flex
            align-items: center
            width: 100%
            .num
              margin-right: 20px
            .desc
              flex: 1
              .song-name
                margin-bottom: 5px
              .category-name
                font-size: $font-size-small
                color: #7b7b7b
            .icon
              margin-right: 20px
              color: #a91319
              font-size: $font-size-medium-x
        &:nth-of-type(odd) .item-list
          margin-right: 20px
</style>
