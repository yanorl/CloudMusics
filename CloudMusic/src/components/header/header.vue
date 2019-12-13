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
            <router-link to="" class="current">个性推荐</router-link>
          </li>
          <li>
            <router-link to="">歌单</router-link>
          </li>
          <li>
            <router-link to="">主播电台</router-link>
          </li>
          <li>
            <router-link to="">排行榜</router-link>
          </li>
          <li>
            <router-link to="">歌手</router-link>
          </li>
          <li>
            <router-link to="">最新音乐</router-link>
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
            &.current
              color: $color
</style>
