<template>
  <div class="account-data-box">
    <div class="account-data-content">
      <ul>
        <li>
          <div class="num">{{userData.eventCount}}</div>
          <div class="text">动态</div>
        </li>
        <li>
          <div class="num">{{userData.follows}}</div>
          <div class="text">关注</div>
        </li>
        <li>
          <div class="num">{{userData.followeds}}</div>
          <div class="text">粉丝</div>
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!userData">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'

export default {
  name: 'account-data',
  props: {
    userData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .account-data-box
    ul
      display: flex
      align-items: center
      justify-content: space-around
      li
        opacity: 0.7
        cursor: pointer
        text-align: center
        &:hover
          opacity: 1
        .num
          font-size: $font-size-big
          color: #fff
</style>
