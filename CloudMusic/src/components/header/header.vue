<template>
  <div class="header-box">
    <div class="header-aside">
      <span class="previous">
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </span>
      <span class="next">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </span>
    </div>
    <div class="header-wrap">
      <div class="nav-box">
        <ul>
          <li>
            <router-link to="/recommend">个性推荐</router-link>
          </li>
          <li>
            <router-link to="/test">歌单</router-link>
          </li>
          <li>
            <router-link to="/1">主播电台</router-link>
          </li>
          <li>
            <router-link to="/2">排行榜</router-link>
          </li>
          <li>
            <router-link to="/3">歌手</router-link>
          </li>
          <li>
            <router-link to="/4">最新音乐</router-link>
          </li>
        </ul>
      </div>
      <search></search>
    </div>
  </div>
</template>

<script>
import Search from 'components/search/search'
export default {
  data () {
    return {}
  },
  components: {
    Search
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .header-box
    position: relative
    z-index: 2
    .header-aside
      float: left
      width: $aisde-width
      background: $header-asid-background
      text-align: right
      padding: 20px 0 16px
      span
        display:inline-block
        margin: 0 14px
        i
          font-size: $font-size-i-big
          line-height: 40px
    .header-wrap
      padding: 20px 0 16px
      overflow: hidden
      background: #202020
      .nav-box
        line-height: 40px
        li
          float: left
          a
            display: block
            padding: 0 20px
            text-align: center
          .router-link-active
              color: $color
              font-weight: bold
</style>
