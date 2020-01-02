<template>
  <div class="review-box">
    <div class="review-wrap">
      <div class="review-content">
        <form ref="form" class="clearfix">
          <div class="form-group">
            <div class="form-type">
              <textarea class="form-control" ref="textarea" rows="3" v-model="reviewContent" :placeholder="placeholder"></textarea>
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
              <button type="button" class="button-wrap botton-confix" @click="clickReview">评论</button>
            </div>
          </div>
        </form>
        <div class="review-list-wrap">
          <div class="review-list-content">
            <template v-if="commentsData.hotComments.length > 0 && commentsData.comments.length > 0">
              <review-list :commentsData="commentsData.hotComments" reviewTitle="精彩评论" @rpName="rpName"></review-list>
              <review-list :commentsData="commentsData.comments" :reviewTitle="formatReviewTitle" @rpName="rpName"></review-list>
            </template>
            <template v-else>
              <p class="none-text">{{noneText}}</p>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="alert-container" v-show="alertFlow">
      <alert :icon='alert.icon' :text="alert.text"></alert>
    </div>
  </div>
</template>

<script>
import ReviewList from 'base/review/review-list/review-list'
import { commentControl } from 'api'
import { ERR_OK } from 'api/config'
import Alert from 'base/alert/alert'

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
      reviewTitle: '',
      alertFlow: false,
      alert: {
        icon: 'fa-times-circle',
        text: '写点东西吧，内容不能为空哦！'
      },
      rp: ' ',
      commentId: '',
      noneText: '还没有评论，快来抢沙发~'
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
    ReviewList,
    Alert
  },
  methods: {
    clickReview () {
      if (this.reviewContent) {
        if (this.reviewContent === this.rp) {
          this.tips()
        } else if (this.reviewContent.indexOf(this.rp) >= 0) {
          let that = this
          this._commentControl({t: 2, commentId: that.commentId})
        } else {
          this._commentControl({t: 1})
        }
      } else {
        this.tips()
      }
    },
    tips () {
      this.$refs.textarea.focus()
      this.alertFlow = true
      setTimeout(() => {
        this.alertFlow = false
      }, 1500)
    },
    _commentControl (commonParams) {
      const data = Object.assign({}, commonParams, {id: this.$route.query.id, type: 2, content: this.reviewContent.replace(this.rp, ''), timestamp: (new Date()).valueOf()})
      commentControl(data).then((res) => {
        if (res.code === ERR_OK) {
          this.reviewContent = ''
          this.alert = {
            icon: 'fa-check-circle',
            text: '评论发表成功！'
          }
          this.alertFlow = true
          setTimeout(() => {
            this.alertFlow = false
            this.alert = {
              icon: 'fa-times-circle',
              text: '写点东西吧，内容不能为空哦！'
            }
            this.$refs.textarea.focus()
          }, 1500)
          this.$emit('update')
        }
      })
    },
    rpName (name, id) {
      this.rp = `回复${name}:`
      this.reviewContent = this.rp
      this.commentId = id
      this.$refs.textarea.focus()
      this.$emit('scrollTop')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .review-box
    .alert-container
      width: 500px
      height: 500px
      .alert
        top: 250px
    .review-wrap
      margin:  0 34px
      overflow: hidden
      .review-content
        .none-text
          color: #7b7b7b
          text-align: center
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
