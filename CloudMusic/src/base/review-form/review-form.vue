<template>
  <div class="review-form-box">
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
  </div>
</template>

<script>

export default {
  name: 'review-form',
  data () {
    return {
      reviewContent: '',
      placeholder: '输入评论或@朋友'
    }
  },
  props: {
    rp: {
      type: String,
      default: ''
    },
    commentId: {
      type: String,
      default: ''
    }
  },
  watch: {
    rp (newRp, oldRp) {
      if (newRp !== oldRp) {
        this.reviewContent = this.rp
      }
    }
  },
  computed: {
  },
  created () {
  },
  components: {
  },
  methods: {
    textareaFocus () {
      this.$refs.textarea.focus()
    },
    clickReview () {
      if (this.reviewContent) {
        if (this.reviewContent === this.rp) {
          this.$emit('tips')
        } else if (this.reviewContent.indexOf(this.rp) >= 0) {
          let that = this
          this.fatherCommentControl({t: 2, commentId: that.commentId, content: this.reviewContent.replace(this.rp, '')})
        } else {
          this.fatherCommentControl({t: 1, content: this.reviewContent.replace(this.rp, '')})
        }
      } else {
        this.$emit('tips')
      }
    },
    fatherTips () {
      this.$emit('tips')
    },
    fatherCommentControl (params) {
      this.$emit('commentControl', params)
    },
    reviewContentEmpty () {
      this.reviewContent = ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .review-form-box
    form
      margin-bottom: 15px
      .form-group
        margin-top: 15px
        font-size: $font-size-small
        .form-type
          textarea
            background: #373737
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
