<template>
  <div class="review-box">
    <div class="review-wrap">
      <div class="review-content">
        <form ref="form" class="clearfix">
          <div class="form-group">
            <div class="form-type">
              <textarea class="form-control" rows="3" v-model="reviewContent" :placeholder="placeholder"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="icon-box left">
              <span class="icon-item">
                <i class="fa fa-smile-o" aria-hidden="true"></i>
              </span>
              <span class="icon-item">
                @
              </span>
              <span class="icon-item">
                #
              </span>
            </div>
            <div class="button-box right">
              <button class="button-wrap botton-confix">评论</button>
            </div>
          </div>
        </form>
        <div class="review-list-wrap">
          <div class="review-list-content">
           <review-list :commentsData="commentsData.hotComments" reviewTitle="精彩评论"></review-list>
           <review-list :commentsData="commentsData.comments" :reviewTitle="formatReviewTitle"></review-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewList from 'base/review/review-list/review-list'

export default {
  name: 'review',
  props: {
    commentsData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      reviewContent: '',
      placeholder: '输入评论或@朋友',
      reviewTitle: ''
    }
  },
  computed: {
    formatReviewTitle () {
      return `最新评论（${this.commentsData.total}）`
    }
  },
  created () {
  },
  components: {
    ReviewList
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .review-box
    .review-wrap
      margin:  0 34px
      overflow: hidden
      .review-content
        form
          margin-bottom: 15px
          .form-group
            margin-top: 15px
            font-size: $font-size-small
            .form-type
              textarea
                background: #2b2b2b
                border-radius: 5px
                width: 100%
                border: none
                padding: 10px
                box-sizing: border-box
            .icon-box
              font-size: $font-size-medium
              .icon-item
                display: inlie-block
                margin-right: 10px
                i
                  font-size: $font-size-medium-x
                  vertical-align: middle
            .button-box
              .button-wrap
                display: inline-block
                padding: 5px 25px
                border: 1px solid
                border-radius: 20px
                cursor: pointer
                border-color: #565454
                background: none
</style>
