<template>
  <div class="grogress-bar-box">
    <div class="progress-bar-wrap">
      <div class="progress-bar-content" ref="progressBarContent" @click="progressClick">
        <div class="progress-box" ref="progressBox"></div>
        <div class="progress-btn-box" ref="progressBtnBox" @mousedown="ondragstart">
          <div class="progress-btn" ref="progressBtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'grogress-bar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBarContent.clientWidth - this.$refs.progressBtn.clientWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  },
  computed: {
  },
  created () {
    this.touch = {}
  },
  components: {
  },
  mounted () {
    document.addEventListener('mousemove', this.ondrag)
    document.addEventListener('mouseup', this.ondragend)
  },
  methods: {
    progressClick (e) {
      this._offset(e.pageX)
      this._triggerPercent()
    },
    _offset (offsetWidth) {
      this.$refs.progressBox.style.width = `${offsetWidth}px`
      this.$refs.progressBtnBox.style.left = `${offsetWidth}px`
    },
    ondragstart (e) {
      // console.log('开始拖拽')
      this.touch.initiated = true
      this.touch.startX = e.pageX
      this.touch.left = this.$refs.progressBox.clientWidth
    },
    ondrag (e) {
      // console.log('拖拽中')
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBarContent.clientWidth - this.$refs.progressBtn.clientWidth, Math.max(0, this.touch.left + deltaX))
      console.log(e.pageX + '-' + this.touch.startX)

      this._offset(offsetWidth)
    },
    ondragend () {
      // console.log('拖拽结束')
      if (!this.touch.initiated) {
        return
      }
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent () {
      const barWidth = this.$refs.progressBarContent.clientWidth - this.$refs.progressBtn.clientWidth
      const percent = this.$refs.progressBox.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .grogress-bar-box
    .progress-bar-wrap
      position: absolute
      top: 0
      width: 100%
      height: 2px
      .progress-bar-content
        position: relative
        background: #2b2b2b
        height: 100%
        cursor: pointer
        .progress-box
          position: absolute
          top: 0
          height: 100%
          background: $color-main
        .progress-btn-box
          position: absolute
          width: 20px
          height: 20px
          top: -9px
          .progress-btn
            width: 10px
            height: 10px
            border-radius: 50%
            background: $color-main
            position: relative
            top: 4px
</style>
