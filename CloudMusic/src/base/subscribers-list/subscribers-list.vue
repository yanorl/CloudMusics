<template>
  <div class="subscribers-list-box">
    <div class="subscribers-list-wrap">
      <div class="subscribers-list-content" >
        <div class="subscribers-list-item" v-if="subscribers.length > 0" v-for="(item, index) in subscribers" :key="index">
          <div class="avatar-img cursor">
            <img :src="item.avatarUrl" alt="" width="100%">
          </div>
          <div class="subscribers-info">
            <div class="user-info">
            <span class="name cursor">{{item.nickname}}</span>
            <span v-if="item.gender" class="gender" :class="genderFormat(item.gender)+'-gender'">
              <i class="fa" :class="genderFormat(item.gender)" aria-hidden="true"></i>
            </span>
          </div>
          <div class="descripts ellipsis">
            {{subscribers.signature}}
          </div>
          </div>
        </div>
        <p class="none-text" v-if="!subscribers.length">{{noneText}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subscribers-list',
  props: {
    subscribers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      noneText: '暂无收藏'
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
    genderFormat (index) {
      if (index === 1) {
        return 'fa-mars'
      } else if (index === 2) {
        return 'fa-venus'
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subscribers-list-box
    .subscribers-list-wrap
      .subscribers-list-content
        display: flex
        justify-content: space-between
        align-items: center
        flex-wrap: wrap
        margin: 20px 34px
        .none-text
          text-align: center
          color: #7b7b7b
          width: 100%
        .subscribers-list-item
          width: 33.33%
          padding-right: 15px
          margin-bottom: 20px
          box-sizing: border-box
          display: flex
          align-items: center
          .avatar-img
            flex: 0 0 120px
            width: 120px
            height: 120px
            border-radius: 50%
            overflow: hidden
            margin-right: 15px
          .subscribers-info
            overflow: hidden
            .descripts
              margin-top: 10px
              color: $color-gray
            .user-info
              .name
                &:hover
                  color: #fff
              .gender
                width: 20px
                height: 20px
                line-height: 20px
                display: inline-block
                border-radius: 50%
                font-size: $font-size-small
                text-align: center
                &.fa-mars-gender
                  background: #3b6071
                  color: #00a5f9
                &.fa-venus-gender
                  background: #803352
                  color: #f10865
</style>
