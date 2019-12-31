<template>
  <div class="review-list-box">
    <div class="review-list-title">{{reviewTitle}}</div>
    <ul>
      <li v-for="(item, index) in commentsData" :key="index">
        <div class="review-list-item">
          <div class="avatar-box">
            <img :src="item.user.avatarUrl" alt="" width="100%">
          </div>
          <div class="review-list-item-content">
            <div class="review-list-item-avatar" v-if="item.user">
              <span class="review-list-item-name">{{item.user.nickname}}:</span>
              <span class="review-list-item-avatar-content">{{item.content}}</span>
            </div>
            <div class="rp" v-if="item.beReplied.length" v-for="(list, listIndex) in item.beReplied" :key="listIndex">
              <span class="rp-name">{{list.user.nickname}}:</span>
              <span class="rp-content">{{list.content}}</span>
            </div>
            <div class="review-list-item-other clearfix">
              <div class="time left">{{nomalTime(item.time)}}</div>
              <div class="review-list-item-icon right">
                <span class="icon-item">
                  <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
                  <span>{{item.likedCount}}</span>
                </span>
                <span class="icon-item">
                  <i class="fa fa-commenting-o" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { timesFun } from 'common/js/util'

export default {
  name: 'review-list',
  props: {
    commentsData: {
      type: Array,
      default: () => []
    },
    reviewTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  created () {
  },
  components: {
  },
  methods: {
    nomalTime (timestamp) {
      return timesFun(timestamp)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .review-list-box
    .review-list-title
      margin-top: 20px
    ul
      li
        font-size: $font-size-small
        padding: 15px 0
        border-bottom: 2px solid #242424
        &:last-child
          border: none
        .review-list-item
          display: flex
          align-items: top
          .avatar-box
            width: 35px
            height: 35px
            overflow: hidden
            border-radius: 50%
            margin-right: 15px
          .review-list-item-content
            flex: 1
            .review-list-item-avatar
              padding-bottom: 10px
              .review-list-item-name
                color: #72ade7
            .rp
              padding: 10px
              background: #252525
              border-radius: 5px
              color: #7b7b7b
              margin-bottom: 10px
              .rp-name
                color: #72ade7
            .review-list-item-other
              color: #7b7b7b
              .review-list-item-icon
               span.icon-item
                 display: inline-block
                 margin-left: 20px
                 span
                   color: $color-background
</style>
