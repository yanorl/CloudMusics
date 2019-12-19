<template>
  <div class="video-list-box padding-bottom clearfix">
    <h3 class="title">{{videoTitle}}<i class="fa fa-angle-right" aria-hidden="true"></i></h3>
    <div class="video-list-wrap">
      <ul>
        <li v-for="list in videoList" :key="list.name">
          <div class="item">
            <div class="img-box">
              <div v-lazy-container="{ loading: require('common/image/default-w333.jpg') }">
                <img :data-src="list.sPicUrl">
              </div>
              <span class="playIcon">
                <i class="fa fa-caret-right" aria-hidden="true"></i>
              </span>
            </div>
            <span class="name">{{list.name}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-list',
  props: {
    videoList: {
      type: Array,
      default: () => []
    },
    videoTitle: {
      type: String,
      default: '标题'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  components: {
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .video-list-wrap ul
    display: flex
    flex-flow: row wrap
    margin-left: -20px
    li
      flex: 0 0 33.3%
    .item
      padding: 20px 0 20px 20px
      .img-box
        position: relative
        img
          width: 100%
          border-radius: 5px
        .playIcon
          position: absolute
          left: 10px
          top: 10px
          width: 30px
          height: 30px
          display: flex
          align-items: center
          justify-content: center
          background: #999
          border: 1px solid #fff
          border-radius: 50%
          opacity: 0.5
          i
            color: #fff
            font-size: $font-size-large
      .name
        display: inline-block
        margin-top: 5px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
</style>
